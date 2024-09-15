let featuredProducts = [];
fetch("E_Commerce.JSON")
  .then((res) => res.json())
  .then((res) => {
    const products = res.featuredProducts;
    console.log(res.featuredProducts);
    // let data = ``;
    //   products.map((el) => {
    //     console.log(el.name);
    //   data += `
    //                 <div class="pro-container details-product" id="productContainer">
    //                     <div class="pro">
    //                     <img src="${el.image}" alt="">
    //                     <div class="des">
    //                         <span>${el.brand}</span>
    //                         <h5>${el.name}</h5>
    //                         <div class="star">
    //                             <i class="fas fa-star"></i>
    //                             <i class="fas fa-star"></i>
    //                             <i class="fas fa-star"></i>
    //                             <i class="fas fa-star"></i>
    //                             <i class="fas fa-star"></i>
    //                         </div>
    //                         <h4>$${el.price}</h4>
    //                         <a href="#">More Details</a>
    //                         </div>
    //                         <a class="cart" href="#"><i class=" fa-solid fa-cart-shopping "></i></a></a>
    //                     </div>
    //                 </div>
    //             `;
    //   document.querySelector("#product1 .pro-container").innerHTML = data;
    // });

    const productContainer = document.getElementById("productContainer");

    const displayProducts = () => {
      productContainer.innerHTML = "";

      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("pro");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const desDiv = document.createElement("div");
        desDiv.classList.add("des");

        const brandSpan = document.createElement("span");
        brandSpan.textContent = product.brand;

        const nameH5 = document.createElement("h5");
        nameH5.textContent = product.name;

        const starDiv = document.createElement("div");
        starDiv.classList.add("star");
        for (let i = 0; i < product.rating; i++) {
          const starIcon = document.createElement("i");
          starIcon.classList.add("fas", "fa-star");
          starDiv.appendChild(starIcon);
        }

        const priceH4 = document.createElement("h4");
        priceH4.textContent = `$${product.price}`;

        const detailsLink = document.createElement("a");
        // detailsLink.href = product.details;
        detailsLink.onclick = function () {
          getProduct(product.id);
        };
        detailsLink.textContent = "More Details";

        desDiv.appendChild(brandSpan);
        desDiv.appendChild(nameH5);
        desDiv.appendChild(starDiv);
        desDiv.appendChild(priceH4);
        desDiv.appendChild(detailsLink);

        productDiv.appendChild(img);
        productDiv.appendChild(desDiv);

        productContainer.appendChild(productDiv);
      });
    };

    displayProducts();
  })
  .catch((err) => console.log(err));

function getProduct(x) {
  console.log(x);
  window.localStorage.setItem("productId", JSON.stringify(x));
  window.location.href = "/productDetails.html";
}

