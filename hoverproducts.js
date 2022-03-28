let back = document.querySelector("#back");
let front = document.querySelector("#front");

back.addEventListener("mouseleave", flipShirt);
front.addEventListener("mouseenter", flipShirt);

function flipShirt () 
{
    back.classList.toggle("hidden");
    front.classList.toggle("hidden");
}