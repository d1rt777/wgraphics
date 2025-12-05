// скрипт для скрытия инпутов для регистрации

const checkboxes = document.querySelectorAll('.hhh input[type="checkbox"]');

if (checkboxes.length > 0) {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const parentElement = this.closest('.busy_day_list_element');
            if (!parentElement) return;

            const textInput = parentElement.querySelector('input[type="text"]');
            if (!textInput) return;

            if (this.checked) {
                textInput.classList.add('visible');
            } else {
                textInput.classList.remove('visible');
            }
        });
    });
}



// скрипт для добавления формы при заполнении графика

document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('addWork');
    const form = document.querySelector('form');
    const mainContainer = document.querySelector('.add_work');
    let formCounter = 1;

    // Проверки
    if (!addButton || !form) return;

    addButton.addEventListener('click', function (e) {
        e.preventDefault();

        formCounter++;

        const clonedForm = form.cloneNode(true);

        const buttonGroupInClone = clonedForm.querySelector('.button_group');
        if (buttonGroupInClone) buttonGroupInClone.remove();

        updateInputNames(clonedForm, formCounter);

        form.parentNode.insertBefore(clonedForm, form);
    });

    function updateInputNames(clonedForm, counter) {
        const inputs = clonedForm.querySelectorAll('input, select');
        if (!inputs) return;

        inputs.forEach(input => {
            if (!input.name) return;

            const baseName = input.name.replace(/\d+$/, '');
            input.name = baseName + counter;
        });
    }
});




// скрипт для показа формы добавления задачи

function showCreateTaskForm() {
    const containers32 = document.querySelectorAll('.w-32');
    const containers50 = document.querySelectorAll('.w-50');
    const addTaskForm = document.getElementById('addTaskForm');

    if (!addTaskForm) return;

    if (containers32.length > 0) {
        containers32.forEach(c => {
            c.classList.remove('w-32');
            c.classList.add('w-50');
            addTaskForm.classList.add('show');
        });

        addTaskForm.classList.remove('w-50');
        addTaskForm.classList.add('w-32');
    }

    if (containers50.length > 0) {
        containers50.forEach(c => {
            c.classList.remove('w-50');
            c.classList.add('w-32');
        });

        addTaskForm.classList.remove('show');
    }
}

const showCreateTaskFromButton = document.getElementById('addTask');
const closeCreateTaskFromButton = document.getElementById('closeAddTaskFrom');

if (showCreateTaskFromButton) {
    showCreateTaskFromButton.addEventListener('click', (e) => {
        e.preventDefault();
        showCreateTaskForm();
        showCreateTaskFromButton.style.display = 'none';
    });
}

if (closeCreateTaskFromButton) {
    closeCreateTaskFromButton.addEventListener('click', (e) => {
        e.preventDefault();
        showCreateTaskForm();
        if (showCreateTaskFromButton) {
            showCreateTaskFromButton.style.display = 'block';
        }
    });
}



// скрипт для открытия кнопок у карточки уведомлений

const notificationCards = document.querySelectorAll('.notification_card');

if (notificationCards.length > 0) {
    notificationCards.forEach(card => {
        card.addEventListener('click', function () {

            const addBtn = this.querySelector('.add_friend');
            const removeBtn = this.querySelector('.remove_friend');

            if (addBtn) addBtn.style.display = 'block';
            if (removeBtn) removeBtn.style.display = 'block';
        });
    });
}
