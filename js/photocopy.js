var course;
var semester;
var rollnumber;
var mothername;

// Adding to Firebase
var totalpay;
var student_name;

$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);

    course = urlParams.get('course');
    semester = urlParams.get('semester');
    rollnumber = urlParams.get('rollnumber');
    mothername = urlParams.get('mothername');

    load_data(semester, rollnumber, mothername);
    load_loader(); //EXPERIMENAL
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

function load_data(semester, rollnumber, mothername) {

    load_subjects(semester);

    $('#student-table').find('tr:gt(0)').remove();

    var semester_select = semester;
    var roll = rollnumber;
    var mom = mothername;
    var semester_number = 0;

    (semester_select == 'semesterone') ? semester_number = 1 :
        (semester_select == 'semestertwo') ? semester_number = 2 :
            (semester_select == 'semesterthree') ? semester_number = 3 :
                (semester_select == 'semesterfour') ? semester_number = 4 : console.log('semester select error!');

    var subjects_combination = subjects_key;
    
    var ref = database.ref('results/' + semester_select + '/');
    ref.on("value", gotOne, errData);

    function gotOne(data) {

        var result = data.val();
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

            mark += `
                <td>
                    ${subject} 
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <input name="internal" value="${internal}" id="${subjects_combination[i - 1]}" type="checkbox" class="form-control w-25"/>
                        <label class="my-auto">${internal}</label>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <input name="external" value="${external}" id="${subjects_combination[i - 1]}" type="checkbox" class="form-control w-25"/>
                        <label class="my-auto">${external}</label>
                    </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <input name="practical" value="${practical}" id="${subjects_combination[i - 1]}" type="checkbox" class="form-control w-25"/>
                        <label class="my-auto">${practical}</label>
                    </div>
                </td>
            </tr>`

        }

        var user_name = eval('result' + '.' + 'users' + '.' + roll + '.' + 'name');
        var mother_name = eval('result' + '.' + 'users' + '.' + roll + '.' + 'mother');

        if (mother_name == mom) {
            $('#student-table').append(mark);
            $('#total-mark').text(total);

            (status == 'FAIL') ? ($('#result-status').text(status).css("color", "red")) : ($('#result-status').text(status).css("color", "green"))

            $('#user-name').text(user_name).css("text-transform", "uppercase");
            $('#user-mother').text(mother_name).css("text-transform", "uppercase");
            $('#user-roll').text(roll).css("text-transform", "uppercase");
            $('#user-semester').text(semester_number).css("text-transform", "uppercase");

            student_name = user_name; // Pushing name to Global Variable

        }
        else {
            console.log('Mothername error!');
        }

        // Hiding Loader after ASYNC Call

        document.getElementById('loader').innerHTML = '';
        $('#page-content').show();
    }

    function errData(data) {
        alert("error" + data);
    }
}

function getChecked() {

    event.preventDefault();

    var internal = [];
    var external = [];
    var practical = [];
    var amount = 0;

    $.each($("input[name='internal']:checked"), function () {
        internal.push($(this).val());
        amount += 100;
    });

    $.each($("input[name='external']:checked"), function () {
        external.push($(this).val());
        amount += 100;
    });

    $.each($("input[name='practical']:checked"), function () {
        practical.push($(this).val());
        amount += 100;
    });

    $('#user-amount').text(amount).css("text-transform", "uppercase");
    totalpay = amount;

    // console.log(internal[0]);
    // console.log(external[0]);
    // console.log(practical[0]);

    // console.log(internal);
    // console.log(external);
    // console.log(practical);
    // console.log('amount:  ' + amount);

    // use foreach or map and set function

    // firebase: revaluation -> semester -> rollno -> subject[type: internal|external|prac] -> subject[ip : 77]

}

function resetform() {
    event.preventDefault();
    document.getElementById("check_form").reset();
    $('#user-amount').text(0).css("text-transform", "uppercase");

    $('#print').css("display", "none");
}

function submitreq() {

    getChecked();

    $('#print').css("display", "inline-block");

    event.preventDefault();

    var internal_id = [];
    var internal_val = [];
    var external_id = [];
    var external_val = [];
    var practical_id = [];
    var practical_val = [];

    var amount = 0;
    var date = moment().format("YYYY/MM/DD");

    $.each($("input[name='internal']:checked"), function () {
        internal_val.push($(this).val());
        amount += 100;
    });

    $.each($("input[name='external']:checked"), function () {
        external_val.push($(this).val());
        amount += 100;
    });

    $.each($("input[name='practical']:checked"), function () {
        practical_val.push($(this).val());
        amount += 100;
    });

    $.each($("input[name='internal']:checked"), function () {
        internal_id.push($(this).attr('id'));
        amount += 100;
    });

    $.each($("input[name='external']:checked"), function () {
        external_id.push($(this).attr('id'));
        amount += 100;
    });

    $.each($("input[name='practical']:checked"), function () {
        practical_id.push($(this).attr('id'));
        amount += 100;
    });

    // console.log("id_print");
    // console.log(internal_id);
    // console.log(external_id);
    // console.log(practical_id);

    // console.log("val_print");
    // console.log(internal_val);
    // console.log(external_val);
    // console.log(practical_val);

    var ref = database.ref('photocopy/' + semester + '/' + 's001');
    ref.remove();

    internal_id.map((id, index) => {

        database.ref('photocopy/' + semester + '/' + rollnumber + '/internal').update({
            [id]: internal_val[index]
        });
    });

    external_id.map((id, index) => {

        database.ref('photocopy/' + semester + '/' + rollnumber + '/external').update({
            [id]: external_val[index]
        });
    });

    practical_id.map((id, index) => {

        database.ref('photocopy/' + semester + '/' + rollnumber + '/practical').update({
            [id]: practical_val[index]
        });
    });

    // momentJS date
    // 0 indicates not paid, not processed
    database.ref('photocopy/' + semester + '/' + rollnumber).update({
        date,
        pay : totalpay,
        paid : 'notpaid',
        status : 'notprocessed',
        name : student_name
    });

    alert('Request Generated. Please, Take a Print and visit College Office for Payment.');
}

function load_loader() {

    // Showing Loader during ASYNC Call
    document.getElementById('loader').innerHTML = '<div class="loader"></div>';
    $('#page-content').hide();
}

function printPage(){
    getChecked();
    $('#calcpay').hide();
    $('#reset').hide();
    $('#print').hide();
    $('#submitreq').hide();
    window.print()
    $('#calcpay').show();
    $('#reset').show();
    $('#print').show();
    $('#submitreq').show();
}