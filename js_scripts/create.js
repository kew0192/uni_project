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

const button = document.getElementById('go_to_next_stage');
const choice = document.getElementById('choice');
button.addEventListener('click', async () => {
    const isValid = await validateToken();
    if (isValid == false) {
        return;
    }
    switch (choice.value){
        case "diet":
            window.location.href = 'create_diet.html';
            break;
        case "program":
            window.location.href = 'create_program.html';
            break;
    }
})