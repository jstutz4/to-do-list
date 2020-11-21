function addTask()
{
    var url = '/add?title=add to the db via user request&status=3&description=';
    console.log('url:  ' + url);
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
            var data = JSON.parse(this.responseText).data;
            console.log("see date here")
            console.log(data)
            
            document.getElementById('todolist_container').innerHTML = displayTodoList(data);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displayTodoList(data)
{
    var status = ["complete", 'inprogress', 'notstarted']
    var listHTML =''
    for(var i = 0; i < data.length; ++i) {
        console.log(data.length);
        console.log(data[i].itemid);
        console.log(status[data[i].status-1]);
        console.log(data[i].title);
        
        var id = data[i].itemid;
        var status = status[data[i].status-1];
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
// getTodolist();


// {
//     "itemid": 1,
//     "title": "add todolist html with CSS and JS",
//     "description": null,
//     "status": 1
// }, {
//     "itemid": 2,
//     "title": "add to the db via user request",
//     "description": "",
//     "status": 3
// }, {
//     "itemid": 3,
//     "title": "add to the db via user request",
//     "description": "",
//     "status": 3
// }, {
//     "itemid": 4,
//     "title": "add to the db via user request",
//     "description": "",
//     "status": 3
// }, {
//     "itemid": 5,
//     "title": "add to the db via user request",
//     "description": "",
//     "status": 3
// }