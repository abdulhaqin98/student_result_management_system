function makenav(active) {

    var home = '';
    var complaint = '';
    var track = '';
    var announcements = '';

    (active == 'home') ? home = 'active' : null;
    (active == 'announcements') ? announcements = 'active' : null;
    (active == 'complaint') ? complaint = 'active' : null;
    (active == 'track') ? track = 'active' : null;

    var nav = `<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
<a class="navbar-brand" href="#">SRMS</a>

<ul class="navbar-nav m-auto">
    <li class="nav-item">
        <a class="nav-link ${home}" href="./home.html">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link ${announcements}" href="./announcements.html">Announcements</a>
    </li>
    <li class="nav-item">
        <a class="nav-link ${complaint}" href="./complaint.html">Complaints</a>
    </li>
    <li class="nav-item">
        <a class="nav-link ${track}" href="./track.html">Track</a>
    </li>
</ul>
<button class="btn btn-outline-info my-2 my-sm-0" onclick="window.location='/login.html';">Log In</button>
</nav>`

    $('body').prepend(nav);

}
// $('body').prepend('<div id="fb-root"></div>');