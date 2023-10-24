// customer side

    let selectElement = document.getElementById("CustominputState");
getAllCustomer();
    function getAllCustomer() {
        customerDB.forEach(function(customer) {
            let option = document.createElement("option");
            option.value = customer.id;
            option.textContent = customer.id;
            selectElement.appendChild(option);
        });
    }

    let CustomerIdShirOrder;
    selectElement.addEventListener("change", function () {
        let selectedId = selectElement.value;
        let selectedCustomer = customerDB.find(function(customer) {
            return customer.id === selectedId;
        });
        if (selectedCustomer) {
            $("#custIdSetOrder").val(selectedCustomer.id);
            $("#custNameSetOrder").val(selectedCustomer.name);
            $("#custAddressSetOrder").val(selectedCustomer.address);
            $("#custSalarySetOrder").val(selectedCustomer.salary);
            CustomerIdShirOrder = selectedCustomer.id;
        }
    });

// item side
getAllCustomercheck();
function getAllCustomercheck() {
    customerDB.forEach(function (customer) {
        console.log(customer.id);
        console.log(customer.name);
        console.log(customer.salary);
        console.log(customer.address);
    });
}

    let selectItemElement = document.getElementById("IteminputState");
    let itemCode;
    let itemName;

    itemDB.forEach(function(item) {
        let option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.code;
        selectItemElement.appendChild(option);
    });

    let itemCodetoOrder;
    let itemNametoOrder;
    let itemPricetoOrder;
    let ChoiceElementOrder = document.getElementById("ChoiceQTYOrder");
    const defaultArrayToSecondItem = [];
    selectItemElement.addEventListener("change", function () {
        let selectedId = selectItemElement.value;
        let selectedItem = itemDB.find(function(item) {
            return item.code === selectedId;
        });
        if (selectedItem) {
            CheckQTY(selectedItem.qtyOnHand);
            $("#ItemIdSetOrder").val(selectedItem.code);
            $("#ItemNameSetOrder").val(selectedItem.description);
            $("#ItemPriceSetOrder").val(selectedItem.unitPrice);
            $("#ItemQTYSetOrder").val(selectedItem.qtyOnHand);

            itemCodetoOrder = selectedItem.code;
            itemNametoOrder = selectedItem.description;
            itemPricetoOrder = selectedItem.unitPrice;
        }
    });

function getAllItemTOOrder() {
    let newItemtoOrder = Object.assign({}, itemToOrder);
    let totalItemPrice = itemPricetoOrder * ChoiceElementOrder.value;
    let existingItemIndex = defaultArrayToSecondItem.findIndex(item => item.itemCode === itemCodetoOrder);
    if (existingItemIndex !== -1) {
        defaultArrayToSecondItem[existingItemIndex].itemQTYChoice = ChoiceElementOrder.value;
        defaultArrayToSecondItem[existingItemIndex].totalPrice = totalItemPrice;

    } else {
        newItemtoOrder.itemCode = itemCodetoOrder;
        newItemtoOrder.itemName = itemNametoOrder;
        newItemtoOrder.itemPrice = itemPricetoOrder;
        newItemtoOrder.itemQTYChoice = ChoiceElementOrder.value;
        newItemtoOrder.totalPrice = totalItemPrice;
        defaultArrayToSecondItem.push(newItemtoOrder);
    }
    getAllItemSetTableArray();
}

function getAllItemSetTableArray() {
    $("#TBodyOrder").empty()
    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        let id = defaultArrayToSecondItem[i].itemCode;
        let name = defaultArrayToSecondItem[i].itemName;
        let price = defaultArrayToSecondItem[i].itemPrice;
        let QTY = defaultArrayToSecondItem[i].itemQTYChoice;
        let total = defaultArrayToSecondItem[i].totalPrice;
        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${QTY}</td>
                     <td>${total}</td>
                    </tr>`;
        $("#TBodyOrder").append(row);
        calculateTotalPrice();
    }
}

//purchase order
let totalPriceSum2;
function calculateTotalPrice() {
    let totalPriceSum = 0;
    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        totalPriceSum += defaultArrayToSecondItem[i].totalPrice;
    }
    document.getElementById("lableTotPrice").innerHTML = totalPriceSum;
    document.getElementById("lableSubTotal").innerHTML = totalPriceSum;
    totalPriceSum2=totalPriceSum;
}

// discount
let discount = document.getElementById("discount");
discount.addEventListener("keyup", function (){
    let discountValue = discount.value;
    let discountAmount = (discountValue / 100) * totalPriceSum2;
    let discountedPrice = totalPriceSum2 - discountAmount;
    document.getElementById("lableSubTotal").innerHTML = discountedPrice;
    let balance = inputCash.value-discountedPrice;
    $("#BalanceInput").val(balance);
});

function ItemQTYLower(orderIDstor) {
    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        let defaultArrayItemCode = defaultArrayToSecondItem[i].itemCode;
        let defaultArrayItemQTY = defaultArrayToSecondItem[i].itemQTYChoice;

        for (let k = 0; k < itemDB.length; k++) {
            let ItemCode = itemDB[k].code;
            if (defaultArrayItemCode === ItemCode) {
                let itemQtyOnHand = itemDB[k].qtyOnHand;
                let lowQTYUpdate = itemQtyOnHand - defaultArrayItemQTY;

                itemDB[k].qtyOnHand = lowQTYUpdate;

                // console.log("Code: " + itemDB[k].code);
                // console.log("Description: " + itemDB[k].description);
                // console.log("Qty on Hand: " + lowQTYUpdate);
                // console.log("Unit Price: " + itemDB[k].unitPrice);
                // console.log("\n");
            }
        }
    }
    setOrderValue(orderIDstor);
}

    function setOrderValue(orderIDstor) {
    // orderDB.length=0;
    // orderDB.orderDetails=0
    let orderId = orderIDstor;
    let date = $("#date").val();
    let custId = $("#custIdSetOrder").val();

    let order = {
        oid: orderId,
        date: date,
        customerID: custId,
        orderDetails: []
    };

    for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
        let id = defaultArrayToSecondItem[i].itemCode;
        let name = defaultArrayToSecondItem[i].itemName;
        let price = defaultArrayToSecondItem[i].itemPrice;
        let QTY = defaultArrayToSecondItem[i].itemQTYChoice;
        let total = defaultArrayToSecondItem[i].totalPrice;

        order.orderDetails.push({
                oid: orderId,
                code: id,
                qty: QTY,
                unitPrice: total
            }
        );
    }

    orderDB.push(order);
    defaultArrayToSecondItem.length=0;
    // orderDB.forEach(function (order) {
    //     console.log("Order ID: " + order.oid);
    //     console.log("Date: " + order.date);
    //     console.log("Customer ID: " + order.customerID);
    //
    //     order.orderDetails.forEach(function (detail) {
    //         console.log("Order Detail Code: " + detail.oid);
    //         console.log("Order Detail Code: " + detail.code);
    //         console.log("Quantity: " + detail.qty);
    //         console.log("Unit Price: " + detail.unitPrice);
    //     });
    // });

    // for (let i = 0; i < secondRoundArry.length; i++) {
    //     console.log(secondRoundArry[i]);
    // }
    allemtyset();
}

    //get order details

    // const totalArry = [];
    let ChoiceElement6 = document.getElementById("OrderId");
    ChoiceElement6.addEventListener("keyup", function () {
    let inputOrd = ChoiceElement6.value;
    $("#TBodyOrder").empty();
        for (let i = 0; i < orderDB.length; i++) {
            let order = orderDB[i];
            if (order.oid === inputOrd) {
                let orderDetails = order.orderDetails;
                let totalOrderPrice = 0;

                for (let j = 0; j < orderDetails.length; j++) {
                    let code = orderDetails[j].code;
                    let QTY = orderDetails[j].qty;
                    let unitPrice = orderDetails[j].unitPrice;

                    for (let k = 0; k < itemDB.length; k++) {
                    let realItemid = itemDB[k].code;

                        if (realItemid === code) {
                            let realItemname = itemDB[k].description;
                            let realItemPrice = itemDB[k].unitPrice;
                            let row = `<tr>
                                <td>${code}</td>
                                <td>${realItemname}</td>
                                <td>${realItemPrice}</td>
                                <td>${QTY}</td>
                                <td>${unitPrice}</td>
                            </tr>`;
                            $("#TBodyOrder").append(row);
                            totalOrderPrice += unitPrice;
                        }
                    }
                }
                $("#lableTotPrice").text(totalOrderPrice);
                $("#lableSubTotal").text(totalOrderPrice);
            }
        }
    });

//    delete table value
$(document).ready(function () {
    $('#clickTable').on('click', 'tr', function () {
        var userConfirmed = confirm("Do you want to Remove ?");

        if (userConfirmed) {
            alert("Success");
            let Itemcode = $(this).children().eq(0).text();

            for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
                if (defaultArrayToSecondItem[i].itemCode == Itemcode) {
                    defaultArrayToSecondItem.splice(i, 1);
                    $("#lableTotPrice").text("0");
                    $("#lableSubTotal").text("0");
                    getAllItemSetTableArray();
                }
            }
        } else {

        }

    });
});


    // $('#clickTable>tr').click(function () {
    //     alert("fdgr")
    //     // $("#CustomertxtID,#CustomertxtName,#CustomertxtAddress,#CustomertxtSalary").css("border", "2px solid blue");
    //     // let id = $(this).children().eq(0).text();
    //     // let name = $(this).children().eq(1).text();
    //     // let address = $(this).children().eq(2).text();
    //     // let salary = $(this).children().eq(3).text();
    //     //
    //     // $("#CustomertxtID").val(id);
    //     // $("#CustomertxtName").val(name);
    //     // $("#CustomertxtAddress").val(address);
    //     // $("#CustomertxtSalary").val(salary);
    //
    //
    // })
