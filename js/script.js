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
        themeToggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
    }
});
