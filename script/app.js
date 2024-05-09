let inputTaskID = document.querySelector("#taskID");
let inputTaskName = document.querySelector("#taskName");
let todoList = document.querySelector("#todoList");
let buttonAdd = document.querySelector("#buttonAdd");
let isEdit = false;
let taskItems = [];
// ===== Set Item to local storage =====
let setItemIntoLocalStorage = () => {
    localStorage.setItem("taskItems", JSON.stringify(!taskItems ? [] : taskItems));
}
taskItems = JSON.parse(localStorage.getItem("taskItems")) || [];
// ===== Loop Task Item for Display in HTML =====
let renderTasks = () => {
    setItemIntoLocalStorage();
    taskItems?.forEach((task) => {
        let taskTemplate = `
    <li class="list relative top-[0px] left-[5px] m-auto my-3 flex w-[350px] justify-between rounded bg-slate-700 p-1">
    <span class="flex h-[32px] w-[40px] items-center justify-center bg-[#6b7684] text-center text-sm">${task.id}</span>
    <span class="flex h-[32px] w-[190px] items-center justify-center bg-[#6b7684] text-sm ${task.isComplete ? 'line-through' : ''}">${task.taskName}</span>
    <span class="text-md flex h-[32px] w-[30px] items-center justify-center bg-[#6b7684] text-center" onclick="toggleMark(${task.id})"> <img src="/assets/img/mark-icon.svg" alt=""></span>
    <span class="text-md flex h-[32px] w-[30px] items-center justify-center bg-[#6b7684] text-center" onclick="editTask(${task.id})"> <img src="/assets/img/edit-icon.svg" alt=""></span>
    <span class="text-md flex h-[32px] w-[30px] items-center justify-center bg-[#6b7684] text-center" onclick="removeTask(${task.id})"> <img src="/assets/img/delete-icon.svg" alt=""></span>
    </li>
    `;
        todoList.insertAdjacentHTML('beforeend', taskTemplate);
        todoList.querySelector(".list").classList.add("fade-in");
    })
    let noDataElement = document.createElement('li');
    if (taskItems.length == 0) {
        noDataElement.classList.add("active_no_data");
        noDataElement.textContent = "No Data";
        todoList.appendChild(noDataElement);
    } else {
        noDataElement.remove();
    }
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
        setItemIntoLocalStorage();
    }
    randomTaskID();
    renderTasks();
    inputTaskName.value = ''
}

// ===== Auto ID for Task ID =====
let randomTaskID = () => {
    return inputTaskID.value = Math.floor(Math.random() * 900) + 100;
}

// ===== Reset Task List =====
let resetArray = () => {
    let liElements = todoList.querySelectorAll("li");
    liElements.forEach(li => {
        todoList.removeChild(li);
    });
}


// ===== Reset Input Field =====
let resetInputTaskName = () => {
    randomTaskID();
    inputTaskName.value = '';
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
        setItemIntoLocalStorage();
        renderTasks();
    }
}

// ===== Remove Task =====
let removeTask = (id) => {
    taskItems = taskItems.filter((task) => {
        if (task.id != id) {
            return task;
        }
    });
    setItemIntoLocalStorage();
    resetArray();
    renderTasks();
}

// ===== Set Data for Update into input field =====
let editTask = (id) => {
    isEdit = true;
    todoList.querySelector("#DisableContainer").classList.add("active");
    updateAddButtonName("Save");
    taskItems.filter((task) => {
        if (task.id == id) {
            inputTaskID.value = task.id
            inputTaskName.value = task.taskName
        }
    });
    setItemIntoLocalStorage();
}

// ===== Update Task =====
let updateTask = () => {
    isEdit = false;
    todoList.querySelector("#DisableContainer").classList.remove("active");
    updateAddButtonName("Add");
    taskItems.filter((task) => {
        if (task.id == inputTaskID.value) {
            task.id = inputTaskID.value;
            task.taskName = inputTaskName.value;
        }
    });
    setItemIntoLocalStorage();
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
