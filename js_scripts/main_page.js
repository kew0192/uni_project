const left_column = document.getElementById("left_column");
const first_link = document.getElementById('first_link');

left_column.addEventListener('mouseenter', () => {
    first_link.classList.add('first_link_active');
});

left_column.addEventListener('mouseleave', () => {
    first_link.classList.remove('first_link_active');
});

const addButton = document.querySelector('.add');
const placeholder = document.querySelector('.placeholder');

function createNewCard() {
    const cardsCount = document.querySelectorAll('.holder_diet, .holder_program').length;
    const newCard = document.createElement('div');
    newCard.classList.add('holder_diet');
    newCard.innerHTML = `
        <h3>Запись ${cardsCount + 1}</h3>
        <p>Создано: ${new Date().toLocaleTimeString()}</p>
    `;
    placeholder.appendChild(newCard);
}

if (addButton) {
    addButton.addEventListener('click', createNewCard);
}

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        createNewCard();
    }
});

