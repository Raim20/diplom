document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementsByName('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const re_enter_password = document.getElementById('re_enter_password');

    try {
        // Отправляем запрос на API для регистрации пользователя
        const response = await fetch('api/reg/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, email, password, re_enter_password })
        });

        // Если запрос успешен, перенаправляем на страницу логина
        if (response.ok) {
            window.location.href = '/profile';
        } else {
            const data = await response.json();
            // Отображаем сообщение об ошибке на странице
            document.getElementsByClassName('error-message').innerText = data.message;
        }
    } catch (error) {
        console.log(error);
    }
});