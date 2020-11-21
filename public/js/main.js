
var statusColors = ["complete", "inprogress", "notstarted"]
function statusToggle(circle)
{
   var strClasses =  circle.className;
   statusSize = statusColors.length;
   if(strClasses.search("status-inprogress") != -1)
   {
      strClasses = strClasses.replace("status-inprogress", "status-complete");
    updateStatus(circle.parentElement.id, 1);
   }
   else if(strClasses.search("status-notstarted") != -1)
   {
    strClasses = strClasses.replace("status-notstarted", "status-inprogress");
    updateStatus(circle.parentElement.id, 2);
   }
   circle.className = strClasses;
   
}

function createTask()
{
    var title = document.getElementById("taskTitle").value
    var status = document.getElementById("taskStatus").selectedIndex +1
    addTask(title, status)
}

function editTask(element)
{
    console.log("add modal insert new data");
   var itemId = element.parentElement.parentElement.id;
    document.getElementById(itemId).children[1].textContent;
}

function updateStatus(task, status)
{
    url = `/updateStatus?status=${status}&task=${task}`;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if(!obj.success)
            {
                console.error("status update failed try again")
            }
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function openAdd(modal) {
    var modal = document.getElementById(modal);
    modal.style.display = "block";
    document.getElementsByTagName("main")[0].style.opacity = "20%";
}


/***calls to the db***/

function addTask(title, status)
{
    var url = `/add?title=${title}&status=${status}&description=`;
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if(obj.success)
            {
                // repopulate the todo list
                getTodolist();
            }
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function getTodolist()
{
    var url = '/read';
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var listhtml = displayTodoList(data);
            document.getElementById('todolist_container').innerHTML = listhtml;
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displayTodoList(data)
{
    var status_list = ["complete", 'inprogress', 'notstarted']
    var listHTML =''
    for(var i = 0; i < data.length; ++i) {
        var id = data[i].itemid;
        var status = status_list[data[i].status-1];
        var title = data[i].title;
        listHTML += `<section class="todo-list-item" id="${id}" >
               <div class="circle status-${status}" onclick="statusToggle(this)"></div>
               <p class="todo-list-item-title">${title}</p>
               <div class="control-buttons">
                   <input type="button" value="edit" onclick="editTask(this)">
                   <input type="button" value="delete" onclick="deleteTask(this)">
               </div>
           </section>`
       }
       return listHTML
}

function deleteTask(button)
{
    var url = `/delete?task=${button.parentElement.parentElement.id}`;
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            if(!obj.success)
            {
                console.error("status update failed try again")
            }
        }
            
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
    button.parentElement.parentElement.style.display = "none";
}


getTodolist();


/***end of db calls***/ 