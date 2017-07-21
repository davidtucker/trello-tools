var t = TrelloPowerUp.iframe();

console.log("Loading Sort List JavaScript");

t.render(function(){
    console.log("RENDER");
    populateListItems();
});

var isSorting = false;

var populateListItems = function() {
    return t.lists('name')
    .then(function(data) {
        console.dir(data);
    });
};

var handleSortClick = function (e) {
    console.log("Sort Click");
    if(isSorting) {
        return;
    }
    isSorting = true;
};