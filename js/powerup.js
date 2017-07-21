var dotVoteCardButtonCallback = function (t) {
    console.log("Dot Vote Pushed");
    var oldValue = t.get('card','shared', 'com.universalmind.trello.DotVotes', 0);
    t.set('card','shared', 'com.universalmind.trello.DotVotes', oldValue + 1);
    var newValue = t.get('card','shared', 'com.universalmind.trello.DotVotes', 0);
    console.log("Dot Value Incremented. Old Value: " + oldValue + " New Value: " + newValue);
};

var sortCardsInListPopup = function (t) {
    return t.popup({
        title: 'Select List for Sorting',
        url: './sort-list.html',
        height: 200
    })
};

var boardButtonCallback = function (t) {
    return t.popup({
        title: 'Popup List Example',
        items: [
            {
                text: 'Reorder List Based on Votes',
                callback: sortCardsInListPopup
            },
            {
                text: 'Clear Votes on a List',
                callback: function (t) {
                    return t.boardBar({
                        url: './board-bar.html',
                        height: 200
                    })
                    .then(function () {
                        return t.closePopup();
                    });
                }
            }
        ]
    });
};

var getCardBadges = function(t) {
    var dotVotes = t.get('card','shared', 'com.universalmind.trello.DotVotes', 0);
    if(dotVotes > 1) {
        return [{
            text: dotVotes,
            icon: GREY_DOT_ICON,
            color: 'blue'
        }]
    }
    return [];
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
    }
});

/*
,
    'card-badges': function (t, options) {
        return getBadges(t);
    },
    'card-buttons': function (t, options) {
        return [{
            icon: GRAY_ICON,
            text: 'Template',
            callback: cardButtonCallback
        }];
    },
    'show-settings': function (t, options) {
        return t.popup({
            title: 'Settings',
            url: './settings.html',
            height: 184
        });
    }
 */
