// Fetching the unordered list globally
let ul = document.getElementById('list');
let lists;
let totalTask;
let taskMarked = 0;
let taskCount;

function calMarked() {
    //Pre calculating the marked task
    let updateMarked = ul.children
    for (let index = 0; index < updateMarked.length; index++) {
        console.log(updateMarked[index].children[0].children[0].checked)
        while(updateMarked[index] && updateMarked[index].children[0].children[0].checked) {
            taskMarked += 1
            break
        }
    }
}

calMarked()

//Add new task count
//Fetching p tag in task count
totalTask = ul.children.length

let taskText = document.getElementById('task-count')
taskText.textContent = `${taskMarked} of ${totalTask} task done`

// Fetching the add button and adding event listener
let addButton = document.getElementById('add');
addButton.addEventListener('click', addItem);

//Add function
function addItem() {
    let taskText = document.getElementById('input').value
    
    let textNode = document.createTextNode(taskText)

    if (taskText === '') {
        return false
    } else {
        //Date and Months
        const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']

        //Date and Time fetch
        const date = new Date() //New instance of Date
        let month = months[date.getMonth()] //Month
        let day = days[date.getDay()] //Day
        let hour = date.getHours() // 24 Hours Format
        let minutes = date.getMinutes() //Minutes
        let ampm = hour > 11 ? 'PM' : 'AM' //AM PM detection
        let time = hour > 12 ? hour - 12 : hour //12 Hours Format
        

        // Created div for li items
        let div = document.createElement('div')
        div.setAttribute('class', 'list-text')

        // Created li
        let li = document.createElement('li')
        
        // Created input and assigned type checkbox and added id
        let checkBox = document.createElement('input')
        checkBox.type = 'checkbox'
        checkBox.setAttribute('id', 'check')

        //Created label
        let label = document.createElement('label')
   
        //Created p tag
        let p = document.createElement('p')
        p.textContent = `${day}, ${month} ${date.getDate()}, ${time}:${minutes} ${ampm}`
        
        //Inserted div container in list
        li.appendChild(div)

        //Inserted checkbox input in div
        div.appendChild(checkBox)

        //Inserted label in div
        div.appendChild(label)

        //Inserted label text 
        label.appendChild(textNode)

        //Inserted p in div
        div.appendChild(p)

        //Inserted list in ul
        ul.insertBefore(li, ul.childNodes[0])

        //Timeout for animation
        setTimeout(() => {
            li.setAttribute('class', 'myCheck fadein')
        }, 10);

        //Add new task count
        //Fetching p tag in task count
        totalTask = ul.children.length

        let taskText = document.getElementById('task-count')
        taskText.textContent = `${taskMarked} of ${totalTask} task done`

        document.getElementById('input').value = ''

        taskUpdate()
    }
}


// Fetching the remove button and adding event listener.
let removeButton = document.getElementById('removeDone');
removeButton.addEventListener('click', removeItems);

//Remove function
function removeItems() {

    //Fetching the children property of list array
    lists = ul.children;
    

    //Looping the list array
    for (let index = 0; index < lists.length; index++) {
    
        while (lists[index] && lists[index].children[0].children[0].checked) {
            //Removing the elements that has property of checked
            ul.removeChild(lists[index])
            
            //Add new task count
            //Fetching p tag in task count
            totalTask = ul.children.length
            let taskText = document.getElementById('task-count')
            taskText.textContent = `${taskMarked} of ${totalTask} task done`
        }
    }

    //Reset the task count
    let updateMarked = ul.children
    taskCount = 0;
    for (let index = 0; index < updateMarked.length; index++) {
                    
        while(updateMarked[index] && updateMarked[index].children[0].children[0].checked) {
            taskCount += 1
                break
        }
    }
                
    taskMarked = taskCount

    totalTask = ul.children.length
    let taskText = document.getElementById('task-count')
    taskText.textContent = `${taskMarked} of ${totalTask} task done`

}


function taskUpdate() {
    let checkedButton = document.querySelectorAll('input[type=checkbox]')

    checkedButton.forEach(function (checkedButton) {
        checkedButton.addEventListener('change', function() {

            if (this.checked) {
                let updateMarked = ul.children
                taskCount = 0;
                for (let index = 0; index < updateMarked.length; index++) {
                    
                    while(updateMarked[index] && updateMarked[index].children[0].children[0].checked) {
                        taskCount += 1
                        break
                    }
                }
                
                taskMarked = taskCount
                //Add new task count
                //Fetching p tag in task count
                totalTask = ul.children.length
                let taskText = document.getElementById('task-count')
                taskText.textContent = `${taskMarked} of ${totalTask} task done`

            } else {
                let updateMarked = ul.children
                let undoTask = 0

                for (let index = 0; index < updateMarked.length; index++) {
                    while(updateMarked[index] && !updateMarked[index].children[0].children[0].checked) {
                        undoTask += 1
                        break
                    }
                }

                //Add new task count
                //Fetching p tag in task count
                totalTask = ul.children.length
                taskMarked = totalTask - undoTask
                let taskText = document.getElementById('task-count')
                taskText.textContent = `${taskMarked} of ${totalTask} task done`
            }
        });
    })
}

taskUpdate()