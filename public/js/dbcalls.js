function addTask()
{
    var url = '/add?title=add to the db via user request&status=3&description=';
    console.log('url:  ' + url);
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}