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
  

    // click icon menu
    $('#toggle-header-menu').click(function(){
        $('.header-menu ul').slideToggle();
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

let products = [
  {
    img: './images/maytap.png',
    name: 'Body Champ Cardio',
    price: 342,
    inCart: 0
  },
  {
    img: './images/maytap1.png',
    name: 'Body Solid GCEC340',
    price: 214,
    inCart: 0
  },
  {
    img: './images/maytap2.png',
    name: 'Bowflex BXE116 Elliptical',
    price: 421,
    inCart: 0
  },
  {
    img: './images/maytap3.png',
    name: 'ETHOS GHD',
    price: 152,
    inCart: 0
  },
  {
    img: './images/maytap4.png',
    name: 'AFG Pro 7.2AI Incline',
    price: 252,
    inCart: 0
  },
  {
    img: './images/maytap5.png',
    name: 'Weight Bench',
    price: 412,
    inCart: 0
  },
  {
    img: './images/maytap6.png',
    name: 'ProForm Hiit Trainer Lite 5.9',
    price: 300,
    inCart: 0
  },
  {
    img: './images/maytap7.png',
    name: 'Fitness Gear Pro',
    price: 124,
    inCart: 0
  }
]

let carts = document.querySelectorAll('.add-cart');
for(let i = 0; i< carts.length;i++)
{
  carts[i].addEventListener('click', () =>{

    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.item-numb').textContent = productNumbers;
  }
}

function cartNumbers(product){
  
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if(productNumbers)
  {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.item-numb').textContent = productNumbers + 1;

  }
  else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.item-numb').textContent = 1;
  }
 setItems(product);
  
}


function setItems(product)
{
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if(cartItems != null)
  {
    if(cartItems[product.name] === undefined){
      cartItems = {
        ...cartItems,
        [product.name]: product
      }
    }
    
    cartItems[product.name].inCart += 1;
  }
  else{
    product.inCart = 1;
    cartItems = {
      [product.name]: product
    }
  }

  
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));

}

function totalCost(product){
  let cartCost = localStorage.getItem("totalCost");

  if(cartCost != null)
  {
    cartCost.parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  }
  else{
    localStorage.setItem('totalCost', product.price);
  }
}

function displayCart(){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector('.shopping-cart');
  let cartCost = localStorage.getItem('totalCost');

  if(cartItems && productContainer){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class = "item-cart">
          <div class = "img-cart">
            <img src=${item.img} alt="">
          </div>
          <div class = "name-pr">
            <span>${item.name}</span>
            <span>$${item.price}.00</span>
          </div>
          
          <div class = "quantity">
          <ion-icon name="caret-back-circle-outline"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="caret-forward-circle-outline"></ion-icon>
          </div>
          <div class = "total">
            $${item.inCart * item.price}.00
          </div>
          <div class = "delete">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      ` ;

    });
    productContainer.innerHTML += `
    <div class = "basketTotalContainer">
      <h4 class = "basketTotalTitle">Basket Total:</h4>
      <h4 class = "basketTotal">$${cartCost}0.00</h4>
    </div>
      
  `;
  }
}
function removeItem(item) {
  $($(item).closest(".item-cart")).fadeOut(400, function() {
    $(this).remove();
  });
}

onLoadCartNumbers();
displayCart();




