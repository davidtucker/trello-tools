var dotVoteCardButtonCallback = function (t) {
    var currentMember = {};
    return t.member('all')
    .then(function(member) {
        currentMember = member;
        return t.get('card', 'shared', UMTrello.constants.data.votes, {});
    })
    .then(function(currentVotes) {
        if(!currentVotes.hasOwnProperty(currentMember.id)) {
            currentVotes[currentMember.id] = 0;
        }
        console.log("Old Value: " + currentVotes[currentMember.id]);
        currentVotes[currentMember.id]++;
        console.log("New Value: " + currentVotes[currentMember.id]);
        console.dir(currentVotes);
        return t.set('card', 'shared', UMTrello.constants.data.votes, currentVotes);
    })
    .catch(function(err) {
        console.log("Voting Error");
        console.dir(err);
    });
};

var sortCardsInListPopup = function (t) {
    return t.popup({
        title: 'Select List for Sorting',
        url: './sort-list.html',
        height: 200
    })
};

var clearListVotesPopup = function (t) {
    return t.popup({
        title: 'Select List to Clear Votes',
        url: './clear-list.html',
        height: 200
    })
};

var boardButtonCallback = function (t) {
    return t.popup({
        title: 'Dot Voting Actions',
        items: [
            {
                text: 'Clear Votes on a List',
                callback: clearListVotesPopup
            }
        ]
    });
};

var idsCallback = function (t) {
    return t.popup({
        title: 'IDS Discovery',
        url: './ids.html',
        height: 200
    })
};

var getCardBadges = function (t) {
    return t.get('card','shared', UMTrello.constants.data.votes, 0)
    .then(function(dotVotes) {
        var votes = 0;
        for(var key in dotVotes) {
            votes += dotVotes[key];
        }
        if(votes > 0) {
            return [{
                text: votes,
                icon: GREY_DOT_ICON
            }];
        }
        return [];
    })
    .catch(function(err) {
        console.log("Card Badge Error");
        console.dir(err);
    });
};

var getMemberFirstName = function(id, members) {
    var member = members.find(function(element) {
        return element.id === id;
    });
    if(member) {
        console.log("Member");
        console.dir(member);
        return UMTrello.getMembersFirstName(member);
    }
    console.log("Could not find member and/or name for member");
    return "";
};

var getCardDetailBadges = function(t, members) {
    return t.get('card', 'shared', UMTrello.constants.data.votes, {})
    .then(function(dotVotes) {
        var cards = [];
        for(var key in dotVotes) {
            if(dotVotes[key] > 0) {
                var description = dotVotes[key] + " votes";
                var memberName = getMemberFirstName(key, members);
                cards.push({
                    title: memberName,
                    text: description,
                    icon: GREY_DOT_ICON
                });
            }
        }
        return cards;
    })
    .catch(function(err) {
       console.log("Error When Creating Details Cards.");
       console.dir(err);
    });
};

var isValidPersonData = function(ids, value) {
    if(!ids.hasOwnProperty(value)) {
        return false;
    }

    if(ids[value] === undefined) {
        return false;
    }

    if(ids[value] === 0) {
        return false;
    }

    if(ids[value] === '0') {
        return false;
    }

    return true;
};

var getIDSBadges = function(t, members) {
    return t.get('card', 'shared', UMTrello.constants.data.ids, {})
    .then(function(ids) {
        var cards = [];
        if(isValidPersonData(ids, 'reporter')) {
            cards.push({
                title: 'IDS',
                text: 'Reporter: ' + UMTrello.getMembersNameFromID(members, ids.reporter),
                icon: null,
                callback: idsCallback
            });
        }
        if(isValidPersonData(ids, 'assignee')) {
            cards.push({
                title: 'IDS',
                text: 'Reporter: ' + UMTrello.getMembersNameFromID(members, ids.assignee),
                icon: null,
                callback: idsCallback
            });
        }
        if(ids.hasOwnProperty('what') && ids.what !== undefined && ids.what.trim() !== '') {
            cards.push({
                title: 'IDS',
                text: 'Issue: ' + ids.what,
                icon: null,
                callback: idsCallback
            });
        }
        // console.log("IDS Cards");
        // console.dir(cards);
        return cards;
    })
    .catch(function(err) {
        console.log("Error creating IDS cards");
        console.dir(err);
    })
};

var DOT_ICON = './images/dot.png';
var GREY_DOT_ICON = './images/grey-dot.png';

var _members;
var getMembers = function(t) {
    return new Promise(function(resolve, reject) {
        if(_members !== undefined) {
            resolve(_members);
        }
        return t.board('members')
        .then(function(board) {
            _members = board.members;
            resolve(_members);
        })
        .catch(function(err) {
            reject(err);
        });
    });

};

TrelloPowerUp.initialize({
    'board-buttons': function (t, options) {
        return [{
            icon: DOT_ICON,
            text: 'Dot Voting Actions',
            callback: boardButtonCallback
        }];
    },
    'card-buttons': function (t, options) {
        return [{
            icon: GREY_DOT_ICON,
            text: 'Dot Vote',
            callback: dotVoteCardButtonCallback
        }, {
            icon: GREY_DOT_ICON,
            text:  'IDS',
            callback: idsCallback
        }];
    },
    'card-badges': function (t, options) {
        return getMembers(t)
        .then(function(members) {
            return Promise.all([getCardBadges(t), getIDSBadges(t, members)])
            .spread(function(dotVotingBadges, idsBadges) {
                var output = idsBadges.concat(dotVotingBadges);
                console.log("Output");
                console.dir(output);
                return output;
            });
        })
        .catch(function(err) {
            console.log("Error on Card Badges");
            console.dir(err);
        });
    },
    'card-detail-badges': function (t, options) {
        return getMembers(t)
        .then(function(members) {
            return Promise.all([getCardDetailBadges(t, members), getIDSBadges(t, members)])
            .spread(function (dotVotingBadges, idsBadges) {
                var output = idsBadges.concat(dotVotingBadges);
                console.log("Output");
                console.dir(output);
                return output;
            });
        })
        .catch(function(err) {
            console.log("Error on Detail Card Badges");
            console.dir(err);
        });
    }
});


