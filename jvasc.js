// Initialize an empty cart
let cart = [];

// Add to Cart functionality
function addToCart(bookTitle, bookPrice) {
    // Check if the book is already in the cart
    const bookIndex = cart.findIndex((item) => item.title === bookTitle);

    if (bookIndex === -1) {
        // Add new book to cart
        cart.push({ title: bookTitle, price: bookPrice, quantity: 1 });
    } else {
        // Increment the quantity of the existing book
        cart[bookIndex].quantity++;
    }

    updateTotalPrice();
    saveCartToLocalStorage();
}

// Update the total price
function updateTotalPrice() {
    const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0);
    document.getElementById("totalPrice").innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
        cart = savedCart;
        updateTotalPrice();
    }
}

// Render cart items in "My Cart" page
function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    cartItemsContainer.innerHTML = ""; // Clear current content

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.innerText = "$0.00";
        return;
    }

    let total = 0;
    cart.forEach((book, index) => {
        total += book.price * book.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <div class="item-details">
                        <h3>${book.title}</h3>
                        <p>Quantity: ${book.quantity}</p>
                    </div>
                </div>
                <div class="item-price">$${(book.price * book.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartTotalElement.innerText = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    renderCart();
    updateTotalPrice();
}

// Search functionality
function searchBooks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const books = document.querySelectorAll(".book-card");

    books.forEach((book) => {
        const title = book.getAttribute("data-title").toLowerCase();
        if (title.includes(searchInput)) {
            book.style.display = "block";
        } else {
            book.style.display = "none";
        }
    });
}

// Initialize the cart and events
document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
    const isCartPage = document.getElementById("cartItems");
    if (isCartPage) {
        renderCart();
    }
});
