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

let currentPrice = 0;

// OPEN MODAL

viewButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    const card =
    e.target.closest(".product-card");

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    // PRODUCT IMAGE

    modalImg.src =
    card.querySelector("img").src;

    // PRODUCT NAME

    modalTitle.innerText =
    card.querySelector("h3").innerText;

    // DESCRIPTION

    modalDesc.innerText =
    card.querySelector("p").innerText;

    // PRICE

    modalPrice.innerText =
    card.querySelector("span").innerText;

    // GET NUMBER PRICE

    currentPrice =
    parseInt(
      card.querySelector("span")
      .innerText.replace("₹","")
    );

    quantityInput.value = 1;

    totalPrice.innerText =
    currentPrice;

  });

});

// QUANTITY CALCULATION

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


// PLACE ORDER

const orderForm =
document.getElementById("orderForm");

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

  window.open(finalURL, "_blank");

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

// CONTACT FORM VALIDATION

const contactForm =
document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {

  const name =
  document.getElementById("name").value;

  const email =
  document.getElementById("email").value;

  const message =
  document.getElementById("message").value;

  if(
    name === "" ||
    email === "" ||
    message === ""
  ){

    e.preventDefault();

    alert("Please fill all fields");

  }

});
