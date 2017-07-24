var t = TrelloPowerUp.iframe();

t.render(function(){
    populateForm();
    t.sizeTo('#content');
});

var populateForm = function() {
    var members = {};
    return t.board('all')
    .then(function(board) {
        members = board.members;
        UMTrello.populateSelectListBasedOnData('idsReporter', members, 'Select a Reporter', function(list) {
            return {
                name: list.name,
                value: list.id
            };
        });
        UMTrello.populateSelectListBasedOnData('idsAssignee', members, 'Select an Assignee', function(list) {
            return {
                name: list.name,
                value: list.id
            };
        });
        return t.get('card', 'shared', UMTrello.constants.data.ids, {})
        .then(function(data) {
            updateFormState(data);
        });
    });
};

var updateFormState = function(data) {
    document.getElementById('idsWhat').value = data.what;
    document.getElementById('idsReporter').value = data.reporter;
    document.getElementById('idsAssignee').value = data.assignee;
};

var handleIDSSave = function (e) {
    UMTrello.disableButton('updateIDS');
    UMTrello.disableButton('deleteIDS');
    var data = {
        reporter: UMTrello.selectListSelectedValue('idsReporter'),
        assignee: UMTrello.selectListSelectedValue('idsAssignee'),
        what: document.getElementById('idsWhat').value
    };
    return t.set('card', 'shared', UMTrello.constants.data.ids, data)
    .then(function() {
        UMTrello.enableButton('updateIDS');
        UMTrello.enableButton('deleteIDS');
    });
};

var handleIDSDelete = function (e) {
    UMTrello.disableButton('updateIDS');
    UMTrello.disableButton('deleteIDS');
    return t.remove('card', 'shared', UMTrello.constants.data.ids)
    .then(function() {
        t.closePopup();
    });
};

