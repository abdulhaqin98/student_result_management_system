function makenav(active) {

    var announcements = '';
    var students = '';
    var revaluation = '';
    var photocopy = '';
    var config = '';

    (active == 'announcements') ? announcements = 'active' : null;
    (active == 'students') ? students = 'active' : null;
    (active == 'revaluation') ? revaluation = 'active' : null;
    (active == 'photocopy') ? photocopy = 'active' : null;
    (active == 'config') ? config = 'active' : null;

    var nav = `<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <a class="navbar-brand" href="#">SRMS | Admin</a>

    <ul class="navbar-nav m-auto">
        <li class="nav-item">
            <a class="nav-link ${announcements}" href="./manage_announcements.html">Announcements</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${students}" href="./manage_students.html">Students</a>
        </li>
        <li class="nav-item">
        <a class="nav-link ${revaluation}" href="./manage_revaluation.html">Revaluation</a>
        </li>
        <li class="nav-item">
        <a class="nav-link ${photocopy}" href="./manage_photocopy.html">Photocopy</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${config}" href="./subject_editor.html">Config</a>
        </li>
    </ul>
    <button class="btn btn-outline-info my-2 my-sm-0" onclick="log_out()">Log Out</button>
</nav>`

    $('body').prepend(nav);

}