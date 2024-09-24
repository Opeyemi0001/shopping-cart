const laptops = [
  {
    productImg: "https://th.bing.com/th/id/OIP._1AGZ6l2ePLbNRhac81SiwHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    price: 999.99,
    quantity:1,
    productName: "UltraBook Pro 15",
    productDescription: "A powerful laptop with a sleek design, perfect for professionals."
  },
  {
    productImg: "https://th.bing.com/th/id/OIP.r1Ttk28V3JjJhAeYeKH8gwHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    price: 799.99,
    quantity:1,
    productName: "Gaming Beast XG",
    productDescription: "Designed for gamers with high performance and stunning graphics."
  },
  {
    productImg: "https://th.bing.com/th/id/OIP.nD6BLNHkQq2eu_xM4x1pagHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    price: 649.99,
    quantity:1,
    productName: "Budget Book 14",
    productDescription: "An affordable laptop for everyday tasks and web browsing."
  },
  {
    productImg: "https://th.bing.com/th/id/OIP.O_JSaDCiosYQ5n-D4CN1jwHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    price: 1299.99,
    quantity:1,
    productName: "Creator Studio 17",
    productDescription: "Ideal for creators with a powerful GPU and high-resolution display."
  },
  {
    productImg: "https://th.bing.com/th/id/OIP.CqhO3h2QuALWc5xE9PBrPQHaHa?pid=ImgDet&w=177&h=177&c=7&dpr=1.5",
    price: 1099.99,
    quantity:1,
    productName: "Business Pro 13",
    productDescription: "Reliable and portable, perfect for business professionals on the go."
  }
];

// render product to the DOM
const cartContainer = document.getElementById("cart-list");
console.log(cartContainer);

// handle increment
function incrementQuantity (param) {
  let clickProductName = param.target.id;

  // find the product in the array
  let product;
  for (item of laptops) {
    if (item.productName === clickProductName) {
      product = item;
      break;
    }
  }

  // increment of the quantity
  product.quantity++;

  // update the quantity element for this product
  let quantityEle = document.getElementById(`quantity-${clickProductName}`);

  quantityEle.textContent = product.quantity;

  totalElem.textContent = sumProducts();
}

// handle decrement
function decrementQuantity(param) {
  let clickProductName = param.target.id;
  // find the product in the array
  let product;
  for (let item of laptops) {
    if (item.productName === clickProductName) {
      product = item;
      break;
    }
  }

  // decrement the quantity
  if (product.quantity > 1) {
    product.quantity--;
  }
  // update the quantity element for this product
  let quantityEle = document.getElementById(`quantity-${clickProductName}`);
  quantityEle.textContent = product.quantity;

  totalElem.textContent = sumProducts();
}

// calculate total price
function sumProducts () {
  let total = 0;
  for (product of laptops) {
    total += product.price * product.quantity;
  }

  return total;
}

// get total element
const totalElem = document.getElementById("total");
totalElem.textContent = sumProducts();

// remove product from the cart
function removeProduct(param) {
  let clickProductName = param.target.id;

  // find the product in the array
  let product;
  for (item of laptops) {
    if (item.productName === clickProductName) {
      product = item;
      break;
    }
  }

  // remove the product from the array
  let index = laptops.indexOf(product);
  laptops.splice(index, 1);

  // remove the product card from cart container
  let productCard = param.target.parentElement.parentElement;
  cartContainer.removeChild(productCard);

  totalElem.textContent = sumProducts();
}

// handel renderingProducts
function renderingProducts() {

  cartContainer.innerHTML = '';  // Clears existing products

  for (product of laptops) {
    let productCard = document.createElement("div");
    productCard.setAttribute("class", "product-card");

    let productImg = document.createElement("img");
    productImg.src = product.productImg;

    let productName = document.createElement("h3");
    productName.textContent = product.productName;

    let productPrice = document.createElement("p");
    productPrice.textContent = product.price;

    let productDescription = document.createElement("p");
    productDescription.textContent = product.productDescription;

    let actionBox = document.createElement("div");
    actionBox.setAttribute("class", "action-box");

    let leftBox = document.createElement("div");
    leftBox.setAttribute("class", "left-box");


    // button
    let incrementBtn = document.createElement("button");
    incrementBtn.textContent = "+";
    incrementBtn.setAttribute("id", product.productName);
    incrementBtn.addEventListener("click", function (eventObj) {
      incrementQuantity(eventObj);
    });

    let decrementBtn = document.createElement("button");
    decrementBtn.textContent = "-";
    decrementBtn.setAttribute("id", product.productName);
    decrementBtn.addEventListener("click", function (eventObj) {
      decrementQuantity(eventObj);
    });

    let quantity = document.createElement("p");
    quantity.textContent = product.quantity;
    quantity.setAttribute("id", `quantity-${product.productName}`);  // unique id based on product name

    let deleteEle = document.createElement("button");
    deleteEle.textContent = "Remove";
    deleteEle.setAttribute("id", product.productName);
    deleteEle.addEventListener("click", function (eventObj){
      removeProduct(eventObj);
    });
    

    leftBox.appendChild(decrementBtn);
    leftBox.appendChild(quantity);
    leftBox.appendChild(incrementBtn);

    actionBox.appendChild(leftBox);
    actionBox.appendChild(deleteEle);

    productCard.appendChild(productImg);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDescription);
    productCard.appendChild(actionBox);
   
    // add product card to the cart container
    cartContainer.appendChild(productCard);
    
  }totalElem.textContent = sumProducts();  // Update total

  
}renderingProducts();