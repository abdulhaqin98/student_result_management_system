$(document).ready(function () {

    makenav('students');

    $("form").submit(function () {
        event.preventDefault();
        var val = $("button[type=submit][clicked=true]").attr('id');

        val == 'btnload' ? load_data() : val == 'btnsave' ? save_data() : null;
    });
    $("form button[type=submit]").click(function () {
        $("button[type=submit]", $(this).parents("form")).removeAttr("clicked");
        $(this).attr("clicked", "true");
    });

    const urlParams = new URLSearchParams(window.location.search);
    var semester = urlParams.get('semester');
    var rollnumber = urlParams.get('rollnumber');

    document.getElementById('semester').value = semester;
    document.getElementById('roll_number').value = rollnumber;
    load_data();

});

// Load subjects and Keys!

var subjects_key_value = {};
var subjects_key = [];

// Cannot declare Vars inside. Scope issue!

function load_subjects() {

    var semester_select = document.getElementById('semester').value;

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

function load_data() {

    load_subjects();

    var semester_select = document.getElementById('semester').value;
    var roll = document.getElementById('roll_number').value;

    var subjects_combination = subjects_key;

    var ref = database.ref('results/' + semester_select + '/');
    ref.on("value", gotOne, errData);

    // alert(ref);

    function gotOne(data) {
        var result = data.val();

        let arr = ['i1', 'i2', 'i3', 'i4', 'i5', 'e1', 'e2', 'e3', 'e4', 'e5', 'p1', 'p2', 'p3', 'p4', 'p5', 's1', 's2', 's3', 's4', 's5'];

        let plus5 = arr.map((val) => {

            return GetEle(val);
        });

        function GetEle(val) {
            num = val + 'hello';
            return document.getElementById(val);
        }

        var [i1, i2, i3, i4, i5, e1, e2, e3, e4, e5, p1, p2, p3, p4, p5, s1, s2, s3, s4, s5] = plus5;

        for (var i = 1; i <= 5; i++) {

            var subject = subjects_key_value[subjects_combination[i - 1]];
            eval('s' + i).innerHTML = subject;

        }

        for (var i = 1; i <= 5; i++) {

            // var subject = eval('result' + '.' + 'subjects' + '.' + subjects_combination[i - 1]);
            // var subject = subjects_key_value[subjects_combination[i-1]];
            var internal = eval('result' + '.' + roll + '.' + subjects_combination[i - 1] + '.' + 'internal');
            var external = eval('result' + '.' + roll + '.' + subjects_combination[i - 1] + '.' + 'external');
            var practical = eval('result' + '.' + roll + '.' + subjects_combination[i - 1] + '.' + 'practical');

            // eval('s' + i).innerHTML = subject;
            eval('i' + i).value = internal;
            eval('e' + i).value = external;
            eval('p' + i).value = practical;
        }

    }

    function errData(data) {
        alert("error" + data);
    }
}

function save_data() {

    load_subjects();

    var semester_select = document.getElementById('semester').value;
    var roll = document.getElementById('roll_number').value;

    var subjects_combination = subjects_key;

    let arr = ['i1', 'i2', 'i3', 'i4', 'i5', 'e1', 'e2', 'e3', 'e4', 'e5', 'p1', 'p2', 'p3', 'p4', 'p5'];

    let plus5 = arr.map((val) => {

        return GetEle(val);
    });

    function GetEle(val) {

        return document.getElementById(val).value;
    }

    var [i1, i2, i3, i4, i5, e1, e2, e3, e4, e5, p1, p2, p3, p4, p5] = plus5;

    for (var i = 1; i <= 5; i++) {
        firebase.database().ref('results/' + semester_select + '/' + roll + '/' + subjects_combination[i - 1]).set({
            internal: eval('i' + i),
            external: eval('e' + i),
            practical: eval('p' + i)
        });
    }

    alert('success');
}
