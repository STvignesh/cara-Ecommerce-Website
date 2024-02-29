("use strict");

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
const productSection = document.querySelectorAll("#product1");
const sproductSection = document.querySelector("#prodetails");
const slideIcon = document.querySelectorAll(".slide-icon");
const tableBody = document.querySelector(".tbody");
const removeProductIcon = document.querySelectorAll(".remove-icon");
const productPrize = document.querySelector(".product-price");
const addToCartBtn = document.querySelector(".addToCartBtn");
const size = document.querySelector("select");
const errorMsg = document.querySelector(".error");
const quantity = document.querySelector(".qty");
const shipping = document.querySelector(".shipping");
const Total = document.querySelector(".total");
const subTotal = document.querySelector(".subtotal");

// window.localStorage.clear();
console.log(tableBody);
// console.log(slideIcon);
/////////
// const navHeight = sproductSection.getBoundingClientRect().height;
// console.log(navHeight);
////////

function stickyNav(entries, observer) {
  console.log(entries);
  const [entry] = entries;
  console.log("entry", entry);
  console.log(entry.isIntersecting);
  if (!entry.isIntersecting) navigationBar.classList.add("sticky");
  else navigationBar.classList.remove("sticky");
}
// const obsOption = {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// };
// const heroObserver = new IntersectionObserver(stickyNav, obsOption);
// if (heroSection) heroObserver.observe(heroSection);

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

// console.log("navLink", navLinks);

navBar.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav-link")) {
    console.log("here");
    navLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");
  }
});

// console.log(window.location.href);
// productCard.forEach((product) => {
//   console.log(product);

//   const productImgSrc = product.childNodes[1].src;
//   const productPrice = product.lastElementChild.children[3].innerText;
//   console.log(productImgSrc);
//   console.log(productPrice);

//   product.addEventListener("click", function () {
//     window.location.href = "sproduct.html";
//   });
// });
// console.log(sproductSection[0]);
console.log(Math.trunc(Math.random() * 6) + 1);

function slider(index, productImgSrc, productPrice) {
  sproductSection[index].classList.remove("product-slide");
  mainIMG[index].src = productImgSrc;
  console.log("iam", mainIMG.src);
  sproductSection[index].children[1].children[2].innerText = productPrice;
  slideIcon[index].addEventListener("click", function () {
    sproductSection[index].classList.add("product-slide");
  });
  // console.log(!sproductSection.classList.contains("product-slide"));
}
const tempBox = [];
productSection.forEach((product) => {
  console.log(product);
  product.addEventListener("click", function (e) {
    const productCart = {};
    if (e.target.closest(".product")) {
      const parentContainer = e.target.closest(".product");
      const productImgSrc = parentContainer.childNodes[1].src;
      const productPrice =
        parentContainer.lastElementChild.children[3].innerText;
      const productTitle =
        parentContainer.lastElementChild.children[1].textContent;
      productCart.price = +productPrice.slice(1);
      productCart.imgSrc = productImgSrc;
      productCart.ProductName = productTitle;
      tempBox.push(productCart);
      window.localStorage.setItem("productInfo", JSON.stringify(tempBox));
      window.location.href = "sproduct.html";
    }
  });
});
if (sproductSection) {
  function renderinfo() {
    const localStorageData = JSON.parse(
      window.localStorage.getItem("productInfo")
    );
    console.log(localStorageData);
    console.log(localStorageData[0]);
    console.log(mainIMG);
    mainIMG.src = localStorageData[0].imgSrc;
    productPrize.textContent = `₹${localStorageData[0].price}`;
  }
  renderinfo();
}

smallImg.forEach((img) =>
  img.addEventListener("click", () => {
    const tempCopy = img.getAttribute("src");
    img.src = mainIMG.src;
    mainIMG.src = tempCopy;
  })
);
const productBox = [];
if (sproductSection) {
  addToCartBtn.addEventListener("click", function (e) {
    if (size.value === "Select Size") {
      e.preventDefault();
      errorMsg.style.display = "block";
      return;
    }
    const localStorageData = JSON.parse(
      window.localStorage.getItem("productInfo")
    );
    console.log(localStorageData);
    const productCart = {};
    e.preventDefault();

    const productImgSrc = localStorageData[0].imgSrc;
    const productPrice = localStorageData[0].price;
    const productTitle = localStorageData[0].ProductName;
    const productSize = size.value;

    productCart.price = productPrice;
    productCart.imgSrc = productImgSrc;
    productCart.ProductName = productTitle;
    productCart.size = productSize;
    console.log(productCart);
    productBox.push(productCart);
    window.localStorage.setItem("productData", JSON.stringify(productBox));
  });
}
// productBox.push(JSON.parse(window.localStorage.getItem("productInfo")));
if (JSON.parse(window.localStorage.getItem("productData")) !== null) {
  const localStorageData = JSON.parse(
    window.localStorage.getItem("productData")
  );
  console.log(localStorageData);
  productBox.push(...localStorageData);
}

if (tableBody) {
  addToCart();
}

function addToCart() {
  if (!tableBody) return;
  {
    tableBody.innerHTML = "";
    shipping.textContent = 0;
    Total.textContent = 0;
    subTotal.textContent = 0;
  }

  let totalSubTotal = 0;
  productBox.forEach((data) => {
    console.log(data.size);
    const tabledata = ` 
    <tr>
    <td>
      <ion-icon
        name="close-circle-outline"
        class="remove-icon"
      ></ion-icon>
    </td>
    <td><img src="${data.imgSrc}" alt="shirt picture" /></td>
    <td>${data.ProductName}</td>
    <td>₹${data.price}</td>
    <td><input type="number" min="1" value="1" class='qty'/></td>
    <td>${data.size}</td>
    <td class='subtotal1'>₹${data.price}</td>
  </tr>`;
    console.log("qty", quantity);
    tableBody.insertAdjacentHTML("beforeend", tabledata);
    console.log("price", productBox);
    totalSubTotal += data.price;

    console.log("toatlPrize", totalSubTotal);
    subTotal.textContent = `₹${totalSubTotal}`;
    console.log("subbb", subTotal.textContent);
    shipping.textContent = totalSubTotal > 3000 ? "Free" : `₹${100}`;
    console.log(shipping.textContent);
    const subtotal = subTotal.textContent.slice(1);
    // const subtotal = totalSubTotal;
    console.log("subtotal", subtotal);
    let shippingCost;
    if (shipping.textContent === "Free") {
      shippingCost = 0;
    } else {
      shippingCost = shipping.textContent.slice(1);
    }

    const total = Number(subtotal) + Number(shippingCost);
    console.log(total);
    Total.textContent = `₹${total}`;
  });
}

if (tableBody) {
  console.log(productBox);
  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-icon")) {
      console.log("clicked");
      const imgsrc = e.target.closest("tr").children[1].childNodes[0].src;
      productBox.forEach((product) => {
        if (product.imgSrc === imgsrc) {
          const index = productBox.indexOf(product);
          productBox.splice(index, 1);
          window.localStorage.setItem(
            "productData",
            JSON.stringify(productBox)
          );
          addToCart();
        }
      });
    }
  });
}

// if (sproductSection) {
// }
