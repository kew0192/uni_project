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


const Name = document.getElementById("Name");
const Description = document.getElementById("Description");
const Main = document.getElementById("Main");
const Results = document.getElementById("Results");

const button = document.getElementById("go_to_next_stage");

button.addEventListener("click", async () => {
    const response = await fetch("http://localhost:8080/createitem", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({Name: Name.value, Description: Description.value, Main: Main.value, Results: Results.value, Author: "Arthur", Type_item: 0})
    });
    window.location.href = '../main.html';
})