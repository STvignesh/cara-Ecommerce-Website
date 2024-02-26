"use strict";

const navigationBar = document.querySelector("#header");
const heroSection = document.querySelector("#hero");
const featureSection = document.querySelector("#feature");
const navBar = document.querySelector("#navbar");
const navLinks = document.querySelectorAll(".nav-link");
const closeNavIcon = document.querySelector(".icon-close");
const mobileNavIcon = document.querySelector(".mobile-nav-icon");
const mainIMG = document.querySelector("#mainImg");
const smallImg = document.querySelectorAll(".small-img");
const productCard = document.querySelectorAll(".product");

/////////
const navHeight = navigationBar.getBoundingClientRect().height;
////////

function stickyNav(entries, observer) {
  console.log(entries);
  const [entry] = entries;
  console.log("entry", entry);
  console.log(entry.isIntersecting);
  if (!entry.isIntersecting) navigationBar.classList.add("sticky");
  else navigationBar.classList.remove("sticky");
}
const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const heroObserver = new IntersectionObserver(stickyNav, obsOption);
if (heroSection) heroObserver.observe(heroSection);

// mobile navigation

mobileNavIcon.addEventListener("click", () => {
  navBar.classList.remove("active-mobile-nav");
  mobileNavIcon.classList.toggle("hidden");
  navBar.children[5].classList.add("lg-bag");
});
closeNavIcon.addEventListener("click", () => {
  navBar.classList.add("active-mobile-nav");
  mobileNavIcon.classList.toggle("hidden");
});

console.log("navLink", navLinks);

navBar.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav-link")) {
    console.log("here");
    navLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
  }
});

smallImg.forEach((img) =>
  img.addEventListener("click", () => {
    const tempCopy = img.getAttribute("src");
    img.src = mainIMG.src;
    mainIMG.src = tempCopy;
  })
);
console.log(window.location.href);
productCard.forEach((product) => {
  console.log(product);

  const productImgSrc = product.childNodes[1].src;
  const productPrice = product.lastElementChild.children[3].innerText;
  console.log(productImgSrc);
  console.log(productPrice);

  product.addEventListener("click", function () {
    window.location.href = "sproduct.html";
  });
});
