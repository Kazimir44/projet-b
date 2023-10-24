const productContainer = document.querySelector('#productContainer');
const dynamiqueInput = document.querySelector('.dynamiqueInput');
const parallax_el = document.querySelectorAll(".parallax");




// Menu BBurger
function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}


function cloneInput() {
    const newDynamiqueInput = dynamiqueInput.cloneNode(true);
    productContainer.appendChild(newDynamiqueInput);
}


let xValue = 0, yValue = 0;

window.addEventListener("mousemove",(e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    
    
    
    
     parallax_el.forEach(el => {
         let speedx = el.dataset.speedx;
         let speedy = el.dataset.speedy;
        el.style.transform = `translateX(calc(0% + ${-xValue * speedx}px)) translateY(calc(0% + ${yValue * speedy}px))`;
    });
});