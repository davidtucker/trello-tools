var t = TrelloPowerUp.iframe();

t.render(function(){
    populateListItems();
    t.sizeTo('#content');
});

var populateListItems = function() {
    return t.lists('name', 'id')
    .then(function(lists) {
        UMTrello.populateSelectListBasedOnData('boardLists', lists, 'All Lists', function(list) {
           return {
               name: list.name,
               value: list.id
           };
        });
    });
};

var handleClearVotesClick = function (e) {
    UMTrello.disableButton('clearVotes');
    var listId = UMTrello.selectListSelectedValue('boardLists');
    return clearVotesForList(listId)
    .then(function() {
        t.closePopup();
    })
    .catch(function(err) {
        console.log("ERR: " + err);
    });
};

var handleClearIDSClick = function (e) {
    UMTrello.disableButton('clearIDS');
    var listId = UMTrello.selectListSelectedValue('boardLists');
    return clearIDSForList(listId)
    .then(function() {
        t.closePopup();
    })
    .catch(function(err) {
        console.log("ERR: " + err);
    });
};

var clearDataForList = function (listId, removeFn) {
    return t.cards('id', 'idList', 'name')
    .then(function(cards) {
        var promises = [];
        cards.forEach(function(card) {
            if(listId === 0 || listId === '0' || card.idList === listId) {
                promises.push(removeFn(card));
            }
        });
        return Promise.all(promises);
    });
};

var clearIDSForCard = function (card) {
    return t.remove(card.id, 'shared', UMTrello.constants.data.ids);
};

var clearIDSForList = function(listId) {
    return clearDataForList(listId, clearIDSForCard);
};

var clearVotesForCard = function (card) {
    return t.remove(card.id, 'shared', UMTrello.constants.data.votes);
};

var clearVotesForList = function(listId) {
    return clearDataForList(listId, clearVotesForCard);
};
