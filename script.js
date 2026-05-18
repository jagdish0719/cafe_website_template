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

// MODAL

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

const closeModal =
document.querySelector(".close-modal");

const viewButtons =
document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

  button.addEventListener("click", (e) => {

    const card =
    e.target.closest(".product-card");

    modal.style.display = "flex";

    modalImg.src =
    card.querySelector("img").src;

    modalTitle.innerText =
    card.querySelector("h3").innerText;

    modalDesc.innerText =
    card.querySelector("p").innerText;

    modalPrice.innerText =
    card.querySelector("span").innerText;

  });

});

closeModal.addEventListener("click", () => {

  modal.style.display = "none";

});

// BUY NOW

const GOOGLE_FORM_LINK =
"https://docs.google.com/forms/d/e/1FAIpQLSdaoq5tbpd2vyQLFnLQh04pCuic83dKNoKOBZ61L2AYRYwc4w/viewform?usp=publish-editor";

const buyNowBtn =
document.getElementById("buyNowBtn");

buyNowBtn.addEventListener("click", () => {

  window.open(
    GOOGLE_FORM_LINK,
    "_blank"
  );

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
