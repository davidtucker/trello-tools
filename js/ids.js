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
        console.log(members);
        console.dir(members);
        UMTrello.populateSelectListBasedOnData('idsReporter', members, 'Select a Reporter', function(member) {
            return {
                name: member.fullName,
                value: member.id
            };
        });
        UMTrello.populateSelectListBasedOnData('idsAssignee', members, 'Select an Assignee', function(member) {
            return {
                name: member.fullName,
                value: member.id
            };
        });
        return t.get('card', 'shared', UMTrello.constants.data.ids, {})
        .then(function(data) {
            updateFormState(data);
        });
    });
};

var updateFormState = function(data) {
    document.getElementById('idsWhat').value = data.what ? data.what : '';
    document.getElementById('idsReporter').value = data.reporter ? data.reporter : 0;
    document.getElementById('idsAssignee').value = data.assignee ? data.assignee : 0;
};

var handleIDSSave = function (e) {
    UMTrello.disableButton('updateIDS');
    UMTrello.disableButton('deleteIDS');
    var data = {
        reporter: UMTrello.selectListSelectedValue('idsReporter'),
        assignee: UMTrello.selectListSelectedValue('idsAssignee'),
        what: document.getElementById('idsWhat').value.trim()
    };
    return t.set('card', 'shared', UMTrello.constants.data.ids, data)
    .then(function() {
        t.closePopup();
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

