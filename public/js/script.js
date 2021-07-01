let colImg = document.querySelector("#productCartImgBody");
let colInfo = document.querySelector("#productCartInfoBody");
let colBtnDel = document.querySelector("#productCartBtnDelBody");
let cartItem = localStorage.getItem('cartItems')
let btnCheckout = document.getElementById('btn-checkout')
cartItem = JSON.parse(cartItem)
function generateCart(cartItem){
    
    console.log(cartItem.length)
    for(let i = 0; i <cartItem.length; i++){
        let data = cartItem[i]
        let tableBody = document.querySelector("#cartTable").getElementsByTagName(`tbody`)[0];
        let row = tableBody.insertRow();
        let colBtnDelete = row.insertCell(colBtnDel);
        let colCartInfo = row.insertCell(colInfo);
        let colCartImg = row.insertCell(colImg);
        colCartImg.innerHTML = `<img src="${data.img_url}" alt="" style="width: 120px; height: 70px;">`;
        colCartInfo.innerHTML = `<h5 class="product-cart-name font-weight-bold" style="margin-bottom: 0;">${data.name}</h5>
        <p class="product-cart-price" style="margin-bottom: 0;">IDR ${data.price}</p>
        <p class="product-cart-qty">Qty: 1</p>`;
        colBtnDelete.innerHTML = `<button id="btn-delete" class="btn btn-danger" onClick="delInCart(this,${data.id})">&times;</button>`;
    }
}

generateCart(cartItem)
function addToCart(id) {
    let tableBody = document.querySelector("#cartTable").getElementsByTagName(`tbody`)[0];
    let row = tableBody.insertRow();
    let colBtnDelete = row.insertCell(colBtnDel);
    let colCartInfo = row.insertCell(colInfo);
    let colCartImg = row.insertCell(colImg);
    
    fetch("/food/foodData/"+id)
    .then(response => response.json())
    .then((data)=>{
        console.log(data)
        colCartImg.innerHTML = `<img src="${data.img_url}" alt="" style="width: 120px; height: 70px;">`;
        colCartInfo.innerHTML = `<h5 class="product-cart-name font-weight-bold" style="margin-bottom: 0;">${data.name}</h5>
        <p class="product-cart-price" style="margin-bottom: 0;">IDR ${data.price}</p>
        <p class="product-cart-qty">Qty: 1</p>`;
        colBtnDelete.innerHTML = `<button id="btn-delete" class="btn btn-danger" onClick="delInCart(this,${data.id})">&times;</button>`;
        cartItem.push(data)
        localStorage.setItem(`cartItems`, JSON.stringify(cartItem));
    })
    .catch(err => console.log(err))
}

function delInCart(row,id) {
    let i = row.parentNode.parentNode.rowIndex;
    cartItem = cartItem.filter((item) =>{
        if(item.id != id){
            console.log('masukkk')
            return item
        }
    })
    localStorage.setItem(`cartItems`, JSON.stringify(cartItem))
    document.getElementById("cartTable").deleteRow(i);
}


btnCheckout.addEventListener('click', () =>{
    cartItem.forEach((item)=>{
        console.log(item.id)
    })
})