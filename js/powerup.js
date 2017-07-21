var dotVoteCardButtonCallback = function (t) {
    var oldValue = -1;
    var newValue = -1;
    return t.get('card','shared', 'com.universalmind.trello.DotVotes', 0)
    .then(function(data) {
        oldValue = data;
        newValue = oldValue + 1;
        console.log("Dot Value Incremented. Old Value: " + oldValue + " New Value: " + newValue);
        return t.set('card','shared', 'com.universalmind.trello.DotVotes', newValue);
    });
    // TODO - Decrement User's Available Votes
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
                text: 'Reorder List Based on Votes',
                callback: sortCardsInListPopup
            },
            {
                text: 'Clear Votes on a List',
                callback: clearListVotesPopup
            },
        ]
    });
};

var getCardBadges = function(t) {
    return t.get('card','shared', 'com.universalmind.trello.DotVotes', 0)
    .then(function(dotVotes) {
        if(dotVotes > 1) {
            return [{
                text: dotVotes,
                icon: GREY_DOT_ICON
            }]
        } else {
            return [];
        }
    });
};

var getCardDetailBadges = function(t) {
    return t.get('card','shared', 'com.universalmind.trello.DotVotes', 0)
    .then(function(dotVotes) {
        if(dotVotes > 1) {
            return [{
                title: 'Dot Votes',
                text: dotVotes + ' Votes',
                icon: GREY_DOT_ICON
            }]
        } else {
            return [];
        }
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
        return getCardDetailBadges(t);
    }
});
