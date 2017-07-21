var t = TrelloPowerUp.iframe();

console.log("Loading Clear List JavaScript");

t.render(function(){
    console.log("RENDER");
    populateListItems();
    t.size();
});

var isClearing = false;

var populateListItems = function() {
    return t.lists('name')
    .then(function(lists) {
        console.dir(lists);
        var sel = document.getElementById('boardLists');
        var fragment = document.createDocumentFragment();
        lists.forEach(function(list) {
            var opt = document.createElement('option');
            opt.innerHTML = list.name;
            opt.value = list.name;
            fragment.appendChild(opt);
        });
        sel.appendChild(fragment);
    });
};

var getSelectedListName = function() {
    var select = document.getElementById('boardLists');
    return select.options[select.selectedIndex].value;
};

var handleClearClick = function (e) {
    console.log("Clear Click");
    disableClearVotesButton();
};

var disableClearVotesButton = function() {
    var sel = document.getElementById('clearVotes');
    sel.setAttribute("disabled");
};

var clearVotesForList = function(listId) {
    return t.cards('id', 'idList')
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
    return t.set(card.id, 'shared', 'com.universalmind.trello.DotVotes', 0);
};