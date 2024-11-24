const bar=document.getElementById('bar');
const nav=document.getElementById('navbar');
const close=document.getElementById('close');

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}


var MainImg = document.getElementById("MainImg");
var smallImg = document.getElementsByClassName("small-img");

smallImg[0].onclick = function(){
    MainImg.src = smallImg[0].src;
}
smallImg[1].onclick = function(){
    MainImg.src = smallImg[1].src;
}
smallImg[2].onclick = function(){
    MainImg.src = smallImg[2].src;
}
smallImg[3].onclick = function(){
    MainImg.src = smallImg[3].src;
}



document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      // Add to cart logic (if any)
      alert('Item added to the cart successfully!');
    });
  });
  

  document.addEventListener('DOMContentLoaded', function () {
    // Check if we are on the product page
    if (window.location.pathname.includes('product')) {
        setupProductPage();
    }

    // Check if we are on the cart page
    if (window.location.pathname.includes('cart')) {
        setupCartPage();
    }
});

// Function for handling "Add to Cart" on the product page
function setupProductPage() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            // Retrieve or initialize the cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            let existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optionally, notify the user
            alert('Product added to cart!');
        });
    });
}



function setupCartPage() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    // Clear existing items in the cart
    cartItemsContainer.innerHTML = '';

    // Display the cart items
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;

        // Dynamically render each product's image, name, price, and subtotal
        row.innerHTML = `
            <td><a href="#" class="remove-item"><i class="far fa-times-circle"></i></a></td>
            <td><img src="img/products/${item.id}.jpg" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td class="price" data-price="${item.price}">$${item.price.toFixed(2)}</td>
            <td><input type="number" class="quantity" value="${item.quantity}" min="1"></td>
            <td class="subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update total
    updateTotal(cart);

    // Handle removing items from the cart
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const row = e.target.closest('tr');
            const productId = row.dataset.id;

            // Remove the item from the cart in localStorage
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));

            // Remove the row from the table
            row.remove();

            // Update total
            updateTotal(cart);
        }
    });

    // Handle updating quantity
    cartItemsContainer.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity')) {
            const row = e.target.closest('tr');
            const productId = row.dataset.id;
            const quantity = parseInt(e.target.value);

            // Update the quantity in localStorage
            const item = cart.find(item => item.id === productId);
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update the subtotal
            const price = parseFloat(row.querySelector('.price').dataset.price);
            row.querySelector('.subtotal').textContent = `$${(price * quantity).toFixed(2)}`;

            // Update total
            updateTotal(cart);
        }
    });
}

// Function to update the cart total
function updateTotal(cart) {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    // Update total on the page
    document.getElementById('cart-subtotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

