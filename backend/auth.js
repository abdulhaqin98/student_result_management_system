// '1' indicates the page was accessed with Auth.
// '0' indicates the page was accessed from outside without Auth.
 var status = 0;

 auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        // window.location = 'announcements_add.html';
    } else {
        console.log('user logged out');
        // $('#main').hide();
        window.location = 'backend.html?status=' + status;
    }
})

// login
// function log_in() {
//     // get user info
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     // log the user in
//     auth.signInWithEmailAndPassword(email, password).then((cred) => {
//         console.log('login success');
//         console.log(cred);
//         document.getElementById('loginform').reset();
//     });
// }

function log_out(){
    status = 1;
    auth.signOut(); // it triggers authStateChanges ASYNC
    // window.location = '../login.html';
}