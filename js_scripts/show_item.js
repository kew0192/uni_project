const leftColumn = document.querySelector('.left_column');
leftColumn.style.position = 'fixed';
leftColumn.style.top = '0';
leftColumn.style.left = '0';

const left_column = document.getElementById("left_column");
const first_link = document.getElementById('first_link');

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


document.addEventListener('DOMContentLoaded', async () => {
    const name = document.getElementById('Name')
    const description =  document.getElementById('Description')
    const main =  document.getElementById('Main')
    const results =  document.getElementById('Results')
    let id = localStorage.getItem('item_show')
    const response = await fetch("http://localhost:8080/get_item", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: parseInt(id)})
    });
    console.log("ID из localStorage:", id);
    const result = await response.json();
    name.textContent = result.Name;
    description.textContent = result.Description;
    main.textContent = result.Main;
    results.textContent = result.Results;
})

if (localStorage.getItem("type") == 0){
    document.getElementById("box").insertAdjacentHTML('afterbegin', '<img  src="/images/1234.jpg" class = "image" sc>');
}
if (localStorage.getItem("type") == 1){
    document.getElementById("box").insertAdjacentHTML('afterbegin', '<img  src="/images/zal.jpg" class = "image" sc>');
}

const garbage_button = document.getElementById("garbage");
garbage_button.addEventListener("click", async () => {
    const confirmDelete = confirm("Вы действительно хотите удалить?");
    
    if (confirmDelete) {
        let id = localStorage.getItem('item_show');
        
        const response = await fetch("http://localhost:8080/delete_item", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: parseInt(id)}) 
        });
        
        if (response.ok) {
            window.location.href = '../main.html';
        } else {
            console.error("Ошибка удаления");
        }
    }
});

const pen_button = document.getElementById("pen");
pen_button.addEventListener("click", async () => {
    // ТИПА ПРОВЕРКИ
    window.location.href = '../update_item.html';
})
