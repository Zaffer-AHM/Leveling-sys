            
// "parse" loads data from local, if it doesnt exists it makes new data
let user = JSON.parse(localStorage.getItem('user')) || { level: 1, xp: 0,
    tasks: [
        {task: "Run 5Kms", completed: false},
        {task: "Push ups 10", completed: false},
        {task: "Sit ups 10", completed: false},
        {task: "Leet Code", completed: false}
    ]
}



//update player-data
function updateUI() 
{
const taskList = document.getElementById('player-data');
taskList.innerHTML = "";
user.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.task;
    if (task.completed) {
        li.style.textDecoration = "line-through";
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => completeTask(index);
    li.appendChild(checkbox);
    taskList.appendChild(li);
});
document.getElementById('xp').textContent = user.xp;              //update XP and level
document.getElementById('level').textContent = user.level;
}



//giving xp based on the tasks finished
function completeTask(index) {
    if (!user.tasks[index].completed) {
        user.tasks[index].completed = true;
        user.xp += 10; 
        levelUp();
        saveUserData();                                             //save updated data
    }
updateUI();
}



//player level up
function levelUp() {
    if (user.xp >= user.level * 100) {
        user.level++;
    }
}



// Save the updated user data to localStorage
function saveUserData() {
localStorage.setItem('user', JSON.stringify(user));
}

updateUI();                                                         //starts UI when page loads
