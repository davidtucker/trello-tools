UMTrello = {};

UMTrello.populateSelectListBasedOnData = function(selId, data, mapping) {
    var sel = document.getElementById(selId);
    var fragment = document.createDocumentFragment();
    data.forEach(function(item) {
        var opt = document.createElement('option');
        var itemData = mapping(item);
        opt.innerHTML = itemData.name;
        opt.value = itemData.value;
        fragment.appendChild(opt);
    });
    sel.appendChild(fragment);
};

UMTrello.selectListSelectedName = function(selId) {
    var select = document.getElementById(selId);
    return select.options[select.selectedIndex].innerHTML;
};

UMTrello.selectListSelectedValue = function(selId) {
    var select = document.getElementById(selId);
    return select.options[select.selectedIndex].value;
};

UMTrello.disableButton = function(buttonId) {
    var sel = document.getElementById(buttonId);
    sel.setAttribute("disabled", "");
};

UMTrello.constants = {};
UMTrello.constants.data = {
    votes: 'com.universalmind.trello.DotVotes'
};

