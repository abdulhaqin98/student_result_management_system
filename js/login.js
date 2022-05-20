makenav();

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        window.location = 'backend/backend.html';
    } else {
        console.log('user logged out');
    }
})

// login
function log_in() {
    // get user info
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log('login success');
        console.log(cred);
        document.getElementById('loginform').reset();
    });
}

function log_out(){
    auth.signOut();
}
