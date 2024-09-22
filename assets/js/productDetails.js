// تغيير الصورة عند النقر على الصورة الصغيرة
function changeImage(src) {
  const mainImg = document.getElementById("mainImg");
  if (mainImg) {
    mainImg.src = src;
  }
}

// استدعاء المنتج باستخدام الرقم المخزن في LocalStorage
let productNumber = 0;

if (window.localStorage.getItem("productId") !== null) {
  productNumber = JSON.parse(window.localStorage.getItem("productId"));
  console.log(productNumber);
}

// جلب تفاصيل المنتج من ملف JSON
fetch("./assets/E_Commerce.JSON")
  .then((res) => res.json())
  .then((res) => {
    const product = res.featuredProducts.find((item) => item.id === productNumber);
    if (product) {
      let data = `
        <div class="pro-container details-product" id="productContainer">
          <div class="img-small">
              ${
                product.imageSmall && Array.isArray(product.imageSmall)
                  ? product.imageSmall
                      .map(
                        (img) => `
                      <img src="${img}" alt="" onclick="changeImage('${img}')">
                  `,
                      )
                      .join("")
                  : "No additional images available"
              }
          </div>
          <div class="img-large">
              <img id="mainImg" src="${product.image}" alt="">
          </div>
          <div class="img-desc">
            <span>${product.brand}</span>
            <h5>${product.name}</h5>
            <h3>${product.desc}</h3>
            <h4>$${product.price}</h4>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
        </div>
        <button id="addToCartButton">Add to Cart</button>
      `;
      // عرض تفاصيل المنتج
      document.getElementById("productContainer").innerHTML = data;

      // إضافة مستمع للأحداث للزر "Add to Cart"
      const addToCartButton = document.getElementById("addToCartButton");
      addToCartButton.addEventListener("click", function () {
        displayProductInCart(product);
      });
    } else {
      console.log("Product not found");
    }
  })
  .catch((err) => console.log(err));

// عرض المنتج في سلة 
function displayProductInCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // تحقق إذا كان المنتج موجودًا بالفعل في السلة
  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    // إذا كان المنتج موجودًا بالفعل، يمكنك تحديث الكمية
    existingProduct.quantity += 1;
  } else {
    // إذا لم يكن المنتج موجودًا، أضف المنتج للسلة
    product.quantity = 1; // يمكنك التحكم بالكمية
    cartItems.push(product);
  }

  // حفظ التحديثات في localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // تحديث عرض السلة
  updateCartUI(cartItems);
}

function updateCartUI(cartItems) {
  const cartContainer = document.querySelector(".details-cart");
  cartContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    const imgDescDiv = document.createElement("div");
    imgDescDiv.classList.add("img-desc");

    const brandSpan = document.createElement("span");
    brandSpan.textContent = item.brand;

    const nameH5 = document.createElement("h5");
    nameH5.textContent = item.name;

    const priceH4 = document.createElement("h4");
    priceH4.textContent = `$${item.price}`;

    imgDescDiv.appendChild(brandSpan);
    imgDescDiv.appendChild(nameH5);
    imgDescDiv.appendChild(priceH4);

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantity");

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = item.quantity;

    itemDiv.appendChild(img);
    itemDiv.appendChild(imgDescDiv);
    itemDiv.appendChild(quantityDiv);

    cartContainer.appendChild(itemDiv);
  });
}


// التعامل مع زيادة ونقصان الكمية
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("plus")) {
    const quantitySpan = e.target.previousElementSibling;
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
  }

  if (e.target.classList.contains("muins")) {
    const quantitySpan = e.target.nextElementSibling;
    if (parseInt(quantitySpan.textContent) > 1) {
      quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
    }
  }
});

// إغلاق صفحة المنتج والعودة إلى التفاصيل
document.querySelector(".close").addEventListener("click", () => {
  window.location.href = "/productDetails.html";
});

// الانتقال إلى صفحة الدفع عند النقر على زر "Checkout"
document.querySelector(".checkOut").addEventListener("click", () => {
  alert("Proceed to checkout");
  window.location.href = "/profile.html";
});
