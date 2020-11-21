
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

function creatTask()
{
    console.log("add a skeleton or modal and regenerate list")
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

function openAdd(modal) {
    var modal = document.getElementById(modal);
    modal.style.display = "block";
}