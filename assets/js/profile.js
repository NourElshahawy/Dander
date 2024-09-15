document.addEventListener("DOMContentLoaded", function () {
  // جلب بيانات المستخدم من localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
  } else {
    alert("You need to log in first.");
    window.location.href = "login&register.html";
  }

  // جلب بيانات سلة التسوق من localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");

  if (cartItems.length > 0) {
    let cartContent = "";

    cartItems.forEach((item, index) => {
      cartContent += `
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${item.name}">
          <h5>${item.name}</h5>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="remove-item btn" data-index="${index}">Remove</button>
        </div>
      `;
    });

    cartContainer.innerHTML = cartContent;

    // إضافة مستمع لحذف المنتجات
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        removeProductFromCart(index);
      });
    });
  } else {
    cartContainer.textContent = "Your cart is empty.";
  }
});

// وظيفة لحذف المنتج من سلة التسوق
function removeProductFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // حذف العنصر بناءً على الفهرس (index)
  cartItems.splice(index, 1);

  // تحديث البيانات في localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // إعادة تحميل الواجهة لعرض التغييرات
  location.reload();
}
