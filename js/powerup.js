var dotVoteCardButtonCallback = function (t) {
    var currentMember = {};
    return t.member('all')
    .then(function(member) {
        currentMember = member;
        return t.get('card', 'shared', UMTrello.constants.data.votes, {});
    })
    .then(function(currentVotes) {
        if(currentVotes[currentMember.id] === undefined) {
            currentVotes[currentMember.id] = 0;
        }
        console.log("Old Value: " + currentVotes[currentMember.id]);
        currentVotes[currentMember.id]++;
        console.log("New Value: " + currentVotes[currentMember.id]);
        console.dir(currentVotes);
        return t.set('card', 'shared', UMTrello.constants.data.votes, currentVotes);
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

var getCardBadges = function(t) {
    return getCardBadge(t, false);
};

var getCardBadge = function (t, isDetail) {
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
    });
};

var getMemberFirstName = function(id, members) {
    console.log("Members");
    console.dir(members);
    var member = members.find(function(element) {
        return element.id === id;
    });
    if(member) {
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

var DOT_ICON = './images/dot.png';
var GREY_DOT_ICON = './images/grey-dot.png';

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
        }];
    },
    'card-badges': function (t, options) {
        return getCardBadges(t);
    },
    'card-detail-badges': function (t, options) {
        return t.board('members')
        .then(function(result) {
            return getCardDetailBadges(t, result.members);
        });
    }
});
