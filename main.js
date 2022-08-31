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

    // click icon shopping
    $('.fa-basket-shopping').click(function(){
      $('.shopping-cart').slideToggle();
    });

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

const products = [
  { 
    id: 0,
    img: './images/maytap.png',
    name: 'Body Champ Cardio',
    price: 342,
    inCart: 0
  },
  {
    id: 1,
    img: './images/maytap1.png',
    name: 'Body Solid GCEC340',
    price: 214,
    inCart: 0
  },
  {
    id: 2,
    img: './images/maytap2.png',
    name: 'Bowflex BXE116 Elliptical',
    price: 421,
    inCart: 0
  },
  {
    id: 3,
    img: './images/maytap3.png',
    name: 'ETHOS GHD',
    price: 152,
    inCart: 0

  },
  {
    id: 4,
    img: './images/maytap4.png',
    name: 'AFG Pro 7.2AI Incline',
    price: 252,
    inCart: 0
  },
  {
    id: 5,
    img: './images/maytap5.png',
    name: 'Weight Bench',
    price: 412,
    inCart: 0
  },
  {
    id: 6,
    img: './images/maytap6.png',
    name: 'ProForm Hiit Trainer Lite 5.9',
    price: 300,
    inCart: 0
  },
  {
    id: 7,
    img: './images/maytap7.png',
    name: 'Fitness Gear Pro',
    price: 124,
    inCart: 0
  }
];



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

function addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('div');
  cartRow.innerText = title;
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0];

  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  var countItem = cartItems.getElementsByClassName('cart-quantity-input');
  for(var i = 0; i < cartItemNames.length; i++)
  {
    if(cartItemNames[i].innerText == title){
      // countItem += 1;
      // updateCartTotal();
      // console.log(countItem);
      alert("This item is already added to the cart");
      return;
    }
    
  }

  var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src= "${imageSrc}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
      
        <a href="#" class="minus ">-</a>
        <input class = "cart-quantity-input" type = "text" value = "1"/>
        <a href="#" class="plus ">+</a>
      
      <button class="btn btn-danger" type="button"><i class="fa-solid fa-trash"></i></button>
    </div>
  `
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged); 
  
}

//remove item
function removeCartItem(event){
  var buttonClicked = event.target;
  console.log(buttonClicked.parentElement.parentElement.parentElement);
  buttonClicked.parentElement.parentElement.parentElement.remove();
  updateCartTotal();
}

//quantity input item
function quantityChanged(event){
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updateCartTotal();
}

//add to cart
function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('name')[0].innerText
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('product-item-img')[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
  
  } 

  //Minus & plus
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


  //set count item



  //Total cart
function updateCartTotal(title){
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




