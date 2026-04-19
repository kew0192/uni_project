const left_column = document.getElementById("left_column");
const first_link = document.getElementById('first_link');

left_column.addEventListener('mouseenter', () => {
    first_link.classList.add('first_link_active');
});

left_column.addEventListener('mouseleave', () => {
    first_link.classList.remove('first_link_active');
});
const button = document.getElementById('go_to_next_stage');
const choice = document.getElementById('choice');
button.addEventListener('click', () => {
    switch (choice.value){
        case "diet":
            window.location.href = 'create_diet.html';
            break;
        case "program":
            window.location.href = 'create_program.html';
            break;
    }
})