UMTrello = {};

UMTrello.populateSelectListBasedOnData = function(selId, data, nullItem, mapping) {
    var sel = document.getElementById(selId);
    var fragment = document.createDocumentFragment();
    if(nullItem) {
        var opt = document.createElement('option');
        opt.innerHTML = nullItem;
        opt.value = 0;
        fragment.appendChild(opt);
    }
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

UMTrello.enableButton = function(buttonId) {
    var sel = document.getElementById(buttonId);
    sel.removeAttribute("disabled");
};

UMTrello.getMembersNameFromID = function(members, id) {
    var member = members.find(function(item) {
        return item.id === id;
    });
    return member.fullName;
};

UMTrello.getMembersFirstName = function(member) {
    return member.fullName.split(' ')[0];
};

UMTrello.constants = {};
UMTrello.constants.data = {
    votes: 'com.universalmind.trello.DotVotes',
    ids: 'com.universalmind.trello.IDS'
};

