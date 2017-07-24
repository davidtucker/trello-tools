var dotVoteCardButtonCallback = function (t) {
    var oldValue = -1;
    var newValue = -1;
    return t.get('card','shared', UMTrello.constants.data.votes, 0)
    .then(function(data) {
        oldValue = data;
        newValue = oldValue + 1;
        return t.set('card','shared', UMTrello.constants.data.votes, newValue);
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

var getCardDetailBadges = function(t) {
    return getCardBadge(t, true);
};

var getCardBadge = function (t, isDetail) {
    return t.get('card','shared', UMTrello.constants.data.votes, 0)
    .then(function(dotVotes) {
        var description = dotVotes;
        if(isDetail) {
            description += ' Votes';
        }
        if(dotVotes > 1) {
            return [{
                title: 'Dot Votes',
                text: description,
                icon: GREY_DOT_ICON
            }]
        } else {
            return [];
        }
    })
    .then(function() {
        // DEBUG
        return t.member('all')
        .then(function(members) {
            console.dir(members);
        });
    })
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
        return getCardDetailBadges(t);
    }
});
