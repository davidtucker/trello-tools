var t = TrelloPowerUp.iframe();

console.log("Loading Clear List JavaScript");

t.render(function(){
    console.log("RENDER");
    populateListItems();
    t.sizeTo('#content');
});

var isClearing = false;

var populateListItems = function() {
    return t.lists('name', 'id')
    .then(function(lists) {
        console.dir(lists);
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
    console.log("Clear Click");
    disableClearVotesButton();
    var listId = getSelectedListId();
    return clearVotesForList(listId)
    .then(function() {
        console.log("Votes Cleared");
        t.closePopup();
    })
    .catch(function(err) {
        console.log("ERR: " + err);
    });
};

var disableClearVotesButton = function() {
    var sel = document.getElementById('clearVotes');
    sel.setAttribute("disabled", "");
};

var clearVotesForList = function(listId) {
    console.log("Selected List ID: " + listId);
    return t.cards('id', 'idList', 'name')
    .then(function(cards) {
        console.log("CARDS");
        console.dir(cards);
        var promises = [];
        cards.forEach(function(card) {
            if (card.idList === listId) {
                console.log("Card Added To Promises: " + card.name);
                promises.push(clearVotesForCard(card));
            }
        });
        return Promise.all(promises);
    })
};

var clearVotesForCard = function (card) {
    return t.set(card.id, 'shared', 'com.universalmind.trello.DotVotes', 0);
};