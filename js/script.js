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



document.addEventListener('DOMContentLoaded', function () {
    const avatarInput = document.getElementById('avatarInput');
    const updateButton = document.getElementById('updateAvatar');
    const avatarLabel = document.querySelector('label[for="avatarInput"]');

    // Изначально скрываем кнопку обновления
    if (updateButton) {
        updateButton.style.display = 'none';
    }

    // Обработчик изменения файла в инпуте
    if (avatarInput) {
        avatarInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                // Получаем имя файла
                const fileName = this.files[0].name;

                // Обновляем текст в label и меняем классы
                if (avatarLabel) {
                    avatarLabel.textContent = fileName;
                    // Удаляем класс avatar_btn и добавляем avatar_filename
                    avatarLabel.classList.remove('avatar_btn');
                    avatarLabel.classList.add('avatar_filename');
                }

                // Показываем кнопку обновления
                if (updateButton) {
                    updateButton.style.display = 'block';
                }
            } else {
                // Если файл не выбран, возвращаем исходное состояние
                if (avatarLabel) {
                    avatarLabel.textContent = 'Загрузить новое фото';
                    // Возвращаем исходные классы
                    avatarLabel.classList.remove('avatar_filename');
                    avatarLabel.classList.add('avatar_btn');
                }
                if (updateButton) {
                    updateButton.style.display = 'none';
                }
            }
        });
    }

    // Обработчик для кнопки обновления
    if (updateButton) {
        updateButton.addEventListener('click', function () {
            if (avatarInput.files && avatarInput.files.length > 0) {
                const file = avatarInput.files[0];

                // Здесь можно добавить логику загрузки файла на сервер
                console.log('Загружаем файл:', file.name);
                alert(`Файл "${file.name}" будет загружен на сервер`);

                // После успешной загрузки можно сбросить форму
                // document.querySelector('.avatar_form').reset();
                // updateButton.style.display = 'none';
                // if (avatarLabel) {
                //     avatarLabel.textContent = 'Загрузить новое фото';
                //     avatarLabel.classList.remove('avatar_filename');
                //     avatarLabel.classList.add('avatar_btn');
                // }
            } else {
                alert('Пожалуйста, выберите файл');
            }
        });
    }
});

let taskList = document.querySelector('.tasks_list');

const btnCreateTask = document.getElementById('addTaskInFrom')

if (btnCreateTask) {
    btnCreateTask.addEventListener('click', (e) => {
        e.preventDefault()

        let taskValue = document.querySelector('.zalupa').value

        console.log(typeof (taskValue));


        taskList.insertAdjacentHTML('beforeend', `
                <label class="task">
                    <input type="checkbox">
                    <span class="ircle"></span>
                    <p class="text">${taskValue}</p>
                </label>

        `)
    })
}



/* =========================
   THEME SWITCHER
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const STORAGE_KEY = 'theme';

    // Загружаем сохранённую тему
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // тема по умолчанию — dark
        root.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    // Переключение по клику
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            root.setAttribute('data-theme', newTheme);
            localStorage.setItem(STORAGE_KEY, newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        themeToggleBtn.innerHTML = theme === 'light' ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/></svg>';
    }
});
