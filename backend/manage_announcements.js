$(document).ready(function () {

    makenav('announcements');

    $('#student-table').find('tr:gt(0)').remove();
    // alert('Load: ');

    var ref = database.ref('announcements/');
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
                var name = newValue[i].date;
                var mother_name = newValue[i].topic;

                record += `<tr><td>${roll}</td>
                    <td>${ name}</td>
                    <td>${ mother_name}</td>
                    <td class="text-right">
                        <button onclick="load_details(this.id)" id="${ roll}"
                            class="btn btn-warning">EDIT</button>
                        <button onclick="load_delete(this.id)" id="${ roll}"
                            class="btn btn-danger">DELETE</button>
                    </td>
                    </tr>`
            }

            $('#student-table').append(record).css("text-transform", "uppercase");;

        });
});

function load_delete(data) {
    event.preventDefault();

    var ref = database.ref('announcements/' + data);
    ref.remove();
    alert('Delete Operation Success!');
    window.location.reload();
}

function add_announcement() {
    event.preventDefault();
    // alert('add ann');

    window.location = 'announcements_add.html';
}

function load_details(data) {
    event.preventDefault();
    // alert('edit called');
    //data -> roll number
    window.open('announcements_add.html?announcement=' + data, '_blank');

}
