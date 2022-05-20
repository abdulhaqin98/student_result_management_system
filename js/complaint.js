makenav('complaint');

function revaluation() {

    var course = $('#course').val();
    var semester = $('#semester').val();
    var rollnumber = $('#rollnumber').val();
    var mothername = $('#mothername').val();

    window.location = 'revaluation.html?course=' + course + '&semester=' + semester + '&rollnumber=' + rollnumber + '&mothername=' + mothername;

}

function photocopy() {

    var course = $('#pcourse').val();
    var semester = $('#psemester').val();
    var rollnumber = $('#prollnumber').val();
    var mothername = $('#pmothername').val();

    window.location = 'photocopy.html?course=' + course + '&semester=' + semester + '&rollnumber=' + rollnumber + '&mothername=' + mothername;

}
