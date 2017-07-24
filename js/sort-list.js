var t = TrelloPowerUp.iframe();

console.log("Loading Sort List JavaScript");

t.render(function(){
    console.log("RENDER");
    populateListItems();
    t.sizeTo('#content');
});

var isSorting = false;

var populateListItems = function() {
    return t.lists('name')
    .then(function(lists) {
        UMTrello.populateSelectListBasedOnData('boardLists', lists, function(list) {
            return {
                name: list.name,
                value: list.id
            };
        });
    });
};

var handleSortClick = function (e) {
    console.log("Sort Click");
    var selectedListName = UMTrello.selectListSelectedName('boardLists');
    console.log("Selected List Name: " + selectedListName);
    if(isSorting) {
        return;
    }
    isSorting = true;
};