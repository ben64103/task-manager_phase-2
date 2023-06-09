const addTaskInput = document.getElementById('addInput')
const taskElement = document.querySelector('#tasks')
const message = document.getElementById('message')


let recentDate = new Date()

const btn = document.querySelector('#btn')

// Initialize Empty
const taskArray = JSON.parse(localStorage.getItem('tasks')) || []


const addTask = ()=>{
  const taskObj = {
    date: recentDate.toLocaleDateString(),
    dateTime: recentDate.toLocaleTimeString(),
    task: addTaskInput.value,
  }

  taskArray.push(taskObj)
  localStorage.setItem('tasks', JSON.stringify(taskArray))
  
  createTask()
  // checkSelection()
  checkSub('', true)
}


function createTask(){
  taskElement.innerHTML = ''
  taskArray.forEach((task, index) =>{
    taskElement.innerHTML += `
      <div class="task-element d-flex justify-content-between" id="task-element">
      <div class="number">${index + 1}.  ${task.dateTime} | ${task.date}</div>
      <div class="task-name">${task.task}</div>
      <div class="buttons d-flex align-items-center gap-2">
        <button>Edit</button>
        <button onclick="deleteTask(${index})">Delete task</button>
      </div>
    </div>
    `
  })

}
createTask()

addTaskInput.addEventListener("input", checkInputStatus)

function checkInputStatus(){
  if(addTaskInput.value === ""){
    btn.setAttribute("disabled", "")
    showMessage('enter task', 'text-success')
  }
  addTaskInput.addEventListener('focus', ()=>{
    if(addTaskInput.value === ""){
      btn.setAttribute("disabled", "")
      showMessage('Enter task <em class="text-success">to enable button</em>', 'text-danger')
    }
  })
  if(addTaskInput.value){
    btn.removeAttribute("disabled")
    showMessage('typing...', 'text-success')
  }
  addTaskInput.addEventListener('blur', ()=> {
    if(addTaskInput.value === ""){
      showMessage('you have not entered a task', 'text-danger')
      
      setTimeout(() => {
        showMessage('enter task', 'text-success')
      }, 2000);
    }
    else if(addTaskInput.value){
      showMessage("don't forget to save your task...", 'text-danger')
    }
    else if(addTask()){
      // savedTask()
      showMessage("enter a new task", '')
    }
  })
}

function showMessage(text, className){
  message.classList.remove('slide')
  message.classList = className
  message.innerHTML = text
  
  setTimeout(() => {
    message.classList.add('slide')
  }, 10);
}

function checkSub(attr, value) {
  addTaskInput.value = value;
  addTaskInput.disabled = attr;
}

function deleteTask(index){
  if(confirm('Delete task?')){
    taskArray.splice(index, 1)

    localStorage.setItem('tasks', JSON.stringify(taskArray))
  }

  createTask()
}
checkInputStatus()

const filterInput = document.getElementById('filter-input').addEventListener('input', filterTasks);

function filterTasks(){
  const taskFilter = JSON.parse(localStorage.getItem('tasks'))
  let searchTerm = filterInput.value


  taskFilter.forEach((task) => {
    if(searchTerm === task.textContent.toLowerCase()){
      task.textContent = 'red'
    }
  })
}

function editTask (index){
  addTaskInput.addEventListener('focus', (e)=> {
    index.innerHTML = e.target.value
  })

  localStorage.setItem('tasks', JSON.stringify(taskArray))
}