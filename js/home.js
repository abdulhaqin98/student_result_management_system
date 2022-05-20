makenav('home');

function gotopath() {

    var course = $('#course').val();
    var semester = $('#semester').val();
    var rollnumber = $('#rollnumber').val();
    var mothername = $('#mothername').val();
    
    window.location = 'result_it.html?course=' + course + '&semester=' + semester + '&rollnumber=' + rollnumber + '&mothername=' + mothername;
    
    // alert(course + semester + rollnumber + mothername);
    // window.location = '/result_it.html?course=';
}

// document.getElementById("btnclick").addEventListener("click", hello);