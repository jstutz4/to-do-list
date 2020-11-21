function addTask()
{
    var url = '/add?title=add to the db via user request&status=3&description=';
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            if(obj.success)
            {
                let tasklist = getTodolist();
                console.log(tasklist)
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
            console.log(data);
            var listhtml = displayTodoList(data);
            console.log(listhtml);
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
        console.log(data.length);
        console.log(data[i].itemid);
        console.log(status_list[data[i].status-1]);
        console.log(data[i].title);
        
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
            console.log(obj);
        }
            
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
    console.log("remove task display none");
    button.parentElement.parentElement.style.display = "none";
}
getTodolist();
