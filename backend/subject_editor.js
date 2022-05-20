$(document).ready(function () {

    makenav('config');

    $("form").submit(function () {
        event.preventDefault();
        var val = $("button[type=submit][clicked=true]").attr('id');

        val == 'btnload' ? load_data() : val == 'btnsave' ? save_data() : null;
    });
    $("form button[type=submit]").click(function () {
        $("button[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });
});

function load_data() {

    var semester_select = document.getElementById('semester').value;

    // var ref = database.ref('results/' + semester_select + '/' + 'subjects' + '/');

    var ref = database.ref('subjects' + '/' + semester_select + '/');
    ref.once("value").then(function (snapshot) {

        let key = ['k1', 'k2', 'k3', 'k4', 'k5'];
        let key_subject = ['s1', 's2', 's3', 's4', 's5'];

        function LoadEle(target, set) {
    
            document.getElementById(target).value = set;
        }

        var subject_key = [];
        var subject_value = [];
        var subject_length = snapshot.numChildren();

        for (var i = 0; i < subject_length; i++) {
            subject_key[i] = Object.keys(snapshot.val())[i];
            subject_value[i] = snapshot.child(subject_key[i]).val();

            LoadEle(key[i], subject_key[i]);
            LoadEle(key_subject[i], subject_value[i]);
        }
    });
}

function save_data() {

    var semester_select = document.getElementById('semester').value;

    let key = ['k1', 'k2', 'k3', 'k4', 'k5'];
    let key_subject = ['s1', 's2', 's3', 's4', 's5'];

    let NewKey = key.map((val) => {

        return GetEle(val);
    });

    let NewSubject = key_subject.map((val) => {

        return GetEle(val);
    });

    function GetEle(val) {

        return document.getElementById(val).value;
    }

    var ref = database.ref('results/' + semester_select + '/' + 'subjects');
    ref.remove();

    for(var i=0; i<5; i++){

        // firebase.database().ref('results/' + semester_select + '/' + 'subjects' + '/' + NewKey[i]).set(NewSubject[i]);
        firebase.database().ref('subjects/' + semester_select + '/' + NewKey[i]).set(NewSubject[i]);

    }

}