//load all customers
getAllCustomers();

//Save Customer
$("#btnSaveCustomer").click(function () {
    if (checkAll()){
        saveCustomer();
    }else{
        alert("Error");
    }
});

// Save Customer
function saveCustomer() {
    let customerID = $("#CustomertxtID").val();
    //check customer is exists or not?
    if (searchCustomer(customerID.trim()) == undefined) {

        let customerName = $("#CustomertxtName").val();
        let customerAddress = $("#CustomertxtAddress").val();
        let customerSalary = $("#CustomertxtSalary").val();

        let newCustomer = Object.assign({}, customer);

        newCustomer.id = customerID;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        customerDB.push(newCustomer);
        clearCustomerInputFields();
        getAllCustomers();

    } else {
        alert("Customer already exits.!");
        clearCustomerInputFields();
    }
}

//delete Customer
$("#btnCusDelete").click(function () {
    let id = $("#CustomertxtID").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Customer Deleted");
            clearCustomerInputFields();
            getAllCustomers();
        } else {
            alert("Customer Not Removed..!");
        }
    }
});

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false;
}


//update  Customer
$("#btnUpdate").click(function () {
    let id = $("#CustomertxtID").val();
    updateCustomer(id);
    clearCustomerInputFields();
});

//clear textField
$("#btnCustomerClear").click(function () {
    clearCustomerInputFields();

});

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No Customer find..please check the ID");
    } else {
        let consent = confirm("Do you really want to update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);

            let customerName = $("#CustomertxtName").val();
            let customerAddress = $("#CustomertxtAddress").val();
            let customerSalary = $("#CustomertxtSalary").val();

            customer.name = customerName;
            customer.address = customerAddress;
            customer.salary = customerSalary;

            getAllCustomers();
        }
    }
}


function getAllCustomers() {
    $("#CustomerTbl").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let salary = customerDB[i].salary;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${address}</td>
                     <td>${salary}</td>
                    </tr>`;

        $("#CustomerTbl").append(row);
        bindTrEvents();
    }
}

//click table .shire value textField
function bindTrEvents() {

    $('#CustomerTbl>tr').click(function () {
        $("#CustomertxtID,#CustomertxtName,#CustomertxtAddress,#CustomertxtSalary").css("border", "2px solid blue");
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#CustomertxtID").val(id);
        $("#CustomertxtName").val(name);
        $("#CustomertxtAddress").val(address);
        $("#CustomertxtSalary").val(salary);


    })
}

//click table .shire value textField help..............
$(document).on('click', '#CustomerTbl > tr', function() {
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let address = $(this).children().eq(2).text();
    let salary = $(this).children().eq(3).text();

    setTextFieldValues(id,name,address,salary);
});

function setTextFieldValues(id, name, address, salary) {
    $("#CustomertxtID").val(id);
    $("#CustomertxtName").val(name);
    $("#CustomertxtAddress").val(address);
    $("#CustomertxtSalary").val(salary);
}


