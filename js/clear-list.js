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

var handleClearClick = function (e) {
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

var clearVotesForList = function(listId) {
    return t.cards('id', 'idList', 'name')
    .then(function(cards) {
        var promises = [];
        cards.forEach(function(card) {
            if(listId === 0 || card.idList === listId) {
                console.log("Clear Card");
                promises.push(clearVotesForCard(card));
            }
        });
        return Promise.all(promises);
    });
};

var clearVotesForCard = function (card) {
    return t.remove(card.id, 'shared', UMTrello.constants.data.votes);
};
