var t = TrelloPowerUp.iframe();

t.render(function(){
    // this function we be called once on initial load
    // and then called each time something changes that
    // you might want to react to, such as new data being
    // stored with t.set()
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
    if(isSorting) {
        return;
    }
    isSorting = true;
};