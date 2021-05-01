let db;

const request = indexedDB.open('pizza_hunt', 1);

request.onupgradeneeded = function (event) {
    const db = event.target.result;

    db.createObjectStore('new_pizza', { autoIncrement: true });
};

request.onsuccess = function (event) {
    db = event.target.result;

    if (navigator.onLine) {
        //uploadPizza();
    }
};

request.onerror = function (event) {
    console.log(event.target.errorCode);
};

//this func will be executed if 
//we attempt to submit a new pizza offline
function saveRecord(record) {
    console.log('attempt to save')
    //open new tx w db w read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //access object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //add record to store
    pizzaObjectStore.add(record);
}

function uploadPizza() {
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    const pizzaObjectStore = transaction.objectStore('new_pizza');

    const getAll = pizzaObjectStore.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    const transaction = db.transaction(['new_pizza'], 'readwrite');

                    const pizzaObjectStore = transaction.objectStor('new_pizza');

                    pizzaObjectStore = transaction.objectStore('new_pizza');

                    pizzaObjectStore.clear();

                    alert('All saved Pizza has been Submitted');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};

window.addEventListener('online', uploadPizza);