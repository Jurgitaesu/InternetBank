var form = document.querySelector("form");
var totalBalance = document.getElementById("totalBalance");
var operationsList = document.getElementById("operationsList");
var historyCheckMark = document.getElementById("operationsHistory");
var filterAddedCheckMark = document.getElementById("filter-added");
var filterWithdrawnCheckMark = document.getElementById("filter-withdrawn");
var inputSearch = document.getElementById("inputSearch");
var sortAscendingBtn = document.getElementById("sortAscendingBtn");
var sortDescendingBtn = document.getElementById("sortDescendingBtn");

var balance;
var allOperations;

function createEntry(operation) {
    var li = document.createElement("li");
    li.textContent = operation.sum + " Eur, date: " + operation.date;
    li.classList.add("" + (operation.selection));
    operationsList.append(li);
}

function createFilters(operation) {
    var li = document.createElement("li");
    li.textContent = operation.sum + " Eur, date: " + operation.date;
    li.classList.add("" + (operation.selection));
    filterUl.append(li);
}

function createSort(operation) {
    var li = document.createElement("li");
    li.textContent = operation.sum + " Eur, date: " + operation.date;
    li.classList.add("" + (operation.selection));
    sortList.append(li);
}

function CreateOperation(sum, selection) {
    this.sum = sum;
    this.selection = selection;
    this.date = new Date();
}

function getInfoFromLocalStorage() {
    balance = JSON.parse(localStorage.getItem("balance"));
    allOperations = JSON.parse(localStorage.getItem("allOperations"));
}

function setInfoToLocalStorage(balance, allOperations, additionsArray) {
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("allOperations", JSON.stringify(allOperations));
}

if (window.localStorage.length > 0) {
    getInfoFromLocalStorage();
    totalBalance.textContent = balance;
} else {
    var balance = 0;
    var allOperations = [];
}


form.addEventListener("submit", function (e) {
    e.preventDefault();
    var selection = form["select"].value == "add" ? true : false;
    var amount = Number(form["input"].value);
    form["input"].value = "";
    if (amount > 0) {
        if ((form["select"].value == "add") && (amount > 0)) {
            balance += amount;
            totalBalance.textContent = balance;

        } else {
            if ((amount <= balance) && (amount > 0)) {
                balance -= amount;
                amount = amount * (-1);
                totalBalance.textContent = balance;

            } else {
                swal("Insufficient funds, enter smaller amount");
                return;
            }
        }
        var operation = new CreateOperation(amount, selection);
        allOperations.push(operation);
        setInfoToLocalStorage(balance, allOperations);
    } else {
        swal("Please enter amount");
    }

    form["input"].value = "";

})

/**********All bank operations*************/


historyCheckMark.addEventListener("click", function () {
    operationsList.textContent = "";
    getInfoFromLocalStorage();
    allOperations.forEach(function (entry) {
        createEntry(entry);
    })
    if (historyCheckMark.checked == true) {
        operationsList.style.display = "block";
        allOperations.textContent = "";
    } else {
        operationsList.style.display = "none";
    }
})


/**********Filter all added cash***********/

filterAddedCheckMark.addEventListener("click", function () {
    filterUl = document.getElementById("addedList");

    if (filterAddedCheckMark.checked == true) {
        filterUl.style.display = "block";
        filterUl.innerHTML = "";
        var selection = form["select"].value == "add" ? true : false;
        var amount = Number(form["input"].value);
        form["input"].value = "";
        let additionsArray = allOperations.filter(function (entry) {
            return entry.selection == true;
        });
        var operation = new CreateOperation(amount, selection);
        additionsArray.forEach(function (entry) {
            createFilters(entry);
        })

    } else {
        filterUl.style.display = "none";
    }

})


/**********Filter all wthdrawals**********/

filterWithdrawnCheckMark.addEventListener("click", function () {
    filterUl = document.getElementById("withdrawalsList");

    if (filterWithdrawnCheckMark.checked == true) {
        filterUl.style.display = "block";
        filterUl.innerHTML = "";
        var selection = form["select"].value == "add" ? true : false;
        var amount = Number(form["input"].value);
        form["input"].value = "";
        let withdrawalsArray = allOperations.filter(function (entry) {
            return entry.selection == false;
        });
        var operation = new CreateOperation(amount, selection);
        withdrawalsArray.forEach(function (entry) {
            createFilters(entry);
        })

    } else {
        filterUl.style.display = "none";
    }
})

/*********Search for operation***********/


inputSearch.addEventListener("keyup", function (e) {
    e.preventDefault();
    filterUl = document.getElementById("searchList");
    filterUl.style.display = "block";
    filterUl.innerHTML = "";
    let searchAmount = allOperations.filter(function (entry) {
        return entry.sum == inputSearch.value;
    });

    for (i = 0; i < searchAmount.length; i++) {
        var li = document.createElement("li");
        var text = document.createTextNode(JSON.stringify(searchAmount[i].sum + " Eur, date: " + searchAmount[i].date));
        li.classList.add("" + (searchAmount[i].selection));
        li.appendChild(text);
        filterUl.appendChild(li);
    }

})

/*****************Sort*****************/

sortAscendingBtn.addEventListener("click", function () {
    sortList.textContent = "";
    getInfoFromLocalStorage();
    var selection = form["select"].value == "add" ? true : false;
    var amount = Number(form["input"].value);
    form["input"].value = "";
    allOperations.sort(function (a, b) {
        return a.sum - b.sum;
    });
    var operation = new CreateOperation(amount, selection);
    allOperations.forEach(function (entry) {
        createSort(entry);
    })
})

sortDescendingBtn.addEventListener("click", function () {
    sortList.textContent = "";
    getInfoFromLocalStorage();
    var selection = form["select"].value == "add" ? true : false;
    var amount = Number(form["input"].value);
    form["input"].value = "";
    allOperations.sort(function (a, b) {
        return b.sum - a.sum;
    });
    var operation = new CreateOperation(amount, selection);
    allOperations.forEach(function (entry) {
        createSort(entry);
    })
})
