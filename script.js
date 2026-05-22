// LOADER

window.addEventListener("load", () => {

  document.getElementById("loader")
  .style.display = "none";

});


// MOBILE MENU

const menuBtn =
document.getElementById("menuBtn");

const navLinks =
document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});


// STICKY NAVBAR

const header =
document.getElementById("header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    header.classList.add("sticky");

  }

  else{

    header.classList.remove("sticky");

  }

});


// DARK MODE

const themeToggle =
document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});


// PRODUCT FILTER

const filterButtons =
document.querySelectorAll(".filter-btn");

const productCards =
document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {

      btn.classList.remove("active");

    });

    button.classList.add("active");

    const filter =
    button.dataset.filter;

    productCards.forEach(card => {

      if(

        filter === "all" ||
        card.dataset.category === filter

      ){

        card.style.display = "block";

      }

      else{

        card.style.display = "none";

      }

    });

  });

});


// SEARCH

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

  const value =
  searchInput.value.toLowerCase();

  productCards.forEach(card => {

    const name =
    card.dataset.name.toLowerCase();

    if(name.includes(value)){

      card.style.display = "block";

    }

    else{

      card.style.display = "none";

    }

  });

});


// PRODUCT MODAL

const modal =
document.getElementById("productModal");

const modalImg =
document.getElementById("modalImg");

const modalTitle =
document.getElementById("modalTitle");

const modalDesc =
document.getElementById("modalDesc");

const modalPrice =
document.getElementById("modalPrice");

const totalPrice =
document.getElementById("totalPrice");

const quantityInput =
document.getElementById("quantity");

// QUANTITY BUTTONS

const plusBtn =
document.getElementById("plusBtn");

const minusBtn =
document.getElementById("minusBtn");


// SAVED ADDRESS

const savedAddress =
document.getElementById("savedAddress");

const saveAddressBtn =
document.getElementById("saveAddressBtn");

const closeModal =
document.querySelector(".close-modal");

const viewButtons =
document.querySelectorAll(".view-btn");

const orderForm =
document.getElementById("orderForm");

let currentPrice = 0;

let cartMode = false;

let cartSummary = "";


// PHONE NUMBER VALIDATION

const customerPhoneInput =
document.getElementById("customerPhone");

customerPhoneInput.addEventListener("input", () => {

  customerPhoneInput.value =
  customerPhoneInput.value.replace(/\D/g, "");

});


// NAME VALIDATION

const customerNameInput =
document.getElementById("customerName");

customerNameInput.addEventListener("input", () => {

  customerNameInput.value =
  customerNameInput.value.replace(/[^A-Za-z\s]/g, "");

});


// OPEN MODAL

viewButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    const card =
    e.target.closest(".product-card");

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";


    // IMAGE

    modalImg.src =
    card.querySelector("img").src;


    // TITLE

    modalTitle.innerText =
    card.querySelector("h3").innerText;

    cartMode = false;


    // DESCRIPTION

    modalDesc.innerText =
    card.querySelector("p").innerText;


    // PRICE

    modalPrice.innerText =
    card.querySelector("span").innerText;


    // NUMBER PRICE

    currentPrice =
    parseInt(

      card.querySelector("span")
      .innerText.replace("₹","")

    );


    // RESET QUANTITY

    quantityInput.value = 1;

    totalPrice.innerText =
    currentPrice;

  });

});


// QUANTITY UPDATE

plusBtn.addEventListener("click", () => {

  // CART MODE

  if(cartMode){

    return;

  }

  quantityInput.value++;

  totalPrice.innerText =
  currentPrice * quantityInput.value;

});


minusBtn.addEventListener("click", () => {

  // CART MODE

  if(cartMode){

    return;

  }

  if(quantityInput.value > 1){

    quantityInput.value--;

    totalPrice.innerText =
    currentPrice * quantityInput.value;

  }

});


// CLOSE MODAL

closeModal.addEventListener("click", () => {

  modal.style.display = "none";

  document.body.style.overflow = "auto";

});

// LOAD SAVED ADDRESSES

const savedAddresses =
JSON.parse(

  localStorage.getItem("savedAddresses")

) || [];


// SHOW ADDRESSES

savedAddresses.forEach(address => {

  const option =
  document.createElement("option");

  option.value = address;

  option.textContent = address;

  savedAddress.appendChild(option);

});


// SAVE ADDRESS

saveAddressBtn.addEventListener("click", () => {

  const address =
  document.getElementById("customerAddress").value;

  if(address === ""){

    alert("Enter address first");

    return;

  }

  if(!savedAddresses.includes(address)){

    savedAddresses.push(address);

    localStorage.setItem(

      "savedAddresses",
      JSON.stringify(savedAddresses)

    );

    const option =
    document.createElement("option");

    option.value = address;

    option.textContent = address;

    savedAddress.appendChild(option);

    alert("Address Saved");

  }

});


// SELECT SAVED ADDRESS

savedAddress.addEventListener("change", () => {

  document.getElementById("customerAddress").value =
  savedAddress.value;

});

// PLACE ORDER

orderForm.addEventListener("submit", function(e){

  e.preventDefault();

  const customerName =
  document.getElementById("customerName").value;

  const customerPhone =
  document.getElementById("customerPhone").value;

  const customerEmail =
document.getElementById("customerEmail").value;

  const customerAddress =
  document.getElementById("customerAddress").value;

  // ADDRESS VALIDATION

const addressLower =
customerAddress.toLowerCase();


// CHENNAI SERVICE CHECK

const allowedLocations = [

  "chennai",
  "tambaram",
  "pallavaram",
  "chromepet",
  "guindy",
  "velachery",
  "medavakkam",
  "porur",
  "anna nagar",
  "adyar",
  "thoraipakkam",
  "sholinganallur",
  "navalur",
  "omr",
  "ecr"

];

const serviceAvailable =
allowedLocations.some(location =>
  addressLower.includes(location)
);


// CHENNAI PINCODE CHECK

const pincodePattern = /\b600\d{3}\b/;


// LOCATION CHECK

if(!serviceAvailable){

  alert(
    "Sorry! Currently delivery available only in Chennai locations."
  );

  return;

}


// PINCODE CHECK

if(!pincodePattern.test(customerAddress)){

  alert(
    "Please enter valid Chennai pincode."
  );

  return;

}


  const paymentMethod =
  document.getElementById("paymentMethod").value;


  let productName;

let quantity;


if(cartMode){

  productName = cartSummary;

  quantity = "Multiple Items";

}

else{

  productName =
  modalTitle.innerText;

  quantity =
  document.getElementById("quantity").value;

}


  const total =
  totalPrice.innerText;

  const note =
  "Order from Brew Haven Cafe";


  // GOOGLE FORM URL

  const finalURL =
  "https://docs.google.com/forms/d/e/1FAIpQLScCnjk1CwdHKFQlMdO1_h6_zfIXQrVno88e9MWg_79W6oKpsA/viewform?usp=pp_url" +
  "&entry.561621210=" + encodeURIComponent(customerName) +
  "&entry.1470745620=" + encodeURIComponent(customerPhone) +
  "&entry.1635538381=" + encodeURIComponent(customerAddress) +
  "&entry.1417710667=" + encodeURIComponent(productName) +
  "&entry.91480752=" + encodeURIComponent(quantity) +
  "&entry.138321599=" + encodeURIComponent(total) +
  "&entry.1307424401=" + encodeURIComponent(paymentMethod) +
  "&entry.596967868=" + encodeURIComponent(note);


  // OPEN GOOGLE FORM

 const proceed = confirm(

  "Please complete your order submission in Google Form."

);

if(proceed){

  window.open(finalURL, "_blank");

}

 if(proceed){

  // OPEN GOOGLE FORM

  window.open(finalURL, "_blank");


  // SEND EMAIL

  emailjs.send(

    "service_cnsr9vs",

    "template_sydk313",

    {

      name: customerName,

      email: customerEmail,

      message:

`Your Brew Haven Cafe order has been received.

Order:
${productName}

Total:
₹${total}

Estimated Delivery:
30-45 Minutes`

    }

  );


}

  // CLEAR CART AFTER ORDER

cart = [];

updateCart();

cartSidebar.classList.remove("active");

cartMode = false;


  // CLOSE MODAL

  modal.style.display = "none";

  document.body.style.overflow = "auto";


  // RESET FORM

  orderForm.reset();


  // GO TO PRODUCTS SECTION

  document.getElementById("products")
  .scrollIntoView({

    behavior:"smooth"

  });

});

// CART SYSTEM

const cartSidebar =
document.getElementById("cartSidebar");

const cartToggle =
document.getElementById("cartToggle");

const closeCart =
document.getElementById("closeCart");

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

const cartButtons =
document.querySelectorAll(".cart-btn");

let cart = [];

const checkoutCartBtn =
document.getElementById("checkoutCartBtn");

function removeItem(index){

  cart.splice(index,1);

  updateCart();

}

// CHECKOUT CART

checkoutCartBtn.addEventListener("click", () => {

  if(cart.length === 0){

    alert("Cart is empty");

    return;

  }

  cartMode = true;

  plusBtn.style.display = "none";

minusBtn.style.display = "none";

quantityInput.style.display = "none";

  modal.style.display = "flex";

  plusBtn.style.display = "block";

minusBtn.style.display = "block";

quantityInput.style.display = "block";

  document.body.style.overflow = "hidden";

  cartSummary = "";

  let total = 0;

  cart.forEach(item => {

    cartSummary +=
    `${item.name} x${item.quantity}, `;

    total +=
    item.price * item.quantity;

  });

    "Cart Order";

  modalTitle.innerText =
"Cart Order";

modalDesc.innerText =
cartSummary;

modalPrice.innerText =
`₹${total}`;

totalPrice.innerText =
total;


// CART IMAGE

modalImg.src =
"https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop";


// IMPORTANT

currentPrice = total;


// RESET QUANTITY

quantityInput.value = 1;

  // RESET FIELDS

  document.getElementById("customerName").value = "";

  document.getElementById("customerPhone").value = "";

  document.getElementById("customerAddress").value = "";

});

// OPEN CART

cartToggle.addEventListener("click", () => {

  cartSidebar.classList.add("active");

});


// CLOSE CART

closeCart.addEventListener("click", () => {

  cartSidebar.classList.remove("active");

});


// ADD TO CART

cartButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    const card =
    e.target.closest(".product-card");

    const name =
    card.querySelector("h3").innerText;

    const price =
    parseInt(

      card.querySelector("span")
      .innerText.replace("₹","")

    );

    const existingItem =
    cart.find(item => item.name === name);


    if(existingItem){

      existingItem.quantity++;

    }

    else{

      cart.push({

        name:name,
        price:price,
        quantity:1

      });

    }

    updateCart();

  });

});


// UPDATE CART

function updateCart(){

  cartItems.innerHTML = "";

  let total = 0;


  cart.forEach((item,index) => {

    total += item.price * item.quantity;


    const div =
    document.createElement("div");

    div.classList.add("cart-item");


    div.innerHTML = `

      <h4>${item.name}</h4>

      <p>
        ₹${item.price}
      </p>

      <div class="cart-controls">

        <button onclick="decreaseQty(${index})">
          -
        </button>

        <span>${item.quantity}</span>

        <button onclick="increaseQty(${index})">
          +
        </button>

      </div>

      <button
      class="remove-btn"
      onclick="removeItem(${index})">

        Remove

      </button>

    `;

    cartItems.appendChild(div);

  });

  cartTotal.innerText = total;

  // CART COUNT

const totalItems =
cart.reduce((sum,item) => {

  return sum + item.quantity;

},0);

document.getElementById("cartCount")
.innerText = totalItems;

}


function updateCartModal(){

  if(!cartMode) return;

  // IF CART EMPTY

  if(cart.length === 0){

    modal.style.display = "none";

    document.body.style.overflow = "auto";

    cartMode = false;

    return;

  }

  cartSummary = "";

  let total = 0;

  cart.forEach(item => {

    cartSummary +=
    `${item.name} x${item.quantity}, `;

    total +=
    item.price * item.quantity;

  });

  modalDesc.innerText =
  cartSummary;

  modalPrice.innerText =
  `₹${total}`;

  totalPrice.innerText =
  total;

  currentPrice = total;

}

// INCREASE

function increaseQty(index){

  cart[index].quantity++;

  updateCart();

  updateCartModal();

}


// DECREASE

function decreaseQty(index){

  if(cart[index].quantity > 1){

    cart[index].quantity--;

  }

  else{

    cart.splice(index,1);

  }

  updateCart();

  updateCartModal();

}


// REMOVE ITEM

function removeItem(index){

  cart.splice(index,1);

  updateCart();

}

// SCROLL TOP

const scrollTopBtn =
document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

  if(window.scrollY > 300){

    scrollTopBtn.style.display = "block";

  }

  else{

    scrollTopBtn.style.display = "none";

  }

});


scrollTopBtn.addEventListener("click", () => {

  window.scrollTo({

    top:0,
    behavior:"smooth"

  });

});


// EMAILJS INITIALIZATION

emailjs.init("2ThJgRQS9Edkb-VlG");


// CONTACT FORM

const contactForm =
document.getElementById("contactForm");

// CONTACT FORM VALIDATIONS

const contactName =
document.getElementById("name");

const contactEmail =
document.getElementById("email");

const contactMessage =
document.getElementById("message");


// NAME ONLY LETTERS

contactName.addEventListener("input", () => {

  contactName.value =
  contactName.value.replace(/[^A-Za-z\s]/g, "");

  // MAX 40 LETTERS

  if(contactName.value.length > 40){

    contactName.value =
    contactName.value.slice(0, 40);

  }

});


// EMAIL ALLOW ALL VALID CHARACTERS

contactEmail.addEventListener("input", () => {

  // MAX 60 CHARACTERS

  if(contactEmail.value.length > 60){

    contactEmail.value =
    contactEmail.value.slice(0, 60);

  }

});


// MESSAGE ONLY LETTERS + SPACES

contactMessage.addEventListener("input", () => {

  contactMessage.value =
  contactMessage.value.replace(/[^A-Za-z\s]/g, "");

  // MAX 250 LETTERS

  if(contactMessage.value.length > 250){

    contactMessage.value =
    contactMessage.value.slice(0, 250);

  }

});


contactForm.addEventListener("submit", function(e){

  e.preventDefault();

  const params = {

    name:
    document.getElementById("name").value,

    email:
    document.getElementById("email").value,

    message:
    document.getElementById("message").value

  };


  // EMPTY CHECK

  if(

    params.name === "" ||
    params.email === "" ||
    params.message === ""

  ){

    alert("Please fill all fields");

    return;

  }


  // SEND EMAIL

  emailjs.send(

    "service_cnsr9vs",
    "template_bor383f",
    params

  )

  .then(function(response){

    alert("Message Sent Successfully!");

    console.log(response);


    // REVIEW DATA

    const reviewName =
    params.name;

    const reviewMessage =
    params.message;


    // REVIEW OBJECT

    const newReview = {

      name: reviewName,
      message: reviewMessage

    };


    // GET SAVED REVIEWS

    const savedReviews =
    JSON.parse(

      localStorage.getItem("reviews")

    ) || [];


    // ADD NEW REVIEW

    savedReviews.unshift(newReview);


    // SAVE AGAIN

    try{

  localStorage.setItem(

    "reviews",
    JSON.stringify(savedReviews)

  );

}

catch(error){

  console.log("LocalStorage not supported");

}


    // SHOW REVIEW

    addReviewToUI(newReview);


    // RESET FORM

    contactForm.reset();

  })

  .catch(function(error){

    alert("Failed To Send Message");

    console.log(error);

  });

});


// REVIEW GRID

const reviewGrid =
document.getElementById("reviewGrid");


// ADD REVIEW FUNCTION

function addReviewToUI(review){

  const reviewCard =
  document.createElement("div");

  reviewCard.classList.add("review-card");


  const p =
  document.createElement("p");

  p.innerText =
  review.message;


  const h4 =
  document.createElement("h4");

  h4.innerText =
  `- ${review.name}`;


  reviewCard.appendChild(p);

  reviewCard.appendChild(h4);


  reviewGrid.prepend(reviewCard);

}


// LOAD SAVED REVIEWS

window.addEventListener("DOMContentLoaded", () => {

let savedReviews = [];

try{

  savedReviews =
  JSON.parse(

    localStorage.getItem("reviews")

  ) || [];

}

catch(error){

  savedReviews = [];

}


  savedReviews.reverse().forEach(review => {

    addReviewToUI(review);

  });

});
