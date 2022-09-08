// list product
function openMenu(evt, menuName)
{
    var i, tablinks, tabcontent;

    tabcontent = document.getElementsByClassName("tabcontent");
    for(i = 0; i < tabcontent.length; i++)
    {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for(i = 0; i < tablinks.length; i++)
    {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    document.getElementById(menuName).style.display = "block";
    evt.currentTarget.className += " active";
}
 document.getElementById("defaultOpen").click();


 
// dot


//  let slideIndex = 0;
//  showSlides();
// function showSlides()
// {
//     let i;
//     let slides = document.getElementsByClassName("mySlides");
//     for(i = 0; i < slides.length; i++)
//     {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if(slideIndex > slides.length) {
//         slideIndex = 1
//     }
//     slides[slideIndex-1].style.display = "block";

// }
 document.getElementById("defaultOpenn").click();


$(document).ready(function(){
  //remove item shopping cart
  $(".delete .fa-solid.fa-trash").click(function() {
    removeItem(this);
  });
  
  //click clear cart
    $(".clearcart").click(function() {
     clearCart(this);
    });

    // click icon menu
    $('#toggle-header-menu').click(function(){
        $('.header-menu ul').slideToggle();
    });

    //click outside
    $("#toggle-header-menu").click(function(e){
      $(".header-menu ul").show();
      e.stopPropagation();
    $(".header-menu ul").click(function(e){
      e.stopPropagation();
    });
  
    $(document).click(function(){
      $(".header-menu ul").hide();
    });
    });

    //click outside
    $("#shopping").click(function(e){
      $(".shopping-cart").show();
        e.stopPropagation();
        $(".shopping-cart").click(function(e){
          e.stopPropagation();
      });
      $(document).click(function(){
          $(".shopping-cart").hide();
        });
      });

    //click icon shopping
    // $('.fa-basket-shopping').click(function(){
    //   $('.shopping-cart').slideToggle();
    // });

    // click icon search
    $(".fa-magnifying-glass").click(function showSearch() {
        $(".header-icon").addClass('show-search');
    });
    $(document).click(function (e)
    {
        var container = $('li.iconhd.search');
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.header-icon').removeClass('show-search');
        }
    });
 });



// add to cart

class cartItem{
   constructor(name, img, price){
     this.name = name;
     this.img = img;
     this.price = price;
     this.quantity = 1;
}
}


if(document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded', ready);
}
else{
  ready();
}

function ready(){
  
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  console.log(removeCartItemButtons);

  for(var i = 0; i < removeCartItemButtons.length; i++)
  {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem)
         
  }
  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('add-cart');
  for(var i =0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked)
    
  }  
}

function addItemToCart(title, price, imageSrc, id){
  var cartRow = document.createElement('div');
 cartRow.innerText = title; 
  //cartRow.classList.add('cart-row');
  var cartItems = document.querySelectorAll('.cart-items');
  let countItem = 0;

  for(var i = 0; i < cartItems.length; i++){
    var product = document.querySelectorAll('.cart-item-title');
    if(product[i].innerHTML == title){
      countItem++;
    }
  }
  if(countItem > 0){
    let itemNumber = document.getElementById(title).getAttribute('value');
    itemNumber++;
    document.getElementById(title).setAttribute('value', itemNumber);
  }
  else{
    var cartRowContents = `
    <div class="cart-item cart-column" data-id ="${id}">
      <img class="cart-item-image" src= "${imageSrc}" width="100" height="100">
      <span id = "${title}" class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <a href="#" class="minus ">-</a>
        <input id = "${title}" class = "cart-quantity-input" type = "text" value = "1">
        <a href="#" class="plus ">+</a>
      
      <button class="btn btn-danger" type="button"><i class="fa-solid fa-trash"></i></button>
    </div>
  `
  cartRow.innerHTML = cartRowContents;
  var cartI = document.querySelector('cart-items');
  cartI.append(cartRow);
  
  }
  updateCartTotal();
  removeCartItem();
  
  
  // var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  // for(var i = 0; i < cartItemNames.length; i++)
  // {
  //   if(cartItemNames[i].innerText == title){
  //     alert("This item is already added to the cart");
  //     return;
  //   }
    
  // }

  
  
}

function removeCartItem(event){
  var buttonClicked = event.target;
  console.log(buttonClicked.parentElement.parentElement.parentElement);
  buttonClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
}


function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }

  updateCartTotal();
}

function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;


  for(var i = 0; i < cartRows.length; i ++){
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
    
}

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total + '.00';
  document.getElementsByClassName('item-numb')[0].textContent = i /= 1;
  
}
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  var id = shopItem.getAttribute('data-id');
  var title = shopItem.getElementsByClassName('name')[0].innerText;
  var price = shopItem.getElementsByClassName('price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('product-item-img')[0].src;
  
  addItemToCart(title, price, imageSrc, id);
  console.log(id);
  updateCartTotal();

}
  
  
  $('.cart-items').on('click', '.minus',function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    updateCartTotal();
    return false;
  });
  $('.cart-items').on('click', '.plus',function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    updateCartTotal();
    return false;
  });

  //click icon shopping cart
  const cartIcon = document.querySelector('.fa-basket-shopping');
  const wholeCartWindow = document.querySelector('.shopping-cart');
  wholeCartWindow.inWindow = 0;
  cartIcon.addEventListener('mouseover', ()=>{
    if(wholeCartWindow.classList.contains('hide')){
      wholeCartWindow.classList.remove('hide');
    }
  
  });
  cartIcon.addEventListener('mouseleave', ()=>{
    setTimeout( () =>{
      if(wholeCartWindow.inWindow===0){
          wholeCartWindow.classList.add('hide')
      }
  } ,500 )
  
  });
  cartIcon.addEventListener('mouseover', ()=>{
    wholeCartWindow.inWindow = 1;
  
  });
  wholeCartWindow.addEventListener('mouseleave', ()=>{
    wholeCartWindow.inWindow = 0;
    wholeCartWindow.classList.add('hide');
  }) 



// class cartItem{
//   constructor(name, img, price){
//     this.name = name;
//     this.img = img;
//     this.price = price;
//     this.quantity = 1;
//   }
// }
// class localCart{
//   static key = 'cartItems';

//   static getLocalCartItems(){
//     let cartMap = new Map();
//     const cart = localStorage.getItem(localCart.key);
//     if(cart === null || cart.length === 0)
//       return cartMap;
//       return new Map(Object.entries(JSON.parse(cart)))
    
//   }
//   static addItemToCart(id, item){
    
  //   let cart = localCart.getLocalCartItems();
  //   if(cart.has(id)){
  //     let mapItem = cart.get(id);
  //     mapItem.quantity += 1;
  //     cart.set(id, mapItem);
  //   }
  //   else
  //     cart.set(id, item)
  //     localStorage.setItem(localCart.key, JSON.stringify(Object.fromEntries(cart)));
  //   updateCartUI();
    
  // }
//   static removeItemFromCart(id){
//     let cart = localCart.getLocalCartItems();
//     if(cart.has(id)){
//       let mapItem = cart.get(id);
//       if(mapItem.quantity > 1)
//       {
//         mapItem -= 1;
//         cart.set(id, mapItem);
//       }
//       else
//         cart.delete(id);      
//     }
//     if(cart.length === 0)
//       localStorage.clear();
    
//     else
//       localStorage.setItem(localCart.key, JSON.stringify(Object.fromEntries(cart)));
      
//     updateCartUI();
//   }
  
// }


// const cartIcon = document.querySelector('.fa-basket-shopping');
// const wholeCartWindow = document.querySelector('.shopping-cart');
// wholeCartWindow.inWindow = 0;
// //const addToCartButtons = document.querySelectorAll('.add-cart');
// // addToCartButtons.forEach( (btn) => {
// //   btn.addEventListener('click', addItemFunction)
// // });
// var addToCartButtons = document.getElementsByClassName('add-cart');
//    for(var i =0; i < addToCartButtons.length; i++){
//      var button = addToCartButtons[i];
//      button.addEventListener('click', addItemFunction);
//    }

// function addItemFunction(e){
//   const id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-id');
//   const img = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('product-item-img')[0].src;
//   const name = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('name')[0].innerText;
//   let price = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('price')[0].innerText;
//   //price = price.replace('$', '',);
//   const item = new cartItem(name, img, price);
//   localCart.addItemToCart(id, item);
  
// }



// function updateCartUI(){
  
//   const cartWrapper = document.querySelector('.cart-items');
//   cartWrapper.innerHTML = "";
//   const items = localCart.getLocalCartItems();
//   if(items === null)
//   return
//   let count = 0;
//   let total = 0;
//   for(const [key, value] of items.entries()){
//     const cartItem = document.createElement('div')
//     cartItem.classList.add('cart-item')
//     let price = value.price*value.quantity;
//     price = Math.round(price*100)/100;
//     count += 1;
//     total += price;
//     total = Math.round(total*100)/100;
//     cartItem.innerHTML = `
    
//     <img class="cart-item-image" src= "${value.img}" width="100" height="100">
//     <span class="cart-item-title">${value.name}</span>
//     </div>
//     <span class="cart-price cart-column">$${price}.00</span>
//     <div class="cart-quantity cart-column">
//       <span class="quantity">${value.quantity}</span>
//     <button class="btn btn-danger" type="button"><i class="fa-solid fa-trash"></i></button>
  
//     `;
//     cartItem.lastElementChild.addEventListener('click', () => {
//       localCart.removeItemFromCart(key);
//     });
//     cartWrapper.append(cartItem);
//   }
//   if(count > 0){
//     cartIcon.classList.add('non-empty');
//     // let root = document.querySelector(':root');
//     // root.style.setPropety('--after-content', `"${count}"`);
//     const subtotal = document.querySelector('.cart-total-price');
//     subtotal.innerHTML = `Total: $${total}`;

//   }
//   else{
//     cartIcon.classList.remove('non-empty');
//   }

// }
// document.addEventListener('DOMContentLoaded', () => {updateCartUI()})

