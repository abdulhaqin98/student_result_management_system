makenav('track');

function revaluation() {

    var course = $('#course').val();
    var semester = $('#semester').val();
    var rollnumber = $('#rollnumber').val();
    var mothername = $('#mothername').val();

    // window.location = 'revaluation.html?course=' + course + '&semester=' + semester + '&rollnumber=' + rollnumber + '&mothername=' + mothername;
    load_details(semester, rollnumber, 'revaluation');
}

function photocopy() {

    var course = $('#pcourse').val();
    var semester = $('#psemester').val();
    var rollnumber = $('#prollnumber').val();
    var mothername = $('#pmothername').val();

    // window.location = 'photocopy.html?course=' + course + '&semester=' + semester + '&rollnumber=' + rollnumber + '&mothername=' + mothername;
    load_details(semester, rollnumber, 'photocopy');
}

function load_details(semester, rollnumber, type) {

    var semester_select = semester;
    var roll = rollnumber;
    var record = '';
    var subjects_key = {};

    // Load subjects and Keys!

    var subref = database.ref('subjects/' + semester_select + '/');
    subref.once("value")
        .then(function (snapshot) {
            subjects_key = snapshot.val();
        });

    var ref = database.ref( type +'/' + semester_select + '/' + roll + '/');
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

            var status = snap.status;
            var paid = snap.paid;
            var date = snap.date;
            var name = snap.name;

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

            record += `<hr><p>Name: <b>${name}</b></p>
                            <p>Date Applied: <b>${date}</b></p>
                            <p>Paid: <b>${paid}</b></p>
                            <p>Status: <b>${status}</b></p>`

            // END OF TEST

            $('#modal-body').html(record);
            $('#myModal').modal('toggle');

        });
}
