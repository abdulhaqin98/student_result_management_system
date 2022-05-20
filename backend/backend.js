// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // SHOW THE LOADER ANIMATION
        document.getElementById('loader').innerHTML = '<h1>YOU ARE LOGGED IN...</h1><div class="loader"></div>';
        console.log('user logged in: ', user);

        // Go to Dashboard after 3 seconds!
        setTimeout(function () {

            window.location = 'manage_announcements.html';

        }, 3000);

    } else {

        const urlParams = new URLSearchParams(window.location.search);
        var status = urlParams.get('status');
        console.log(status);

        if (status == 1) {

            document.getElementById('loader').innerHTML = '<h1>YOU ARE LOGGED OUT...</h1><div class="loader"></div>';

            setTimeout(function () {

                window.location = '../login.html';
                
            }, 3000);
        }

        else {

            document.getElementById('loader').innerHTML = '<h1>YOU ARE NOT AUTHORISED TO VIEW THE PAGE...</h1><div class="loader"></div>';

            // Go back to login after 5 seconds!
            setTimeout(function () {

                window.location = '../login.html';

            }, 3000);

        }
    }
})

// // login
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

// function log_out(){
//     auth.signOut();
// }
