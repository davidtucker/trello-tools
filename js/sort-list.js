var t = TrelloPowerUp.iframe();

console.log("Loading Sort List JavaScript");

t.render(function(){
    console.log("RENDER");
    populateListItems();
});

var isSorting = false;

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

var handleSortClick = function (e) {
    console.log("Sort Click");
    console.log("Event: " + e);
    if(isSorting) {
        return;
    }
    isSorting = true;
};