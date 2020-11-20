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
            return this.responseText;
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function displayTodoList(rows)
{

}
getTodolist();


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