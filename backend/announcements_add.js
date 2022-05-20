$(document).ready(function () {

    makenav('announcements');
    
    document.getElementById('datePicker').valueAsDate = new Date();

    // Call from other page

    const urlParams = new URLSearchParams(window.location.search);
    var announcement = urlParams.get('announcement');

    console.log(announcement);

    document.getElementById('news_id').value = announcement;
    load_announcement();

    // $("#body").keyup(function () {
    //     $("#output_div").html($(this).val().replace(/\n/g, '<br />'));
    // });
});

function load_announcement_x() {
    event.preventDefault();
    load_announcement();
}

function load_announcement() {
    // event.preventDefault();

    var news_id = document.getElementById('news_id').value;

    var ref = database.ref('announcements/' + news_id + '/');
    ref.once("value")
        .then(function (snapshot) {

            var topic = snapshot.val().topic;
            var body = snapshot.val().body;
            var date = snapshot.val().date;

            $('#topic').val(topic);
            $('#body').val(body);
            $('#datePicker').val(date);

        });
}

function save_announcement() {

    event.preventDefault();

    var news_id = document.getElementById('news_id').value;

    var topic = $('#topic').val();
    var body = $('#body').val();
    var date = $('#datePicker').val();

    var first = body.charAt(0);
    var last = body.charAt(body.length-1);

    (first == '<' && last =='>') ? assign_html() : assign_text();

    function assign_text(){
        body = $('#body').val().replace(/\n/g, '<br />');

        // Still has little BUGs!
        // REGEX Replave < and > in the content(TEXT MODE) to avoid HTML conflict.
        body = body.replace(/<+/g, '&lt');
        body = body.replace(/>+/g, '&gt');
    }

    function assign_html(){
        body = $('#body').val();
    }

    console.log(body);

    firebase.database().ref('announcements/' + news_id + '/').set({
        topic,
        body,
        date
    });
}