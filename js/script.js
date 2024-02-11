// Slider
document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttons = carousel.querySelectorAll(".carousel__button");
  let currentIndex = 0;

  function showSlide(index) {
      items.forEach((item, i) => {
          item.classList.toggle("carousel__item--selected", i === index);
          buttons[i].classList.toggle("carousel__button--selected", i === index);
      });
  }

  function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
  }

  function prevSlide() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showSlide(currentIndex);
  }

  buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
          currentIndex = i;
          showSlide(currentIndex);
      });
  });

  setInterval(() => {
      nextSlide();
  }, 2000);

  // Show the first slide initially
  showSlide(currentIndex);
});

// arrow
window.onscroll = function(){
    scrollFunction();
    // scrollForImage();
}

function scrollFunction(){
    if(document.body.scrollTop >80 || document.documentElement.scrollTop>80)
    {
        document.getElementsByClassName("nav")[0].style.opacity = '0.9';
        document.getElementById("arrow").style.display = 'block';
    }else{
        document.getElementsByClassName("nav")[0].style.opacity = '1';
        document.getElementById("arrow").style.display = 'none';

    }
}

// navbar
var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {
    
    
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
    
};

// scroll reveal
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);

//   Book a table form

var inputName = document.getElementById("inputName");
var inputPhone = document.getElementById("inputPhone");
var inputArrival = document.getElementById("inputArrival");
var inputPeople = document.getElementById("inputPeople");
var inputDate = document.getElementById("inputDate");

var nameError = document.getElementById("nameError");
var phoneError = document.getElementById("phoneError");
var phoneErrorValid = document.getElementById("phoneErrorValid");
var arrivalError = document.getElementById("arrivalError");
var peopleError = document.getElementById("peopleError");
var dateError = document.getElementById("dateError");

var submitBtn = document.getElementById("submitBtn");

var messages    = document.getElementsByClassName("errorMessage");

submitBtn.addEventListener("click", myFunction);

function myFunction() {
    if (inputName.value === "") {
        nameError.classList.remove("hide");
    } else {
        nameError.classList.add("hide");
    }

    if (inputPhone.value === "") {
        phoneError.classList.remove("hide");
    } else {
        phoneError.classList.add("hide");
    }

    if (inputPhone.value.length !== 11 || isNaN(inputPhone.value)) {
        phoneErrorValid.classList.remove("hide");
    } else {
        phoneErrorValid.classList.add("hide");
    }

    if (inputArrival.value === "Arrival Time") {
        arrivalError.classList.remove("hide");
    } else {
        arrivalError.classList.add("hide");
    }
    
    if (inputPeople.value === "People") {
        peopleError.classList.remove("hide");
    } else {
        peopleError.classList.add("hide");
    }
    
    if (!inputDate.value) {
        dateError.classList.remove("hide");
    } else {
        dateError.classList.add("hide");
    }
}

