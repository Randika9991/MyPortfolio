//load all Item
getAllItem();

//Save Item
$("#btnSaveItem").click(function () {
    if (checkAllItem()){
        saveItem();
    }else{
        alert("Error");
    }
});

// Save Item
function saveItem() {
    let ItemId = $("#ItemtxtID").val();
    //check customer is exists or not?
    if (searchItem(ItemId.trim()) == undefined) {

        let ItemDescription = $("#ItemtxtDescription").val();
        let ItemPrice = $("#ItemtxtPrice").val();
        let ItemQuantity = $("#ItemtxtQuantity").val();

        let newItem = Object.assign({}, item);

        newItem.code = ItemId;
        newItem.description = ItemDescription;
        newItem.unitPrice = ItemPrice;
        newItem.qtyOnHand = ItemQuantity;

        itemDB.push(newItem);
        clearItemInputFields();
        getAllItem();

    } else {
        alert("Item already exits.!");
        clearItemInputFields();
    }
}

//delete Item
$("#btnItemDelete").click(function () {
    let id = $("#ItemtxtID").val();

    let consent = confirm("Do you want to delete.?");
    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Item Deleted");
            // clearItemInputFields();
            getAllItem();
        } else {
            alert("Item Not Removed..!");
        }
    }
});

function deleteItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == id) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false;
}


//update  Item
$("#btnItemUpdate").click(function () {
    let code = $("#ItemtxtID").val();
    updateItem(code);
    clearItemInputFields();
});

//clear textField
$("#btnItemClear").click(function () {
    clearItemInputFields();

});

function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No Item find..please check the Code");
    } else {
        let consent = confirm("Do you really want to update this Item.?");
        if (consent) {
            let item = searchItem(code);

            let ItemDescription = $("#ItemtxtDescription").val();
            let ItemPrice = $("#ItemtxtPrice").val();
            let ItemQuantity = $("#ItemtxtQuantity").val();

            item.description = ItemDescription;
            item.unitPrice = ItemPrice;
            item.qtyOnHand = ItemQuantity;

            getAllItem();
        }
    }
}

//click table .shire value textField
function bindTrEvents() {

    $('#ItemTbl>tr').click(function () {
        $("#ItemtxtID,#ItemtxtDescription,#ItemtxtPrice,#ItemtxtQuantity").css("border", "2px solid blue");
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();

        $("#ItemtxtID").val(id);
        $("#ItemtxtDescription").val(name);
        $("#ItemtxtPrice").val(address);
        $("#ItemtxtQuantity").val(salary);

    })
}


function getAllItem() {
    $("#ItemTbl").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let itemCode = itemDB[i].code;
        let itemDescription = itemDB[i].description;
        let itemPrice = itemDB[i].unitPrice;
        let itemQtyOnHand = itemDB[i].qtyOnHand;

        let row = `<tr>
                     <td>${itemCode}</td>
                     <td>${itemDescription}</td>
                     <td>${itemPrice}</td>
                     <td>${itemQtyOnHand}</td>
                    </tr>`;

        $("#ItemTbl").append(row);
        bindTrEvents();
    }
}



