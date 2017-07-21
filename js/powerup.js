/* global TrelloPowerUp */

// var WHITE_ICON = './images/icon-white.svg';
// var GRAY_ICON = './images/icon-gray.svg';
//
// var parkMap = {
//   acad: 'Acadia National Park',
//   arch: 'Arches National Park',
//   badl: 'Badlands National Park',
//   brca: 'Bryce Canyon National Park',
//   crla: 'Crater Lake National Park',
//   dena: 'Denali National Park',
//   glac: 'Glacier National Park',
//   grca: 'Grand Canyon National Park',
//   grte: 'Grand Teton National Park',
//   olym: 'Olympic National Park',
//   yell: 'Yellowstone National Park',
//   yose: 'Yosemite National Park',
//   zion: 'Zion National Park'
// };
//
// var getBadges = function(t){
//   return t.card('name')
//   .get('name')
//   .then(function(cardName){
//     var badgeColor;
//     var icon = GRAY_ICON;
//     var lowercaseName = cardName.toLowerCase();
//     if(lowercaseName.indexOf('green') > -1){
//       badgeColor = 'green';
//       icon = WHITE_ICON;
//     } else if(lowercaseName.indexOf('yellow') > -1){
//       badgeColor = 'yellow';
//       icon = WHITE_ICON;
//     } else if(lowercaseName.indexOf('red') > -1){
//       badgeColor = 'red';
//       icon = WHITE_ICON;
//     }
//
//     if(lowercaseName.indexOf('dynamic') > -1){
//       // dynamic badges can have their function rerun after a set number
//       // of seconds defined by refresh. Minimum of 10 seconds.
//       return [{
//         dynamic: function(){
//           return {
//             title: 'Detail Badge', // for detail badges only
//             text: 'Dynamic ' + (Math.random() * 100).toFixed(0).toString(),
//             icon: icon, // for card front badges only
//             color: badgeColor,
//             refresh: 10
//           }
//         }
//       }]
//     }
//
//     if(lowercaseName.indexOf('static') > -1){
//       // return an array of badge objects
//       return [{
//         title: 'Detail Badge', // for detail badges only
//         text: 'Static',
//         icon: icon, // for card front badges only
//         color: badgeColor
//       }];
//     } else {
//       return [];
//     }
//   })
// };
//
// var formatNPSUrl = function(t, url){
//   if(!/^https?:\/\/www\.nps\.gov\/[a-z]{4}\//.test(url)){
//     return null;
//   }
//   var parkShort = /^https?:\/\/www\.nps\.gov\/([a-z]{4})\//.exec(url)[1];
//   if(parkShort && parkMap[parkShort]){
//     return parkMap[parkShort];
//   } else{
//     return null;
//   }
// };
//

//
// var cardButtonCallback = function(t){
//   var items = Object.keys(parkMap).map(function(parkCode){
//     var urlForCode = 'http://www.nps.gov/' + parkCode + '/';
//     return {
//       text: parkMap[parkCode],
//       url: urlForCode,
//       callback: function(t){
//         return t.attach({ url: urlForCode, name: parkMap[parkCode] })
//         .then(function(){
//           return t.closePopup();
//         })
//       }
//     };
//   });
//
//   return t.popup({
//     title: 'Popup Search Example',
//     items: items,
//     search: {
//       count: 5,
//       placeholder: 'Search National Parks',
//       empty: 'No parks found'
//     }
//   });
// };

var sortCardsInListPopup = function (t) {
    return t.popup({
        title: 'Select List for Sorting',
        url: './sort-list.html',
        height: 200
    })
    .then(function () {
        return t.closePopup();
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

var DOT_ICON = './images/dot.png';

TrelloPowerUp.initialize({
    'board-buttons': function (t, options) {
        return [{
            icon: DOT_ICON,
            text: 'Dot Voting Actions',
            callback: boardButtonCallback
        }];
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
