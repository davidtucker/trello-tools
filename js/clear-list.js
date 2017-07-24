var t = TrelloPowerUp.iframe();

t.render(function(){
    populateListItems();
    t.sizeTo('#content');
});

var isClearing = false;

var populateListItems = function() {
    return t.lists('name', 'id')
    .then(function(lists) {
        var sel = document.getElementById('boardLists');
        var fragment = document.createDocumentFragment();
        lists.forEach(function(list) {
            var opt = document.createElement('option');
            opt.innerHTML = list.name;
            opt.value = list.id;
            fragment.appendChild(opt);
        });
        sel.appendChild(fragment);
    });
};

var getSelectedListId = function() {
    var select = document.getElementById('boardLists');
    return select.options[select.selectedIndex].value;
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
            if (card.idList === listId) {
                promises.push(clearVotesForCard(card));
            }
        });
        return Promise.all(promises);
    })
};

var clearVotesForCard = function (card) {
    return t.set(card.id, 'shared', UMTrello.constants.data.votes, 0);
};