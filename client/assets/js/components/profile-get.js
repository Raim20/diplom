//const token = require("../static_functions/save_token.js")

import { files } from "../static_functions/default.js";

async function fetchData() {
    try {
        const token = localStorage.getItem('token')

        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/profile";

        const response = await fetch(apiUrl, requestOptions);
        const responseData = await response.json();

        if (response.ok) {
            console.log(responseData.user_data);
            const user = responseData.user_data
            const avatar = document.getElementById("avatar_of_profile")
            const name = document.getElementById("name_of_profile")
            const email = document.getElementById("email_of_profile")
            const id_of_games = document.getElementById("games_of_profile")
            if (user.avatar !== "/svg/profile.svg") {
                avatar.src = files.server_api_url + "/" + user._id + "/" + user.avatar
            }
            name.innerText = user.name
            email.innerText = user.email
            id_of_games.innerText = user.id_of_games.length
        } else {
            console.error(responseData.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchData()

/*
const updateAvatar = document.getElementById('registration-form');

updateAvatar.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const name = document.getElementById("name_registration").value;
        const email = document.getElementById("email_registration").value;
        const password = document.getElementById("password_registration").value;
        const re_enter_password = document.getElementById("re_enter_password_registration").value;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, re_enter_password: re_enter_password })
        };

        const apiUrl = "http://localhost:5000/api/reg/registration";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
            console.log(data.user);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});*/