const left_column = document.getElementById("left_column");
const first_link = document.getElementById('first_link');

left_column.addEventListener('mouseenter', () => {
    first_link.classList.add('first_link_active');
});

left_column.addEventListener('mouseleave', () => {
    first_link.classList.remove('first_link_active');
});

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
    window.location.href = '../create.html';
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch("http://localhost:8080/getallitems", {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        });

        const result = await response.json();
        console.log("Полученные данные:", result);

        const placeholder = document.getElementById("placeholder");
        
        placeholder.innerHTML = '';
        
        for (let i = 0; i < result.length; i++) {
            if (result[i].Type_item == 0) {
                placeholder.innerHTML += `
                    <div class="holder_diet" id = ${result[i].Id}>
                        <h1 class="name_diet">${result[i].Name}</h1><br>
                        <h2 class="author_diet">Автор: ${result[i].Author}</h2><br>
                        <h3 class="level_diet">Уровень: ${result[i].Type_item == 0 ? 'Начинающий' : 'Продвинутый'}</h3><br>
                        <h3 class="content_diet">Описание: ${result[i].Description}</h3>
                    </div>
                `;
            }
            if (result[i].Type_item == 1) {
                placeholder.innerHTML += `
                    <div class="holder_program" id = ${result[i].Id}>
                        <h1 class="name_program">${result[i].Name}</h1><br>
                        <h2 class="author_program">Автор: ${result[i].Author}</h2><br>
                        <h3 class="level_program">Уровень: ${result[i].Type_item == 1 ? 'Начинающий' : 'Продвинутый'}</h3><br>
                        <h3 class="content_program">Описание: ${result[i].Description}</h3>
                    </div>
                `;
            }

        }
    } catch(error) {
        console.error("Ошибка загрузки:", error);
    }
});

document.addEventListener('click', function(e) {
    const diet = e.target.closest('.holder_diet');
    const program = e.target.closest('.holder_program');
    
    if (diet) {
        let id = diet.id;
        localStorage.setItem('item_show', id);
        localStorage.setItem("type", 0)
        window.location.href = '../show_item.html';
    }
    
    if (program) {
        let id = program.id;
        localStorage.setItem("type", 1)
        localStorage.setItem('item_show', id);
        window.location.href = '../show_item.html';
    }
});


/* Валидация токенов =================================================================================================*/

async function getAccessToken(){
    url = ""
    let maxAttempt = 3;
    let Attempt = 0;
    while (Attempt < maxAttempt){
        let refresh_token = localStorage.getItem('refreshToken')
        const response = await fetch("ТУТ БУДЕТ АЙПИ", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refresh_token})
        });
        const result = await response.json();
        if (result.error){
            Attempt+=1;
        }
        else {
            localStorage.setItem("accessToken", result.access_token)
            return true; 
        }
    }
    return false;
}

async function getRefreshToken(){
    url = ""
    let maxAttempt = 3;
    let Attempt = 0;
    while (Attempt < maxAttempt){
        const response = await fetch("ТУТ БУДЕТ АЙПИ", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        });
        const result = await response.json();
        if (result.error){
            Attempt+=1;
        }
        else {
            localStorage.setItem("refreshToken", result.refresh_token)
            return true; 
        }
    }
    return false;
}

async function getValidToken() {
    let acc_token = localStorage.getItem('accessToken');
    let ref_token = localStorage.getItem('refreshToken');
    if (!ref_token) {
        window.location.href = '/index.html';
        return false;
    }
    try {
        const payload_access_token = JSON.parse(atob(acc_token.split('.')[1]));
        const expTime_access_token = payload_access_token.exp * 1000;
        const payload_refresh_token = JSON.parse(atob(ref_token.split('.')[1]));
        const expTime_refresh_token = payload_refresh_token.exp * 1000;
        if (expTime_refresh_token - Date.now() < 60 * 1000){
            let confirm = await getRefreshToken();
            if (confirm == false){
                window.location.href = '/index.html';
                return false;
            }
        }
        if (expTime_access_token - Date.now() < 60 * 1000) {
            await getAccessToken();
        }
    } catch(e) {
        console.log('Ошибка проверки токена');
    }
    
    return true;
}

localStorage.setItem("login", "kew")
