
const Item_iD_Check = /^(I00-)[0-9]{3}$/;
const Item_desc_Check = /^[A-Za-z ]{2,}$/;
const Item_Price_Check = /^[0-9]{2,}([.][0-9]{2})?$/;
const Item_Quantity_Check = /^[0-9]{1,}$/;

let itemArray = new Array();
itemArray.push({field: $("#ItemtxtID"), regEx: Item_iD_Check});
itemArray.push({field: $("#ItemtxtDescription"), regEx: Item_desc_Check});
itemArray.push({field: $("#ItemtxtPrice"), regEx: Item_Price_Check});
itemArray.push({field: $("#ItemtxtQuantity"), regEx: Item_Quantity_Check});

function clearItemInputFields() {
    $("#ItemtxtID,#ItemtxtDescription,#ItemtxtPrice,#ItemtxtQuantity").val("");
    $("#ItemtxtID,#ItemtxtDescription,#ItemtxtPrice,#ItemtxtQuantity").css("border", "1px solid #ced4da");
    $("#ItemtxtID").focus();
    setBtnItem();
}

setBtnItem();

function setBtnItem() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnSaveItem").prop("disabled", false);
    } else {
        $("#btnSaveItem").prop("disabled", true);
    }

    let id = $("#ItemtxtID").val();
    if (searchItem(id) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }

}

$("#ItemtxtID,#ItemtxtDescription,#ItemtxtPrice,#ItemtxtQuantity").on("keydown keyup", function (e) {
    let indexNo = itemArray.indexOf(itemArray.find((c) => c.field.attr("code") == e.target.code));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(itemArray[indexNo]);

    setBtnItem();

    if (e.key == "Enter") {

        if (e.target.id != itemArray[itemArray.length - 1].field.attr("code")) {
            if (checkValidations(itemArray[indexNo])) {
                itemArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(itemArray[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "2px solid white");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "2px solid white");
        }
    }

}

function checkAllItem() {
    for (let i = 0; i < itemArray.length; i++) {
        if (!checkValidations(itemArray[i])) return false;
    }
    return true;
}




