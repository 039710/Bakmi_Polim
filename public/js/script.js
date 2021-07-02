let colImg = document.querySelector("#productCartImgBody");
let colInfo = document.querySelector("#productCartInfoBody");
let colBtnDel = document.querySelector("#productCartBtnDelBody");
let cartItem = localStorage.getItem('cartItems')
let buttonCheckout = document.getElementById('btn-checkout')
let userId = document.getElementById('userId').firstChild.nextElementSibling
if(userId == null){
    userId = 0
}else{
    userId = document.getElementById('userId').firstChild.nextElementSibling.id
}
console.log(document.getElementById('userId'))
console.log(userId,'user id')
console.log(typeof userId)
console.log(cartItem)
if(cartItem == null || ""){
    cartItem = []
    console.log(cartItem)
}else{
    cartItem = JSON.parse(cartItem)
}
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
        <p class="product-cart-qty">Qty: ${data.wantToBuy}</p>`;
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
    let wantToBuy = document.getElementById('purchasedQuantityId'+id).value;
    console.log('jumlah yg ingin di beli',wantToBuy)
    fetch("/food/foodData/"+id)
    .then(response => response.json())
    .then((data)=>{
        data.wantToBuy = wantToBuy
        if(data.quantity > wantToBuy && wantToBuy > 0){
            colCartImg.innerHTML = `<img src="${data.img_url}" alt="" style="width: 120px; height: 70px;">`;
            colCartInfo.innerHTML = `<h5 class="product-cart-name font-weight-bold" style="margin-bottom: 0;">${data.name}</h5>
            <p class="product-cart-price" style="margin-bottom: 0;">IDR ${data.price}</p>
            <p class="product-cart-qty">Qty: ${data.wantToBuy}</p>`;
            colBtnDelete.innerHTML = `<button id="btn-delete" class="btn btn-danger" onClick="delInCart(this,${data.id})">&times;</button>`;
            cartItem.push(data)
            localStorage.setItem(`cartItems`, JSON.stringify(cartItem));
        }else{
            alert('Cant buy more than stock!!!')
            window.location.href = '/';
        }
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

buttonCheckout.addEventListener('click', () =>{
    if(cartItem.length>0){
        cartItem = cartItem.forEach((item)=>{
            buyFood(item.id,item.wantToBuy)
        })
    }else{
        alert('Cant checkout with empty cart!')
        window.location.href = '/';
    }
})

const buyFood =  (itemId,wantToBuy) =>{
    console.log(userId)
    if(userId != '0'){
        fetch('/food/'+itemId+'/buy/'+wantToBuy+'/'+userId)
        .then((data)=>{
            console.log(data)
            console.log('sukses')
            // window.location.href = `/user/invoice/${userId}`
            alert('Success!')
        })
        .catch(err => {
            console.log(err)
        })
    }else{
        alert('You need to log in first')
        window.location.href = '/';
    }
}
