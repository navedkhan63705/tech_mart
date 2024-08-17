document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    updateCart();

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(cartItem);
            total += parseFloat(item.price.replace('$', ''));
        });
        cartCount.textContent = cartItems.length;
        cartTotal.textContent = total.toFixed(2);
        addRemoveEventListeners();
    }

    function addRemoveEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cartItems.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCart();
            });
        });
    }

    document.querySelectorAll('input[name="payment-method"]').forEach(input => {
        input.addEventListener('change', (e) => {
            document.querySelectorAll('.payment-details').forEach(details => {
                details.style.display = 'none';
            });
            const selectedPayment = e.target.value;
            if (selectedPayment === 'credit-debit-card') {
                document.getElementById('credit-debit-card-details').style.display = 'block';
            } else if (selectedPayment === 'upi') {
                document.getElementById('upi-details').style.display = 'block';
            }
        });
    });

    checkoutButton.addEventListener('click', () => {
        const country = document.getElementById('country').value;
        const state = document.getElementById('state').value;
        const pincode = document.getElementById('pincode').value;
        const district = document.getElementById('district').value;
        const street = document.getElementById('street').value;

        if (country && state && pincode && district && street) {
            alert('Order placed successfully!');
            localStorage.removeItem('cartItems');
            cartItems = [];
            updateCart();
        } else {
            alert('Please fill in all address details.');
        }
    });
});
