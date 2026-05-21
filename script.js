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

const closeModal =
document.querySelector(".close-modal");

const viewButtons =
document.querySelectorAll(".view-btn");

const orderForm =
document.getElementById("orderForm");

let currentPrice = 0;


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

quantityInput.addEventListener("input", () => {

  const quantity =
  parseInt(quantityInput.value);

  totalPrice.innerText =
  currentPrice * quantity;

});


// CLOSE MODAL

closeModal.addEventListener("click", () => {

  modal.style.display = "none";

  document.body.style.overflow = "auto";

});


/// PLACE ORDER

orderForm.addEventListener("submit", function(e){

  e.preventDefault();

  const customerName =
  document.getElementById("customerName").value;

  const customerPhone =
  document.getElementById("customerPhone").value;

  const customerAddress =
  document.getElementById("customerAddress").value;

  const paymentMethod =
  document.getElementById("paymentMethod").value;

  const quantity =
  document.getElementById("quantity").value;

  const productName =
  modalTitle.innerText;

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

  window.open(finalURL, "_blank");


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

    const reviewName = params.name;

    const reviewMessage = params.message;


    // REVIEW OBJECT

    const newReview = {

      name: reviewName,
      message: reviewMessage

    };


    // GET OLD REVIEWS

    const savedReviews =
    JSON.parse(
      localStorage.getItem("reviews")
    ) || [];


    // ADD NEW REVIEW

    savedReviews.unshift(newReview);


    // SAVE AGAIN

    localStorage.setItem(

      "reviews",
      JSON.stringify(savedReviews)

    );


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


  // MESSAGE

  const p =
  document.createElement("p");

  p.innerText = review.message;


  // NAME

  const h4 =
  document.createElement("h4");

  h4.innerText = `- ${review.name}`;


  // APPEND

  reviewCard.appendChild(p);

  reviewCard.appendChild(h4);


  // SHOW TOP

  reviewGrid.prepend(reviewCard);

}


// LOAD SAVED REVIEWS

window.addEventListener("DOMContentLoaded", () => {

  const savedReviews =
  JSON.parse(
    localStorage.getItem("reviews")
  ) || [];


  savedReviews.reverse().forEach(review => {

    addReviewToUI(review);

  });

});
