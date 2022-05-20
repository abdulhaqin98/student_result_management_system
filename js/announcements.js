$(document).ready(function () {

    makenav('announcements');
    
    var ref = database.ref('announcements/');
    ref.once("value")
        .then(function (snapshot) {

            var newKey = [];
            var newValue = [];
            var subject_length = snapshot.numChildren(); // LENGTH OF SNAPSHOT | OUTPUT : 5

            var topic;
            var body;
            var date;

            var data = '';

            for (var i = 0; i < subject_length; i++) {
                newKey[i] = Object.keys(snapshot.val())[i];
                newValue[i] = snapshot.child(newKey[i]).val();

                body = newValue[i].body;
                topic = newValue[i].topic;
                date = newValue[i].date;

                data += `<div class="form">
                            <h3 class="h3x">${topic}</h3>
                            <div class="d3x">${body}</div>
                            <h6>${date}</h6>
                        </div>`
            }
            document.getElementById('append').innerHTML = '';
            (document.getElementById('append').innerHTML += data);

        });

        document.getElementById('append').innerHTML = '<div class="loader"></div>';
});