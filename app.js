let iconCart = document.querySelector(".iconCart");
let cart = document.querySelector(".cart");
let container = document.querySelector(".container");
let close = document.querySelector(".close");

iconCart.addEventListener("click", () => {
  if (cart.style.right == "-100%") {
    cart.style.right = "0";
    container.style.transform = "translateX(150px)";
  } else {
    cart.style.right = "-100%";
    container.style.transform = "translateX()";
  }
});
close.addEventListener("click", () => {
  cart.style.right = "-100%";
  container.style.transform = "translateX(0)";
});

let products = null;
// get data from file json
fetch("product.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    addDataToHTML();
  });
// show datas in list html
function addDataToHTML() {
  // remove datas default in html
  let listProductHTML = document.querySelector(".listProduct");
  listProductHTML.innerHTML = "";
  // add new datas
  if (products != null) {
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" />
      <h2>${product.name}</h2>
      <div class="price">${product.price}</div>
      <button onclick = "addCart(${product.id})">Add to cart</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
}
let listcart = [];
// add i get cookie data cart
function checkCart() {
  let cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("listcart="));
  if (cookieValue) {
    listcart = JSON.parse(cookieValue.split("=")[1]);
  }
}
checkCart();

function addCart($idProduct) {
  let productCopy = JSON.parse(JSON.stringify(products));
  // if this product is not in the cart
  if (!listcart[$idProduct]) {
    let dataProduct = productCopy.filter(
      (product) => product.id == $idProduct
    )[0];
    // add data product in cart
    listcart[$idProduct] = dataProduct;
    listcart[$idProduct].quantity = 1;
  } else {
    //  br balola 14 minutda
    listcart[$idProduct].quantity++;
  }
  // yana bir balo 14:12 sekunda
  let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie =
    "liscart=" + JSON.stringify(listcart) + ";" + timeSave + "; path=/;";
  addCartToHTML();
}
addCartToHTML();
function addCartToHTML() {
  let listcartHTML = document.querySelector(".listcart");
  listcart.innerHTML = " ";

  let totalHTML = document.querySelector(".totalQuantity");
  let totalQuantity = 0;
  if (listcart) {
    listcart.forEach((product) => {
      if (product) {
        let newCart = document.createElement("div");
        // /////////////// item2 bolishi mumkin
        newCart.classList.add("item");
        newCart.innerHTML =
        `<img src="./images/images.jpeg" alt="" />
        <div class="content">
          <div class="name">product name</div>
          <div class="price">$50/1 product</div>
        </div>
        <div class="quantity">
          <button>-</button>
          <span class="value">3</span>
          <button>+</button>`;
          listcartHTML.appendChild(newCart)
      }
    });
  }
}
