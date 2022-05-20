makenav('students');

function goto() {

    var rollno = 's003';
    var name = 'John Doe';
    var mothername = 'Jane';
    var dob = '10/10/1992';
    var mode = 'REGULAR';

    var mark = '<tr>';

    mark += `<td> ${rollno} </td>
                <td> ${ name} </td>
                <td> ${ mothername} </td>
                <td> ${ dob} </td>
                <td> ${ mode} </td>
                <td class="text-right">
                    <button onclick="load_details(this.id)" id="${rollno}"
                        class="btn btn-primary">DETAILS</button>
                    <button onclick="load_marks(this.id)" id="${rollno}"
                        class="btn btn-primary">MARKS</button>
                    <button onclick="load_delete(this.id)" id="${rollno}"
                        class="btn btn-primary">DELETE</button>
                </td>
                </tr>`

    $('#student-table').append(mark).css("text-transform", "uppercase");;
}

function load_details(data) {

    event.preventDefault();
    // alert('Details: ' + data + ' Under Construction ');

    var semester_select = document.getElementById('semester').value;

    var ref = database.ref('results/' + semester_select + '/' + 'users' + '/' + data);
    ref.once("value")
        .then(function (snapshot) {

            // console.log(snapshot.val());
            // console.log(newValue);

            var details = snapshot.val();
            // console.log(details.dob + '   ' + details.name);

            var newRoll = data;
            var newName = details.name;
            var newMom = details.mother;
            var newDob = details.dob;
            var newMode = details.mode;

            console.log(newRoll, newName, newMom, newDob, newMode);

            document.getElementById('newRoll').value = newRoll;
            document.getElementById('newName').value = newName;
            document.getElementById('newMom').value = newMom;
            document.getElementById('newDob').value = newDob;
            document.getElementById('newMode').value = newMode;

        });

}

function load_marks(data) {
    event.preventDefault();
    //data -> roll number

        var semester = $('#semester').val();

        window.open('update_add.html?semester=' + semester + '&rollnumber=' + data, '_blank');

    }

function load_delete(data) {
    event.preventDefault();
    // alert('Delete: ' + data);
    var semester_select = document.getElementById('semester').value;

    var ref = database.ref('results/' + semester_select + '/' + 'users' + '/' + data);
    ref.remove();
    alert('Delete Operation Success!');
    load_students();
}


//


function load_students() {
    event.preventDefault();

    $('#student-table').find('tr:gt(0)').remove();
    // alert('Load: ');
    
    var semester_select = document.getElementById('semester').value;
    (semester_select == 0) ? alert('Please, Select Semester') : null;

    var ref = database.ref('results/' + semester_select + '/' + 'users' + '/');
    ref.once("value")
        .then(function (snapshot) {

            var newKey = [];
            var newValue = [];
            var rootKey = [];
            var subject_length = snapshot.numChildren();
            var record = '';

            for (var i = 0; i < subject_length; i++) {
                newKey[i] = Object.keys(snapshot.val())[i];
                newValue[i] = snapshot.child(newKey[i]).val();
                rootKey[i] = snapshot.child(newKey[i]).key;

                var roll = snapshot.child(newKey[i]).key;
                var name = newValue[i].name;
                var mother_name = newValue[i].mother;
                var dob = newValue[i].dob;
                var mode = newValue[i].mode;

                record += `<tr><td>${roll}</td>
                    <td>${ name}</td>
                    <td>${ mother_name}</td>
                    <td>${ dob}</td>
                    <td>${ mode}</td>
                    <td class="text-right">
                        <button onclick="load_details(this.id)" id="${ roll}"
                            class="btn btn-primary">EDIT</button>
                        <button onclick="load_marks(this.id)" id="${ roll}"
                            class="btn btn-primary">MARKS</button>
                        <button onclick="load_delete(this.id)" id="${ roll}"
                            class="btn btn-danger">DELETE</button>
                    </td>
                    </tr>`

                // console.log(newValue[i].dob);
                // console.log(newValue[i].mode);
                // console.log(newValue[i].mother);
                // console.log(newValue[i].name);
                // console.log(snapshot.child(newKey[i]).key);
            }

            $('#student-table').append(record).css("text-transform", "uppercase");;

            // console.log(newValue);
        });
}

function add_students_v() {
    var semester_select = document.getElementById('semester').value;

    semester_select == 0 ? alert('Select Semester') : add_students();
}

function add_students() {

    event.preventDefault();
    alert('Add: ');

    var semester_select = document.getElementById('semester').value;

    let add = ['newRoll', 'newName', 'newMom', 'newDob', 'newMode'];

    let sendAdd = add.map((val) => {

        return GetEle(val);
    });

    function GetEle(val) {

        var value = document.getElementById(val).value;
        document.getElementById(val).value = '';
        return value;
    }

    var [newRoll, newName, newMom, newDob, newMode] = sendAdd;

    firebase.database().ref('results/' + semester_select + '/' + 'users' + '/' + newRoll).set({
        name: newName,
        mother: newMom,
        dob: newDob,
        mode: newMode
    });

    alert('Add Success');
    load_students();

}