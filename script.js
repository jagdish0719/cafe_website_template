// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


// PRODUCT FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {

      if(filter === "all" || card.dataset.category === filter){
        card.style.display = "block";
      }
      else{
        card.style.display = "none";
      }

    });

  });

});


// CONTACT FORM

const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  alert("Message Sent Successfully!");

  form.reset();

});


// ORDER BUTTONS

const orderButtons = document.querySelectorAll(".card button");

orderButtons.forEach(button => {

  button.addEventListener("click", () => {

    alert("Order Added Successfully!");

  });

});