document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("themeToggle");

  // تحقق من وجود تفضيل الوضع في localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  // التبديل بين الوضعين عند النقر على الزر
  themeToggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // تخزين التفضيل في localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});

const header = document.getElementById("header");
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
// 1-Navbar Design changes on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 550) {
    header.style.background = "#cce7d0";
  } else {
    header.style.background = "#e3e6f3";
  }
});
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
// car shopping
document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.querySelector("#lg-bag a");
  const detailsCartButton = document.querySelector("#lg-bag  span");
  const cart = document.querySelector(".carTap");
  const closeButton = document.querySelector(".carTap .close");
  const minusButton = document.querySelector(".muins");
  const plusButton = document.querySelector(".plus");
  const quantitySpan = document.querySelector(".details-cart .quantity span");
  const cartTotalSpan = document.querySelector("#lg-bag span");
  const detailsCartTotalSpan = document.querySelector("#lg-bag  span");
  // console.log(detailsCartTotalSpan);

  let storedQuantity = localStorage.getItem("cartQuantity");
  let storedCartTotal = localStorage.getItem("cartTotal");

  let currentQuantity = storedQuantity ? parseInt(storedQuantity) : 0;
  let cartTotal = storedCartTotal ? parseInt(storedCartTotal) : 0;

  if (quantitySpan) {
    quantitySpan.textContent = currentQuantity;
  } else {
    console.error("Quantity span not found! 1");
  }
  cartTotalSpan.textContent = cartTotal;
  detailsCartTotalSpan.textContent = cartTotal;
  if (detailsCartButton) {
    detailsCartButton.textContent = currentQuantity;
  } else {
    console.error("Quantity span not found! 2");
  }

  function updateLocalStorage() {
    localStorage.setItem("cartQuantity", currentQuantity);
    localStorage.setItem("cartTotal", cartTotal);
  }

  if (cartButton) {
    cartButton.addEventListener("click", function (event) {
      event.preventDefault();
      cart.classList.toggle("active");
    });
  }

  if (detailsCartButton) {
    detailsCartButton.addEventListener("click", function (event) {
      event.preventDefault();
      cart.classList.toggle("active");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      cart.classList.remove("active");
    });
  }

  if (minusButton && plusButton) {
    minusButton.addEventListener("click", function () {
      if (currentQuantity > 1) {
        currentQuantity--;
        cartTotal--;
        quantitySpan.textContent = currentQuantity;
        cartTotalSpan.textContent = cartTotal;
        detailsCartTotalSpan.textContent = cartTotal;
        detailsCartButton.textContent = cartTotal;

        updateLocalStorage();
      }
    });

    plusButton.addEventListener("click", function () {
      currentQuantity++;
      cartTotal++;
      quantitySpan.textContent = currentQuantity;
      cartTotalSpan.textContent = cartTotal;
      detailsCartTotalSpan.textContent = cartTotal;
      detailsCartButton.textContent = cartTotal;

      updateLocalStorage();
    });
  }
});

// • Carousel changes images onclick
// Create the carousel dynamically
document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.getElementById("hero");
  if (heroSection) {
    const carouselItems = [
      {
        title: "Trade-in-offer",
        subtitle: "Super value deals",
        heading: "On all products",
        description: "Save more with coupons & up to 70% off!",
        buttonText: "Shop Now",
        image: "assets/img/hero4.png",
      },
      {
        title: "Summer Sale",
        subtitle: "Up to 50% off",
        heading: "Exclusive on selected items",
        description: "Limited time offer!",
        buttonText: "Shop Now",
        image: "assets/img/hero2.jpg",
      },
      {
        title: "New Arrivals",
        subtitle: "Trendy Products",
        heading: "Shop Latest Fashion",
        description: "Get your hands on the latest trends!",
        buttonText: "Shop Now",
        image: "assets/img/hero3.jpg",
      },
    ];

    let currentIndex = 0;

    const h4 = document.createElement("h4");
    const h2 = document.createElement("h2");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    const button = document.createElement("button");

    const updateCarouselContent = (index) => {
      h4.textContent = carouselItems[index].title;
      h2.textContent = carouselItems[index].subtitle;
      h1.textContent = carouselItems[index].heading;
      p.textContent = carouselItems[index].description;
      button.textContent = carouselItems[index].buttonText;
      heroSection.style.backgroundImage = `url(${carouselItems[index].image})`;
    };

    updateCarouselContent(currentIndex);

    heroSection.appendChild(h4);
    heroSection.appendChild(h2);
    heroSection.appendChild(h1);
    heroSection.appendChild(p);
    heroSection.appendChild(button);

    button.addEventListener("click", () => {
      window.location.href = "AllProducts.html";
    });

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.className = "prevButton";
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.className = "nextButton";

    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      updateCarouselContent(currentIndex);
    });

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarouselContent(currentIndex);
    });

    heroSection.appendChild(prevButton);
    heroSection.appendChild(nextButton);

    const intervalTime = 3000;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarouselContent(currentIndex);
    }, intervalTime);
    updateCarouselContent(currentIndex);
  } else {
    console.error("Hero section not found!");
  }
});
// • Small button on the bottom right page to navigate us to the top of the page.

const scrollToTopButton = document.getElementById("scrollToTop");

scrollToTopButton.addEventListener("click", () => {
  console.log("555");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//   a. fetch products from the given API
fetch("E_Commerce.JSON")
  .then((response) => response.json())
  .then((data) => {
    const products = data.featuredProducts;
    const productContainer = document.getElementById("productContainer");
    const seeAllButton = document.getElementById("seeAllProducts");

    let displayedProducts = 4;

    const displayProducts = (count) => {
      productContainer.innerHTML = "";
      for (let i = 0; i < count; i++) {
        const product = products[i];

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
        for (let j = 0; j < product.rating; j++) {
          const starIcon = document.createElement("i");
          starIcon.classList.add("fas", "fa-star");
          starDiv.appendChild(starIcon);
        }

        const priceH4 = document.createElement("h4");
        priceH4.textContent = `$${product.price}`;

        const detailsLink = document.createElement("a");
        detailsLink.onclick = function () {
          getProduct(product.id);
        };
        detailsLink.textContent = "More Details";
        detailsLink.classList = "moreDetails";
        // detailsLink.href = product.details;
        // document.getElementById("detailsLink").addEventListener("click", () => {
        //   window.location.href = "productDetails.html";
        // });

        desDiv.appendChild(brandSpan);
        desDiv.appendChild(nameH5);
        desDiv.appendChild(starDiv);
        desDiv.appendChild(priceH4);
        desDiv.appendChild(detailsLink);

        productDiv.appendChild(img);
        productDiv.appendChild(desDiv);

        productContainer.appendChild(productDiv);
      }
    };

    displayProducts(displayedProducts);

    seeAllButton.addEventListener("click", () => {
      displayProducts(products.length);
      seeAllButton.style.display = "none";
    });
    document.getElementById("seeAllProducts").addEventListener("click", () => {
      window.location.href = "AllProducts.html";
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

function getProduct(x) {
  console.log(x);
  window.localStorage.setItem("productId", JSON.stringify(x));
  window.location.href = "/productDetails.html";
}
//logen
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    document.getElementById("log-reg").classList.add("hiddenBtn");
    document.getElementById("profileLink").classList.remove("hiddenBtn");
    document.getElementById("logoutLink").classList.remove("hiddenBtn");
  } else {
    document.getElementById("log-reg").classList.remove("hiddenBtn");
    document.getElementById("profileLink").classList.add("hiddenBtn");
    document.getElementById("logoutLink").classList.add("hiddenBtn");
  }
});

// log out
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login&register.html";
});
