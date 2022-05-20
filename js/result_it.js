$(document).ready(function () {
    // alert('hello');

    const urlParams = new URLSearchParams(window.location.search);
    var course = urlParams.get('course');
    var semester = urlParams.get('semester');
    var rollnumber = urlParams.get('rollnumber');
    var mothername = urlParams.get('mothername');

    console.log(course + ' ' + semester + ' ' + rollnumber + ' ' + mothername);

    load_data(semester, rollnumber, mothername);
    load_loader();
});

// Load subjects and Keys!

var subjects_key_value = {};
var subjects_key = [];

// Cannot declare Vars inside. Scope issue!

function load_subjects(semesterload) {

    var semester_select = semesterload;

    var subref = database.ref('subjects/' + semester_select + '/');

    subref.once("value")
        .then(function (snapshot) {

            subjects_key_value = snapshot.val();

            var length = snapshot.numChildren();

            for (i = 0; i < length; i++) {

                subjects_key[i] = Object.keys(snapshot.val())[i];
            }
        });

}

//

function load_data(semester, rollnumber, mothername) {

    load_subjects(semester);

    // var semester_select = 'semesterone';
    // var roll = 's001';

    var semester_select = semester;
    var semester_number = 0;
    var roll = rollnumber;
    var mom = mothername;

    // var subjects_s1 = ["ip", "de", "os", "cs", "dm"];
    // var subjects_s2 = ["gc", "mpa", "nsm", "oops", "wp"];
    // var subjects_s3 = ["gc", "mpa", "nsm", "oops", "wp"];
    // var subjects_s4 = ["gc", "mpa", "nsm", "oops", "wp"];
    // var subjects_combination = [];

    // (semester_select == 'semesterone') ? subjects_combination = subjects_s1 :
    //     (semester_select == 'semestertwo') ? subjects_combination = subjects_s2 :
    //         (semester_select == 'semesterthree') ? subjects_combination = subjects_s3 :
    //             (semester_select == 'semesterfour') ? subjects_combination = subjects_s4 : console.log('semester select error!');

    (semester_select == 'semesterone') ? semester_number = 1 :
        (semester_select == 'semestertwo') ? semester_number = 2 :
            (semester_select == 'semesterthree') ? semester_number = 3 :
                (semester_select == 'semesterfour') ? semester_number = 4 : console.log('semester select error!');

    var subjects_combination = subjects_key;

    // console.log(subjects_combination);

    var ref = database.ref('results/' + semester_select + '/');
    ref.on("value", gotOne, errData);
    // alert(ref);

    function gotOne(data) {

        var result = data.val();
        console.log(result);
        var mark = '<tr>';
        var total = 0;
        var status = 'PASS';

        for (var i = 1; i <= 5; i++) {


            var subject = subjects_key_value[subjects_combination[i - 1]];
            // var subject = eval('result' + '.' + 'subjects' + '.' + subjects_combination[i - 1]);
            var internal = eval('result' + '.' + roll + '.' + subjects_combination[i - 1] + '.' + 'internal');
            var external = eval('result' + '.' + roll + '.' + subjects_combination[i - 1] + '.' + 'external');
            var practical = eval('result' + '.' + roll + '.' + subjects_combination[i - 1] + '.' + 'practical');

            // (internal/25)*100 >= 35 ? internal : internal='0';
            (internal / 25) * 100 >= 35 ? internal : status = 'FAIL';
            (external / 75) * 100 >= 35 ? external : status = 'FAIL';
            (practical / 50) * 100 >= 35 ? practical : status = 'FAIL';

            total += eval(internal) + eval(external) + eval(practical);

            mark += `<td> ${subject} </td>
                <td> ${ internal} </td>
                <td> ${ external} </td>
                <td> ${ practical} </td></tr>`

        }

        var user_name = eval('result' + '.' + 'users' + '.' + roll + '.' + 'name');
        var mother_name = eval('result' + '.' + 'users' + '.' + roll + '.' + 'mother');
        var mode = eval('result' + '.' + 'users' + '.' + roll + '.' + 'mode');
        console.log(user_name);
        console.log(mother_name);


        // (total/750)*100 >= 35 ? console.log('pass') : console.log('fail');
        // (total/750)*100 >= 35 ? status = 'PASS' : status='FAIL'

        // console.log(mom + '1');
        // console.log(mother_name + '2');

        if (mother_name == mom) {
            $('#employee-table').append(mark);
            $('#total-mark').text(total);

            (status == 'FAIL') ? ($('#result-status').text(status).css("color", "red")) : ($('#result-status').text(status).css("color", "green"))

            $('#user-name').text(user_name).css("text-transform", "uppercase");
            $('#user-mother').text(mother_name).css("text-transform", "uppercase");
            $('#user-roll').text(roll).css("text-transform", "uppercase");

            $('#result-semester').text(semester_number);
            $('#result-mode').text(mode).css("text-transform", "uppercase");;

        }
        else {
            console.log('Mothername error!');
        }

        // Hiding Loader after ASYNC Call

        document.getElementById('loader').innerHTML = '';
        $('#main').show();
    }

    function errData(data) {
        alert("error" + data);
    }
}

// auto-generate tr like github-firebase-master , use mapfunction

function load_loader(){

    // Showing Loader during ASYNC Call
    document.getElementById('loader').innerHTML = '<div class="loader"></div>';
    $('#main').hide();
}

function printPage(){
    $('#print').hide();
    window.print();
    $('#print').show();
}