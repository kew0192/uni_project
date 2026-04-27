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
    name.value = result.Name;
    description.textContent = result.Description;
    main.textContent = result.Main;
    results.textContent = result.Results;
})

const update_button = document.getElementById("go_to_next_stage");
update_button.addEventListener("click", async () => {
    let id = localStorage.getItem('item_show')
    const Name = document.getElementById("Name");
    const Description = document.getElementById("Description");
    const Main = document.getElementById("Main");
    const Results = document.getElementById("Results");
    const response = await fetch("http://localhost:8080/updateitem", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({Id:parseInt(id), Name: Name.value, Description: Description.value, Main: Main.value, Results: Results.value})
    })
    if (response.ok) {
            window.location.href = '../show_item.html';
        } else {
            console.error("Ошибка редактирования");
        }
})