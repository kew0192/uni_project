/* ВАЛИДАЦИЯ ТОКЕНОВ */

async function validateToken() {
    const response = await fetch('https://ungeographical-overenviously-giuliana.ngrok-free.dev/auth/token/validate', {
        method: "GET",
        headers: {'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true','Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
    });
    const result = await response.json();
    if (result.valid === true){
        return;
    } else {
        window.location.href = "../index.html";
    }
}

const left_column = document.getElementById("left_column");
const first_link = document.getElementById('first_link');
const exit = document.getElementById('exit');
const mobile = document.getElementById('mobile');

first_link.addEventListener("click", async () => {
    const isValid = await validateToken();
    if (isValid == false) {
        return;
    }
    window.location.href = '../profile.html';
});

left_column.addEventListener('mouseenter', () => {
    first_link.classList.add('first_link_active');
});

left_column.addEventListener('mouseleave', () => {
    first_link.classList.remove('first_link_active');
});

left_column.addEventListener('mouseenter', () => {
    exit.classList.add('exit_active');
});

left_column.addEventListener('mouseleave', () => {
    exit.classList.remove('exit_active');
});

left_column.addEventListener('mouseenter', () => {
    mobile.classList.add('mobile_active');
});

left_column.addEventListener('mouseleave', () => {
    mobile.classList.remove('mobile_active');
});
/* Поисковая строка ================================================================================================= */

const search = document.getElementById("search");
const originalPlaceholder = search.placeholder;
search.addEventListener("focus", () => {
    search.placeholder = "";
});
search.addEventListener("blur", () => {
    if (search.value === "") {
        search.placeholder = originalPlaceholder;
    }
});
search.addEventListener("keypress", async (event) => {
    const isValid = await validateToken();
    if (isValid == false) {
        return;
    }
    if (event.key == "Enter"){
        event.preventDefault();
        const response = await fetch("http://localhost:8080/search", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({search: search.value})
        });
        const result = await response.json();
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
    }
});


/* Фильтр ========================================================================================*/
const main = document.getElementById("background_main");
const filter = document.getElementById("filter");
let filterWindow = null;

filter.addEventListener("click", async () => {
    const isValid = await validateToken();
    if (isValid == false) {
        return;
    }
    if (!filterWindow) {
        filterWindow = document.createElement("div");
        filterWindow.className = "filter_window";
        filterWindow.id = "filter_window";
        
        filterWindow.innerHTML = `
            <h1 class = "text">Фильтр</h1>
            <select id="choice" class = "text1" name="choice">
                <option value="diet">Диета</option>
                <option value="program">Программа</option>
                <option value="programanddiet">Оба</option>
            </select>
            <select id="choice2" class = "text2" name="choice">
                <option value="oursandothers">И свои и чужие</option>
                <option value="ours">Только свои</option>
                <option value="others">Только чужие</option>
                <option value="others">Избранные</option>
            </select>
            <button class = "button_filter" id = "button_filter">Готово</button>
            `;
        
        main.appendChild(filterWindow);
        
        setTimeout(() => {
            if (filterWindow) {
                filterWindow.classList.add('slide_left');
            }
        }, 10);
        
    } else {
        filterWindow.classList.remove('slide_left');
        filterWindow.classList.add('slide_right');
        
        setTimeout(() => {
            if (filterWindow) {
                filterWindow.remove();
                filterWindow = null;
            }
        }, 500);
    }
});












const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
    window.location.href = '../create.html';
});

document.addEventListener('DOMContentLoaded', async () => {
    validateToken();
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
    validateToken();
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



