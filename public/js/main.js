var statusColors = ["complete", "inprogress", "notstarted"]
function statusToggle(circle)
{
   var strClasses =  circle.className;
   statusSize = statusColors.length;
   if(strClasses.search("status-inprogress") != -1)
   {
      strClasses = strClasses.replace("status-inprogress", "status-complete");
    //   make a call to update status
   }
   else if(strClasses.search("status-notstarted") != -1)
   {
    strClasses = strClasses.replace("status-notstarted", "status-inprogress");
    //   make a call to update status
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