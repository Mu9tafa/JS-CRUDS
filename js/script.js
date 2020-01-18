
var currentProduct = 0;
var searchRow = document.getElementById("searchRow");
var searchInp = document.getElementById("searchInp");
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCompany = document.getElementById("productCompany");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var rowdata = document.getElementById("rowdata");
var products;

if(localStorage.getItem("products") == null) {
    products = [];
} else {
    products = JSON.parse(localStorage.getItem("products"));
    displayData();
}

searchInp.onkeyup = function() {
    search(searchInp.value);
}

function search(term) {
    var searchCols = "";
    for(var i = 0; i<products.length; i++) {
        if(products[i].name.includes(term) && term != "") {
            searchCols +=`<div class="col-md-3 py-3">
                                <div class="product">
                                    <h3>`+products[i].name+`</h3>
                                    <p>`+products[i].description+`</p>
                                    <p class="text-danger">`+products[i].price+`</p>
                                    <p class="text-info">`+products[i].company+`</p>
                                </div>
                            </div>`;
        searchRow.innerHTML = searchCols;
        } 
    }
}

addBtn.onclick = function() {
   if(addBtn.innerHTML == "Add Product") {
    addProduct();
    displayData();
    clearForm();
   } else {
    update();
    displayData();
    clearForm();
   }
}


function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        company: productCompany.value,
        description: productDescription.value
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    
}

function displayData() {
    var text = "";
    for (var i = 0; i < products.length; i++) {
        text +=`<div class="col-md-3 py-3">
                    <div class="product text-break">
                        <h3>`+products[i].name+`</h3>
                        <p>`+products[i].description+`</p>
                        <p class="text-danger">`+products[i].price+`</p>
                        <p class="text-info">`+products[i].company+`</p>
                        <button class="btn btn-danger" onclick="deleteProduct(`+i+`)">Delete</button>
                        <button class="btn btn-info" onclick="setForm(`+i+`)">Update</button> 
                    </div>
                </div>`;
    }
    rowdata.innerHTML = text;
}
function setForm(i) {
    productName.value = products[i].name;
    productPrice.value = products[i].price;
    productCompany.value = products[i].company;
    productDescription.value = products[i].description;
    addBtn.innerHTML = "Update" ;
    currentProduct = i;
}

function update() {
    products[currentProduct].name = productName.value;
    products[currentProduct].price = productPrice.value;
    products[currentProduct].company = productCompany.value;
    products[currentProduct].description = productDescription.value;
    localStorage.setItem("products", JSON.stringify(products));
    addBtn.innerHTML = "Add Product";
}

function clearForm() {
    var inputs = document.getElementsByClassName("form-control");
    for(var i=0; i<inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteProduct(id) {
    products.splice(id, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayData();
} 