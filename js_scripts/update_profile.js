const left_column = document.getElementById("left_column");
const first_link = document.getElementById('first_link');
const exit = document.getElementById('exit');
const mobile = document.getElementById('mobile');

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

/* =================================================================================================================*/


document.addEventListener('DOMContentLoaded', async () => {
    const name = document.getElementById("Name");
    const email = document.getElementById("Email");
    const age = document.getElementById("Age");

    const response = await fetch("https://ungeographical-overenviously-giuliana.ngrok-free.dev/profile/me", {
            method: "GET",
            headers: {'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true','Authorization': `Bearer ${localStorage.getItem("accessToken")}`},
        });
        
    const result = await response.json();

    const response1 = await fetch("https://ungeographical-overenviously-giuliana.ngrok-free.dev/auth/me", {
            method: "GET",
            headers: {'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true','Authorization': `Bearer ${localStorage.getItem("accessToken")}`},
        });
        
    const result1 = await response1.json();


    
    name.value = `${result.name}`;
    email.textContent = `Почта: ${result1.email}`;
    age.value = `${result.age}`;
});


const exit_button = document.getElementById("back");

exit_button.addEventListener("click", async () => {
    window.location.href = '../profile.html';
});

const edit_button = document.getElementById("edit");

edit_button.addEventListener("click", async () => {
    const new_name = document.getElementById("Name");
    const new_age = document.getElementById("Age");
    const response_profile = await fetch("https://ungeographical-overeniously-giuliana.ngrok-free.dev/profile/me", {
                method: "PATCH",
                headers: {
                    'ngrok-skip-browser-warning': 'true',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    "name": new_name.value,
                    "age": parseInt(new_age.value) || 0
            })
            });
    window.location.href = "../profile.html";
});