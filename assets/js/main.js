// AOS
AOS.init();

AOS.init({
  offset: 120,
  delay: 0,
  duration: 700,
  easing: 'ease',
  once: false,
  mirror: false, 
  anchorPlacement: 'top-bottom',
});

// SWIPER
let swiper = new Swiper('.swiper', {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// QUALIFICATIONS
const tabs = document.querySelectorAll("[data-target]"),
      tabContents = document.querySelectorAll("[data-content]");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach(tabContent => {
      tabContent.classList.remove("qualification-active");
    });
    target.classList.add("qualification-active");

    tabs.forEach(tab => {
      tab.classList.remove("qualification-active");
    });
    tab.classList.add("qualification-active");
  })
});

// POPOVER
const popoverTriggerElems = document.querySelectorAll('[data-bs-toggle="popover"]');

popoverTriggerElems.forEach(function (element) {
    new bootstrap.Popover(element);
});

// SEND FORM CONTACT
var form = document.getElementById("my-form");
var nameError = document.querySelector(".name-error");
var emailError = document.querySelector(".email-error");
var subjectError = document.querySelector(".subject-error");
var messageError = document.querySelector(".message-error");

function validationName(){
  var name = document.getElementById("name").value;

  if(name.length == 0){
    nameError.innerHTML = "name is required*";
    return false;
  }

  if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
    nameError.innerHTML = "write full name*";
    return false;
  }

  nameError.innerHTML = "<i class='lar la-check-circle text-brand'></i>";
  return true;
}

function validationEmail(){
  var email = document.getElementById("email").value;

  if(email.length == 0){
    emailError.innerHTML = "email is required*";
    return false;
  }

  if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
    emailError.innerHTML = "email is invalid*";
    return false;
  }

  emailError.innerHTML = "<i class='lar la-check-circle text-brand'></i>";
  return true;
}

function validationSubject(){
  var subject = document.getElementById("subject").value;

  if(subject.length == 0){
    subjectError.innerHTML = "subject is required*";
    return false;
  }

  if(subject.length < 5){
    subjectError.innerHTML = "min 5 character*";
    return false;
  }

  subjectError.innerHTML = "<i class='lar la-check-circle text-brand'></i>";
  return true;
}

function validateMessage(){
  var message = document.getElementById("message").value;
  console.log(message)
  var required = 30;
  var left = required - message.length;

  if(left > 0){
    messageError.innerHTML = `${left} more characters*`;
    return false;
  }

  messageError.innerHTML = "<i class='lar la-check-circle text-brand'></i>";
  return true;
}

async function validateForm() {
  var isValid = true;

  if (!(await validationName())) {
    isValid = false;
  }
  if (!(await validationEmail())) {
    isValid = false;
  }
  if (!(await validationSubject())) {
    isValid = false;
  }
  if (!(await validateMessage())) {
    isValid = false;
  }

  return isValid;
}
    
async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Thanks for your submission!',
        showConfirmButton: false,
        timer: 2500
      });
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          Swal.fire({
            icon: 'error',
            title: 'Oops! There was a problem submitting your form',
            text: data["errors"].map(error => error["message"]).join(", ")
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops! There was a problem submitting your form',
            text: 'Please try again later.'
          });
        }
      })
    }
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Oops! There was a problem submitting your form',
      text: 'Please try again later.'
    });
  });
}
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (await validateForm()) {
      await handleSubmit(event);
    }
  }
);