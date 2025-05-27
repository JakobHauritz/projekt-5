document.addEventListener("DOMContentLoaded", () => {
  // Size options
  const sizeOptions = document.querySelectorAll(".size-option");

  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      sizeOptions.forEach((opt) => opt.classList.remove("selected"));

      option.classList.add("selected");
    });
  });

  // Quantity selector
  const singleProductSelector = document.querySelector(".quantity-selector");
  const cartItems = document.querySelectorAll(".cart-item");

  if (singleProductSelector) {
    const minusButton = singleProductSelector.querySelector(".ph-minus");
    const plusButton = singleProductSelector.querySelector(".ph-plus");
    const quantityValue =
      singleProductSelector.querySelector(".quantity-value");
    let quantity = parseInt(quantityValue.textContent);

    minusButton.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
      }
    });

    plusButton.addEventListener("click", () => {
      quantity++;
      quantityValue.textContent = quantity;
    });
  }

  // Handle cart items
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      const minusButton = item.querySelector(".ph-minus");
      const plusButton = item.querySelector(".ph-plus");
      const quantityValue = item.querySelector(".quantity-value");
      let quantity = parseInt(quantityValue.textContent);

      minusButton.addEventListener("click", () => {
        if (quantity > 1) {
          quantity--;
          quantityValue.textContent = quantity;
        }
      });

      plusButton.addEventListener("click", () => {
        quantity++;
        quantityValue.textContent = quantity;
      });
    });
  }

  // Color selector
  const colorOptions = document.querySelectorAll(".color-option");
  const productImage = document.querySelector(".product-image");

  colorOptions.forEach((option) => {
    option.addEventListener("click", () => {
      colorOptions.forEach((opt) => opt.classList.remove("selected"));

      option.classList.add("selected");

      productImage.src = option.src;
      productImage.alt = option.alt;
    });
  });
});
