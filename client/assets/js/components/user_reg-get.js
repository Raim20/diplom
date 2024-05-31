//require("dotenv").config()
const registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const name = document.getElementById("name_registration").value;
        const email = document.getElementById("email_registration").value;
        const password = document.getElementById("password_registration").value;
        const re_enter_password = document.getElementById("re_enter_password_registration").value;
        const phone_number = document.getElementById("phone_number_registration").value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, re_enter_password: re_enter_password, phone_number: phone_number })
        };

        const apiUrl = "http://localhost:5000/api/reg/user/registration";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.user);
            window.location.href = "reg";
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const email = document.getElementById("email_login").value;
        const password = document.getElementById("password_login").value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        };

        const apiUrl = "http://localhost:5000/api/reg/user/login";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        //document.cookie = `token=${data.token}; expires=Thu, 17 May 2024 00:00:00 UTC; path=/`;
        localStorage.setItem('token', data.token);

        if (response.ok) {
            console.log(data.message);
            console.log(data.token);
            // window.location.href = "index";
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});