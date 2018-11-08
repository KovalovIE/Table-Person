document.addEventListener("DOMContentLoaded", function() {
    
    var openRequest = indexedDB.open("personFile",2);
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        thisDB.createObjectStore("people", {autoIncrement:true});
        
    }
    openRequest.onsuccess = function(e) {
        console.log("ruing onsuccess");
        db = e.target.result;
        document.getElementById('createPerson').addEventListener("click", addPerson, false);
    }
    openRequest.onerror = function(e) {
    }
},false);

function addPerson(e) {

    var transaction = db.transaction(["people"],"readwrite");
    var store = transaction.objectStore("people");

    var newPerson = {
        id: document.getElementById('addId').value,
        Fname: document.getElementById('addFname').value,
        Lname: document.getElementById('addLname').value,
        age: document.getElementById('addAge').value
    }

    var request = store.add(newPerson);

    request.onerror = function(e) {
        console.log("Error",e.target.error.name);
    }
    request.onsuccess = function(e) {
        console.log("Woot! Did it");
    }


var getPeople1 = document.getElementById('getPeople')
getPeople1.addEventListener('click', getPeople)
    function getPeople(e) {
        console.log('get')
     
        db.transaction(["people"], "readonly").objectStore("people").openCursor().onsuccess = function(e) {
            var cursor = e.target.result;
            
            var searchId = document.getElementById('addId').value;            
                
                if(cursor) {
                    for(var field in cursor.value) {
                        //console.log(field)
                        console.log(cursor.value.id)
                        console.log(cursor.value)
                        if (searchId === cursor.value.id) {
                            

                            var table1 = document.getElementById('table');
                            let tr = document.createElement('tr');
                            let td1 = document.createElement('td');
                            let td2 = document.createElement('td');
                            let td3 = document.createElement('td');
                            let td4 = document.createElement('td');

                            var arrDataPersons = [];

                            table1.appendChild(tr);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);

                            arrDataPersons.push(cursor.value[field])
                            console.log(arrDataPersons)

                            td1.innerHTML = cursor.value.id;
                            td2.innerHTML = cursor.value.id;
                            td3.innerHTML = cursor.value.id;
                            td4.innerHTML = cursor.value.id;
                        }

                        
                    }
                    cursor.continue();
                }
        }
    }
}
