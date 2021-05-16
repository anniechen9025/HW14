document.addEventListener('DOMContentLoaded', () => {
const signupButton = document.getElementById("signup-form-submit");
const loginButton = document.getElementById("login-form-submit");

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/newpost');
            alert("You have successfully logged in.");
        } else {
            alert('Failed to log in.');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/newpost');
            alert("You have successfully Signup.");
        } else {
            alert('Failed to sign up.');
        }
    }
};

// document
//     .querySelector('.login-form')
//     .addEventListener('submit', loginFormHandler);

loginButton.addEventListener('click', (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    if (email && password) {
        // If the credentials are valid, show an alert box and reload the page
        loginFormHandler(e);
    } else {
        // Otherwise, make the login error message show (change its oppacity)
        loginErrorMsg.style.opacity = 1;
    }
})

signupButton.addEventListener('click', (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = document.querySelector('#username-signup').value;
    const email = document.querySelector('#email-signup').value;
    const password = document.querySelector('#password-signup').value;

    if (email && password && username) {
        // If the credentials are valid, show an alert box and reload the page
        signupFormHandler(e);
    } else {
        // Otherwise, make the login error message show (change its oppacity)
        loginErrorMsg.style.opacity = 1;
    }
})
// document
//     .querySelector('.signup-form')
//     .addEventListener('submit', signupFormHandler);
});