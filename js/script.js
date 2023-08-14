AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// Clock 
function showTime() {
  let date = new Date();
  let H = date.getHours(); //0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59

  let session = 'AM';

  if (H == 0) {
    H = 12;
  }

  if (H > 12) {
    H = H - 12;
    session = 'PM';
  }

  H = (H < 10) ? '0' + H : H;
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;

  let time = H + ':' + m + ':' + s + ' ' + session;

  document.getElementById('MyClockDisplay').innerText = time;

  document.getElementById('MyClockDisplay').textContent = time;

  setTimeout(showTime, 1000);
}

showTime();


// Stopwatch
let startTime = null;
let elapsedTime = 0;
let timerInterval;
let recordedTimes = [];

function start() {
  if (startTime === null) {
    startTime = new Date() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
  }
}

function stop() {
  clearInterval(timerInterval);
  startTime = null;
}

function reset() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  displayTime(0);

  // Clear recorded times list
  recordedTimes = [];
  const recordedTimesList = document.getElementById('recordedTimes');
  recordedTimesList.innerHTML = '';
}

function updateTime() {
  const currentTime = new Date();
  elapsedTime = currentTime - startTime;
  displayTime(elapsedTime);
}

function displayTime(time) {
  const formattedTime = formatTime(time);
  document.getElementById('stopwatch').textContent = formattedTime;
}

function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const hours = Math.floor((time / 1000 / 60 / 60) % 24);

  return `${hours.toString().padStart(2, '0')}:
    ${minutes.toString().padStart(2, '0')}:
    ${seconds.toString().padStart(2, '0')}:
    ${milliseconds.toString().padStart(2, '0')}`;
}

function recordTime() {
  recordedTimes.push(elapsedTime);
  const recordedTimesList = document.getElementById('recordedTimes');
  const listItem = document.createElement('li');
  const formattedRecordedTime = formatTime(elapsedTime);

  listItem.textContent = formattedRecordedTime;
  recordedTimesList.appendChild(listItem);
}

function next() {
  if (startTime !== null) {
    recordTime();
  }
}


// Back to the top
let calcScrollValue = () => {
  let scrollProgress = document.getElementById('progress-backToTop');
  let progressValue = document.getElementById('progress-value');
  let pos = document.documentElement.scrollTop;

  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 500) {
    scrollProgress.style.display = 'grid';
  } else {
    scrollProgress.style.display = 'none';
  }

  scrollProgress.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#e0f780 ${scrollValue}%, #022a30 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// Change Text
let words = document.querySelectorAll('.word');
words.forEach((word) => {
  let letters = word.textContent.split('');
  word.textContent = '';
  letters.forEach((letter) => {
    let span = document.createElement('span');
    span.textContent = letter;
    span.className = 'letter';
    word.appendChild(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = '1';

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = 'letter out';
    }, i * 80);
  });

  nextWord.style.opacity = '1';
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = 'letter behind';
    setTimeout(() => {
      letter.className = 'letter in';
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// To Do List
// DOM elements

const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('.todos');
const totalTasks = document.querySelector('#total-tasks');
const completedTasks = document.querySelector('#completed-tasks');
const remainingTasks = document.querySelector('#remaining-tasks');
const mainInput = document.querySelector('#todo-form input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// check if we have tasks from the localStorage to display
if (localStorage.getItem('tasks')) {
  tasks.map((task) => {
    createTask(task);
  });
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue == '') {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  createTask(task);

  todoForm.reset();
  mainInput.focus();
});

todoList.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('remove-task') ||
    e.target.parentElement.classList.contains('remove-task') ||
    e.target.parentElement.parentElement.classList.contains('remove-task')
  ) {
    const taskId = e.target.closest('li').id;

    removeTask(taskId);
  }
});

todoList.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();

    e.target.blur();
  }
});

todoList.addEventListener('input', (e) => {
  const taskId = e.target.closest('li').id;

  updateTask(taskId, e.target);
});

function createTask(task) {
  const taskEl = document.createElement('li');

  taskEl.setAttribute('id', task.id);

  if (task.isCompleted) {
    taskEl.classList.add('complete');
  }

  const taskElMarkup = `
    <div>
      <input type="checkbox" name="tasks" id="${task.id}" ${
	task.isCompleted ? 'checked' : ''
}>
      <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
    </div>

    <button title="Remove the "${task.name}" task"  class="remove-task">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M17.25 17.25L6.75 6.75"
          stroke="#022a30"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.25 6.75L6.75 17.25"
          stroke="#022a30"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `;

  taskEl.innerHTML = taskElMarkup;

  todoList.appendChild(taskEl);

  countTasks();
}

// Count the number of tasks
function countTasks() {
  const completedTasksArray = tasks.filter((task) => task.isCompleted === true);

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

// Delete the task when the user clicks on X element
function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id != parseInt(taskId));

  localStorage.setItem('tasks', JSON.stringify(tasks));

  document.getElementById(taskId).remove();

  countTasks();
}

// Update function for tasks completed
function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id === parseInt(taskId));

  if (el.hasAttribute('contenteditable')) {
    task.name = el.textContent;
  } else {
    const span = el.nextElementSibling;
    const parent = el.closest('li');

    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
      span.removeAttribute('contenteditable');
      parent.classList.add('complete');
    } else {
      span.setAttribute('contenteditable', true);
      parent.classList.remove('complete');
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  countTasks();
}

// Email Validation
function validateEmail() {
  const emailInput = document.getElementById('emailInput').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(emailInput)) {
    alert('Email valid!');
  } else {
    alert('Email invalid!');
  }
}