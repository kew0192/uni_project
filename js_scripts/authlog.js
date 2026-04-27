//================================================================================================================================
const eye_button = document.getElementById("eye_button");
const input_password = document.getElementById("password")
eye_button.addEventListener('click', () => {
    switch (input_password.type){
        case "password":
            input_password.type = "text";
            eye_button.style.backgroundImage = "url('../images/eye_crossed_out.jpg')";
            break;
        case "text":
            input_password.type = "password";
            eye_button.style.backgroundImage = "url('../images/eye.jpg')";
            break;
    }
});

const input_login_navigation = document.getElementById("login")
const input_password_navigation = document.getElementById("password")
const button_navigate = document.getElementById("go_to_main");

input_login_navigation.addEventListener("keypress", async (event) => {
    if (event.key == "Enter"){
        event.preventDefault();
        input_password_navigation.focus();
    }
});

input_password_navigation.addEventListener("keypress", async (event)=> {
    if (event.key == "Enter"){
        event.preventDefault();
         button_navigate.classList.add('button-active');
        setTimeout(() => {
            button_navigate.classList.remove('button-active');
        }, 150);
        button_navigate.click();
    }

});
//================================================================================================================================

const login_input = document.getElementById("login");
const password_input = document.getElementById("password");
const error_text = document.getElementById("error")
const button_to_site = document.getElementById("go_to_main");

button_to_site.addEventListener('click', async () => {
    const login_input_value = login_input.value;
    const password_input_value = password_input.value;

    login_input.classList.remove('input_login_on_error');
    login_input.classList.add('input', 'input--one');
    password_input.classList.remove('input_login_on_error_pswd');
    password_input.classList.add('input', 'input--two');
    error_text.textContent = '';

    if (!login_input_value || !password_input_value){
        if (!login_input_value){
            login_input.classList.remove('input', 'input--one');
            login_input.classList.add('input_login_on_error');
            error_text.textContent = 'Оба поля должны быть заполнены';
        }
        if (!password_input_value){
            password_input.classList.remove('input', 'input--two');
            password_input.classList.add('input_login_on_error_pswd');
            error_text.textContent = 'Оба поля должны быть заполнены';
        }
        return ;
    }
    



        const response = await fetch("ТУТ БУДЕТ АЙПИ", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login_input_value, password_input_value})
        });
        
        const result = await response.json();
        
        if (result.success) {
            window.location.href = '/main.html';
            localStorage.setItem('accessToken', result.access_token);
            localStorage.setItem('accessToken', result.refresh_token);
            login_input.classList.remove('input_login_on_error');
            login_input.classList.add('input', 'input--one');
            password_input.classList.remove('input_login_on_error_pswd');
            password_input.classList.add('input', 'input--two');
            error_text.textContent = '';
        } else {
            if (result.error === "User not found") {
                error_text.textContent = 'Пользователя с таким именем не существует';
                login_input.classList.remove('input', 'input--one');
                login_input.classList.add('input_login_on_error');               
            } else if (result.error === "Wrong password") {
                error_text.textContent = 'Неверный пароль';
                password_input.classList.remove('input', 'input--two');
                password_input.classList.add('input_login_on_error_pswd');
            } else {
                error_text.textContent = 'Ошибка';
            }
        }
    }
);

