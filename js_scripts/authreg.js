//================================================================================================================================
const eye_button = document.getElementById("eye_button");
const input_password = document.getElementById("password")
const input_passworddup = document.getElementById("passworddup")

eye_button.addEventListener('click', () => {
    switch (input_password.type){
        case "password":
            input_password.type = "text";
            input_passworddup.type = "text";
            eye_button.style.backgroundImage = "url('../images/eye_crossed_out.jpg')";
            break;
        case "text":
            input_password.type = "password";
            input_passworddup.type = "password";
            eye_button.style.backgroundImage = "url('../images/eye.jpg')";
            break;
    }
});

const input_login_navigation = document.getElementById("login");
const input_password_navigation = document.getElementById("password");
const input_passsworddup_navigation = document.getElementById("passworddup");
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
        input_passsworddup_navigation.focus();
    }
});

input_passsworddup_navigation.addEventListener("keypress", async (event) => {
    if (event.key == "Enter"){
        event.preventDefault();
        button_navigate.classList.add('button-active');
        setTimeout(() => {
            button_navigate.classList.remove('button-active');
        }, 150);
        button_navigate.click();
    }
})

//================================================================================================================================

const login_input = document.getElementById("login");
const password_input = document.getElementById("password");
const password_input_dup = document.getElementById("passworddup")
const error_text = document.getElementById("error")
const button_to_site = document.getElementById("go_to_main");


button_to_site.addEventListener('click', async () => {
    
    const login_input_value = login_input.value;
    const password_input_value = password_input.value;
    const passworddup_input_value = password_input_dup.value;
    
    login_input.classList.remove('input_login_on_error');
    login_input.classList.add('input', 'duplicate-one');
    password_input.classList.remove('input_login_on_error_pswd-duplicate');
    password_input.classList.add('input', 'duplicate-two');
    password_input_dup.classList.remove('input_login_on_error_pswd-duplicate1');
    password_input_dup.classList.add('input', 'duplicate-three');
    error_text.textContent = '';

    if (!login_input_value || !password_input_value || !passworddup_input_value){
        if (!login_input_value){
            login_input.classList.remove('input', 'duplicate-one');
            login_input.classList.add('input_login_on_error');
            error_text.textContent = 'Все поля должны быть заполнены';
        }
        if (!password_input_value){
            password_input.classList.remove('input', 'duplicate-two');
            password_input.classList.add('input_login_on_error_pswd-duplicate');
            error_text.textContent = 'Все поля должны быть заполнены';
        }
        if (!passworddup_input_value){
            password_input_dup.classList.remove('input', 'duplicate-three');
            password_input_dup.classList.add('input_login_on_error_pswd-duplicate1');
            error_text.textContent = 'Все поля должны быть заполнены';
        }
        return ;
    }
    if (password_input_value != passworddup_input_value){
        password_input.classList.remove('input', 'duplicate-two');
        password_input.classList.add('input_login_on_error_pswd-duplicate');
        password_input_dup.classList.remove('input', 'duplicate-three');
        password_input_dup.classList.add('input_login_on_error_pswd-duplicate1');
        error_text.textContent = 'Пароли не совпадают';
        return ;
    }
    if (password_input_value.length < 6){
        password_input.classList.remove('input', 'duplicate-two');
        password_input.classList.add('input_login_on_error_pswd-duplicate');
        password_input_dup.classList.remove('input', 'duplicate-three');
        password_input_dup.classList.add('input_login_on_error_pswd-duplicate1');
        error_text.textContent = 'Пароль должен быть от 6 символов';
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
            login_input.classList.remove('input_login_on_error');
            login_input.classList.add('input', 'duplicate-one');
            password_input.classList.remove('input_login_on_error_pswd-duplicate');
            password_input.classList.add('input', 'duplicate-two');
            password_input_dup.classList.remove('input_login_on_error_pswd-duplicate1');
            password_input_dup.classList.add('input', 'duplicate-three');
            error_text.textContent = '';
        } else {
            if (result.error === "User exists") {
                login_input.classList.remove('input', 'duplicate-one');
                login_input.classList.add('input_login_on_error');
                error_text.textContent = 'Имя пользователя занято';
            }
             else {
                error_text.textContent = 'Ошибка';
            }
        }
    }
);