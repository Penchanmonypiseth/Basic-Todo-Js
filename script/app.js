let inputTaskID = document.querySelector("#taskID");
let inputTaskName = document.querySelector("#taskName");
let todoList = document.querySelector("#todoList");
let buttonAdd = document.querySelector("#buttonAdd");
let isEdit = false;
let taskItems = [
  { id: 1, taskName: 'Apple', isComplete: false },
  { id: 2, taskName: 'Banana', isComplete: false },
  { id: 3, taskName: 'Coconut', isComplete: true }
]

// ===== Loop Task Item for Display in HTML =====
let renderTasks = () => {
  taskItems.forEach((task) => {
    let taskTemplate = `
    <li class="relative left-[3px] m-auto my-3 flex w-[350px] justify-between rounded bg-slate-700 p-1">
          <span class="flex h-[32px] w-[40px] items-center justify-center bg-[#6b7684] text-center text-sm">${task.id}</span>
          <span class="flex h-[32px] w-[190px] items-center justify-center bg-[#6b7684] text-sm ${task.isComplete ? 'line-through' : ''}">${task.taskName}</span>
          <span class="text-md flex h-[32px] w-[30px] items-center justify-center bg-[#6b7684] text-center" onclick="toggleMark(${task.id})"> <img src="/assets/img/mark-icon.svg" alt=""></span>
          <span class="text-md flex h-[32px] w-[30px] items-center justify-center bg-[#6b7684] text-center" onclick="editTask(${task.id})"> <img src="/assets/img/edit-icon.svg" alt=""></span>
          <span class="text-md flex h-[32px] w-[30px] items-center justify-center bg-[#6b7684] text-center" onclick="removeTask(${task.id})"> <img src="/assets/img/delete-icon.svg" alt=""></span>
    </li>
    `;
    todoList.insertAdjacentHTML('beforeend', taskTemplate);
  })
}

// ===== Add Task =====
let addTask = () => {
  resetArray();
  if (!inputTaskName.value) {
    alert("Please fill Task!");
  } else {
    taskItems.push({
      id: inputTaskID.value,
      taskName: inputTaskName.value,
      isComplete: false
    });
  }
  randomTaskID();
  renderTasks();
  resetInputTaskName();
}

// ===== Auto ID for Task ID =====
let randomTaskID = () => {
  return inputTaskID.value = taskItems.length + 1;
}

// ===== Reset Task List =====
let resetArray = () => {
  while (todoList.hasChildNodes()) {
    todoList.removeChild(todoList.firstChild);
  }
}


// ===== Reset Input Field =====
let resetInputTaskName = () => {
  inputTaskName.value = '';
  inputTaskID.value = ''
}

// ===== Toggle Mark Task =====
let toggleMark = (id) => {
  if (id) {
    resetArray();
    taskItems.filter((task) => {
      if (task.id == id) {
        task.isComplete = !task.isComplete;
      }
    });
    renderTasks();
  }
}

// ===== Remove Task =====
let removeTask = (id) => {
  taskItems = taskItems.filter(task => task.id != id);
  resetArray();
  renderTasks();
}

// ===== Set Data for Update into input field =====
let editTask = (id) => {
  isEdit = true;
  updateAddButtonName("Save");
  taskItems.filter((task) => {
    if (task.id == id) {
      inputTaskID.value = task.id
      inputTaskName.value = task.taskName
    }
  });
}

// ===== Update Task =====
let updateTask = () => {
  isEdit = false;
  updateAddButtonName("Add");
  taskItems.filter((task) => {
    if (task.id == inputTaskID.value) {
      task.id = inputTaskID.value;
      task.taskName = inputTaskName.value;
    }
  });
  resetArray();
  renderTasks();
  resetInputTaskName();
}

let updateAddButtonName = (name) => {
  buttonAdd.textContent = name;
}

// ===== Switch Method into Button Add Task =====
buttonAdd.addEventListener("click", () => {
  isEdit ? buttonAdd.setAttribute("onclick", updateTask()) : buttonAdd.setAttribute("onclick", addTask())
})


// ===== Render Task and Auto ID =====
renderTasks();
randomTaskID();
