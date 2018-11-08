// var db;
// var request = indexedDB.open("DatabasePerson", 3);
//
// request.onerror = function(event) {
//     // Сделать что-то при ошибке request.errorCode!
// };
// request.onupgradeneeded  = function(event) {
//     db = event.target.result;
//     console.log(db)
//
//     var objectStore = db.createObjectStore("people", {autoIncrement:true});
// };

// This is what our customer data looks like.

// var db;
//
// let newPerson = {};
//
// let customerData = [
//     { id: "1", Fname: "FDhhdf", Lname: 'BBB', age: 10 },
//     { id: "2", Fname: "WQWR", Lname: 'CCC', age: 02 }
// ];
//
// const createPerson = document.getElementById('createPerson');
//
//
// const dbName = "dbPerson";
// var request = indexedDB.open(dbName, 2);
// //console.log('1111')
// request.onerror = function(event) {
//     alert('ERROR')
// };
// request.onupgradeneeded = function(event) {
//     console.log('aaaaaa')
//     db = event.target.result;
//     console.log(db)
//     var objectStore = db.createObjectStore("people", {autoIncrement:true});
//     // objectStore.createIndex("Fname", "Fname", { unique: false });
//     // objectStore.createIndex("Lname", "Lname", { unique: true });
//     // objectStore.createIndex("age", "age", { unique: false });
//     // for (var i in customerData) {
//     //     objectStore.add(customerData[i]);
//     // }
// };
// createPerson.addEventListener('click', addNewPerson);
// console.log(db)
// function addNewPerson() {
//
//     newPerson.id = document.getElementById('addId').value;
//     newPerson.Fname = document.getElementById('addFname').value;
//     newPerson.Lname = document.getElementById('addLname').value;
//     newPerson.age = document.getElementById('addAge').value;
//
//     customerData.push(newPerson)
//     console.log(customerData)
//
//     var trans = db.transaction(["persons"], "readwrite");
//     var store = trans.objectStore("persons");
//
//     // var data = {
//     //     "text": todoText,
//     //     "timeStamp": new Date().getTime()
//     // };
//
//     var request = store.put(newPerson,2);
// }

// function indexedDBOk() {
//     return "indexedDB" in window;
// }
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
                //console.log(arrDataPersons)
                

                        
        }
    }
}
