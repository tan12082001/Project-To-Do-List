import './style.css';
import reIcon from './Refresh_icon.png';
import tdIcon from './trash-outline.svg';

const inHead = document.querySelector('.div-heading');
const ulList = document.getElementById('to-do-list');

// adding imported image for the app heading
const reicon = new Image();
reicon.src = reIcon;
reicon.className = 'reload-image';
reicon.setAttribute('alt', 'reload-icon');
inHead.appendChild(reicon);

// variables for the outer div of the to-do-list heading
const addlistdiv = document.querySelector('.list-adding');

// Creating input element that takes the task and adds the task
const addlist = document.createElement('input');
addlist.setAttribute('type', 'text');
addlist.setAttribute('placeholder', 'Add to you list ...');
addlist.setAttribute('id', 'add-new-list');
addlistdiv.appendChild(addlist);

// Array of objects (empty at start)
let tasks = JSON.parse(localStorage.getItem('ulList')) || [];

// To reset index of tasks after deletions
function setindex() {
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].id = tasks.indexOf(tasks[i]) + 1;
  }
  localStorage.setItem('todolist', JSON.stringify(tasks));
}

class Create {
  constructor(newtask) {
    this.newtask = newtask;
  }

  // Method to create a to-do task, update the task, delete the task.
  createtodo() {
    // Creating the Unordered list element
    const eachtask = document.createElement('li');
    eachtask.className = 'each-task';

    // Creating a outer div to contain checkbox and text field
    const checktag = document.createElement('div');
    checktag.className = 'check-tag';

    // Creating checkbox
    const cbox = document.createElement('input');
    cbox.setAttribute('class', 'task-check');
    cbox.setAttribute('type', 'checkbox');
    cbox.checked = this.newtask.complete;

    // Adding the line-through decoration class as default.
    if (this.newtask.complete) {
      eachtask.classList.add('checked');
    }

    // Creating text field
    const tbox = document.createElement('input');
    tbox.setAttribute('type', 'text');
    tbox.setAttribute('class', 'task-desc');
    tbox.value = this.newtask.description;

    // Creating a button for deleting the task
    const bbin = document.createElement('button');
    bbin.className = 'delbin';
    bbin.setAttribute('type', 'button');
    bbin.setAttribute('id', this.newtask.id);

    // Creating image to place inside the button
    const threedots = new Image();
    threedots.className = 'three-dots';
    threedots.src = tdIcon;
    threedots.setAttribute('alt', 'threedots');

    // Appending the created elements.
    checktag.appendChild(cbox);
    checktag.appendChild(tbox);

    eachtask.appendChild(checktag);
    bbin.appendChild(threedots);
    eachtask.appendChild(bbin);
    ulList.appendChild(eachtask);

    // Checking and Updating the checkbox to localStorage and adding styles.
    cbox.addEventListener('change', () => {
      this.newtask.complete = cbox.checked;

      if (this.newtask.complete) {
        eachtask.classList.add('checked');
        eachtask.style.background = '#f4f5Cf';
        eachtask.style.opacity = '0.5';
      } else {
        eachtask.classList.remove('checked');
        eachtask.style.background = 'none';
        eachtask.style.opacity = '1';
      }
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    // Update task to localStorage and display on clicking the text field outer div
    tbox.addEventListener('input', () => {
      this.newtask.description = tbox.value;
    });

    tbox.addEventListener('blur', () => {
      tbox.setAttribute('disabled', '');
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    checktag.addEventListener('click', () => {
      tbox.removeAttribute('disabled');
      tbox.focus();
    });

    // Deleting the task from array, localStorage and display when thrash image is clicked.
    threedots.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== this.newtask.id);
      eachtask.remove();
      setindex();
      localStorage.setItem('todolist', JSON.stringify(tasks));
    });

    return {
      eachtask, tbox, checktag, threedots,
    };
  }
}

// Creating a new task object and using the class instance for features implementation.
function addlistfun(val) {
  const newtask = {
    id: tasks.length + 1,
    description: val,
    complete: false,
  };
  tasks.push(newtask);
  const n = new Create(newtask);
  n.createtodo(newtask);
  localStorage.setItem('todolist', JSON.stringify(tasks));
}

// Event to add the inputed task to the array and to display.
addlistdiv.addEventListener('click', (e) => {
  e.preventDefault();
  if (addlist.value !== '') {
    addlistfun(addlist.value);
    addlist.value = '';
  }
});

// function to display the existing array of tasks in localStorage.
function displaylist() {
  if (localStorage.getItem('todolist')) {
    tasks = JSON.parse(localStorage.getItem('todolist'));
    for (let i = 0; i < tasks.length; i += 1) {
      const newtask = tasks[i];
      const n = new Create(newtask);
      const { eachtask } = n.createtodo();
      ulList.appendChild(eachtask);
    }
  }
}
document.addEventListener('DOMContentLoaded', displaylist());