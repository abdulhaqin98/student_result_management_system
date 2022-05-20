makenav('revaluation');

function load_students() {
    event.preventDefault();

    $('#student-table').find('tr:gt(0)').remove();
    // alert('Load: ');

    var semester_select = document.getElementById('semester').value;
    
    (semester_select == 0) ? alert('Please, Select Semester') : null;

    var ref = database.ref('revaluation/' + semester_select + '/');
    ref.once("value")
        .then(function (snapshot) {

            console.log(snapshot.key); // returns semesterone

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
                var date = newValue[i].date;
                var pay = newValue[i].pay;
                var paid = newValue[i].paid;
                var status = newValue[i].status;

                var paid0 = '';
                var paid1 = '';

                var status0 = '';
                var status1 = '';
                var status2 = '';

                // Payment and Status checking and assigning selected to Select Tag!

                (paid == 'notpaid') ? (paid0 = 'selected') : (paid1 = 'selected');

                (status == 'notprocessed') ? status0 = 'selected'
                    : (status == 'processing') ? status1 = 'selected'
                        : (status == 'processed') ? status2 = 'selected' : console.log('status error');


                record += `<tr><td>${roll}</td>
                    <td>${ name}</td>
                    <td>${ date}</td>
                    <td>${ pay}</td>
                    <td>
                        <select class="form-control" id="paid"
                            required="required">
                            <option value="notpaid" ${paid0}>NOT PAID</option>
                            <option value="paid" ${paid1}>PAID</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-control" id="status"
                            required="required">
                            <option value="notprocessed" ${status0}>NOT PROCESSED</option>
                            <option value="processing" ${status1}>PROCESSING</option>
                            <option value="processed" ${status2}>PROCESSED</option>
                        </select>
                    </td>
                    <td class="text-right">
                        <button onclick="load_update(this.id)" id="${ roll}"
                            class="btn btn-warning">UPDATE</button>
                        <button onclick="load_details(this.id)" id="${ roll}"
                            class="btn btn-primary">DETAILS</button>
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

            console.log(newKey);
            console.log(newValue); // returns useful information
            console.log(rootKey);
        });
}

function load_details(data) {

    event.preventDefault();

    var semester_select = document.getElementById('semester').value;
    var roll = data;
    var record = '';
    var subjects_key = {};

    // Load subjects and Keys!

    var subref = database.ref('subjects/' + semester_select + '/');
    subref.once("value")
        .then(function (snapshot) {
            subjects_key = snapshot.val();
        });


    // var subjects_key = {
    //     ip: "Imperative Programming",
    //     de: "Digital Electronics",
    //     os: "Operating Systems",
    //     dm: "Discrete Mathematics",
    //     cs: "Communication Skills"
    // };

    //

    var ref = database.ref('revaluation/' + semester_select + '/' + roll + '/');
    ref.once("value")
        .then(function (snapshot) {

            var snap = snapshot.val();
            console.log(snap.internal);

            var internal = null;
            var external = null;
            var practical = null;

            internal = snap.internal;
            external = snap.external;
            practical = snap.practical;

            //TEST ARRAY

            if (internal) {

                record += `<h4>Internal</h4>`

                for (var key in internal) {
                    if (internal.hasOwnProperty(key)) {
                        var val = internal[key];
                        record += `<p>${subjects_key[key]} : ${val}</p>`
                    }
                }
            }

            if (external) {

                record += `<h4>External</h4>`

                for (var key in external) {
                    if (external.hasOwnProperty(key)) {
                        var val = external[key];
                        record += `<p>${subjects_key[key]} : ${val}</p>`
                    }
                }
            }

            if (practical) {

                record += `<h4>Practical</h4>`

                for (var key in practical) {
                    if (practical.hasOwnProperty(key)) {
                        var val = practical[key];
                        record += `<p>${subjects_key[key]} : ${val}</p>`
                    }
                }
            }

            // END OF TEST
            console.log(record);

            $('#modal-body').html(record);
            $('#myModal').modal('toggle');

        });
}

function load_delete(data) {
    event.preventDefault();
    // alert('Delete: ' + data);
    var semester_select = document.getElementById('semester').value;
    var roll = data;

    var ref = database.ref('revaluation/' + semester_select + '/' + roll);
    ref.remove();
    alert('Delete Operation Success!');
    load_students();
}

function load_update(data) {

    event.preventDefault();
    alert('Row Updated.');

    var semester_select = document.getElementById('semester').value;
    var roll = data;

    var paid = $('#paid').val();
    var status = $('#status').val();

    firebase.database().ref('revaluation/' + semester_select + '/' + roll).update({
        paid,
        status
    });

    load_students();

}