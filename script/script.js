document.addEventListener("DOMContentLoaded", function() {
    
    var request  = indexedDB.open("personFile",2);
    
    request.onsuccess = function(e) {
        console.log("ruing onsuccess");
        db = request.result;
        document.getElementById('createPerson').addEventListener("click", addPerson);
        document.getElementById('getPerson').addEventListener("click", getPerson);
        document.getElementById('updatePerson').addEventListener("click", updatePerson);
        document.getElementById('deletePerson').addEventListener("click", deletePerson);        
    }

    request.onerror = function(e) {
    }

    request.onupgradeneeded = function(e) {
        e.target.result.createObjectStore("people", { keyPath: "id", autoIncrement: true });
        
    }
});

function addPerson() {

    var transaction = db.transaction(["people"],"readwrite");
    var store = transaction.objectStore("people");

    var personList = []; //массив персон

    var newPerson = {
        id: document.getElementById('addId').value,
        Fname: document.getElementById('addFname').value,
        Lname: document.getElementById('addLname').value,
        age: document.getElementById('addAge').value
    }
    personList.push(newPerson)
    var searchId = document.getElementById('addId').value;

    var request = store.add(newPerson);    

    for (i in personList) { //проверка на существующий id и добавление персоны если такого id нет
        if(personList[i].id !== searchId) {
            request = store.delete(searchId);
        }        
    }

    request.onerror = function(e) {
        console.log("Error", e.target.error.name);
    }
    request.onsuccess = function(e) {
        console.log("Woot! Did it");

        var table1 = document.getElementById('table');
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');                    

        table1.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);                    

        td1.innerHTML = parseInt(document.getElementById('addId').value);
        td2.innerHTML = document.getElementById('addFname').value;
        td3.innerHTML = document.getElementById('addLname').value;
        td4.innerHTML = document.getElementById('addAge').value;
    }
}


function getPerson() {
    var transaction = db.transaction(["people"],"readonly");
    var store = transaction.objectStore("people");

    var request = store.get(document.getElementById('addId').value);

    request.onsuccess = function(e) {
        document.getElementById('addFname').value = request.result.Fname
        document.getElementById('addLname').value = request.result.Lname
        document.getElementById('addAge').value = request.result.age
    }
}


function updatePerson() {
    var transaction = db.transaction(["people"],"readwrite");
    var store = transaction.objectStore("people");

    var request = store.get(document.getElementById('addId').value);

    request.onsuccess = function(e) {
        var data = request.result;
        data.Fname = document.getElementById('addFname').value;
        data.Lname = document.getElementById('addLname').value;
        data.age = document.getElementById('addAge').value;

        var td = document.querySelectorAll('td');
        console.log(td)
        var value = document.getElementById('addId').value;
        
        for(var i = 0; i < td.length; i++) {
            console.log(td[i].innerHTML)
            if(td[i].innerHTML === value) {
                td[i+1].innerHTML = document.getElementById('addFname').value;
                td[i+2].innerHTML = document.getElementById('addLname').value;
                td[i+3].innerHTML = document.getElementById('addAge').value;
            }
        }

        var updatePerson = store.put(data)
    }
}


function deletePerson() {

    var value = document.getElementById('addId').value;

    var transaction = db.transaction(["people"],"readwrite");
    var store = transaction.objectStore("people");

    var request = store.get(value);

    request.onsuccess = function(e) {
        console.log("deleted " + value);
        var tr = document.querySelectorAll('tr');
        console.log(tr)
        
        for(var i = 0; i < tr.length; i++) {
            if(tr[i].firstChild.innerHTML === value) {
                tr[i].remove()
            }
        }        
    }
    request.onerror = function(e) {
        console.log('fail deleting ' + value);
    }
    var request = store.delete(value);    
}