document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sort');
    const brandSelect = document.getElementById('brand');
    const productItems = Array.from(document.querySelectorAll('.product-item'));
    const reviewButtons = document.querySelectorAll('.review-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    updateCartCount();

    // Sort Products
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        sortProducts(sortValue);
    });

    // Filter Products by Brand
    brandSelect.addEventListener('change', () => {
        const brandValue = brandSelect.value;
        filterProductsByBrand(brandValue);
    });

    // Add Review Button Click Event
    reviewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            addReview(productItem);
        });
    });

    // Add to Cart Button Click Event
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            addToCart(productItem);
        });
    });

    function sortProducts(criteria) {
        const sortedProducts = productItems.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            const nameA = a.dataset.name.toLowerCase();
            const nameB = b.dataset.name.toLowerCase();

            switch (criteria) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                default:
                    return 0;
            }
        });

        const productList = document.querySelectorAll('.product-list');
        productList.forEach(list => {
            list.innerHTML = '';
            sortedProducts.forEach(item => list.appendChild(item));
        });
    }

    function filterProductsByBrand(brand) {
        const brandSections = document.querySelectorAll('.brand-section');
        brandSections.forEach(section => {
            if (brand === 'all' || section.dataset.brand === brand) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }

    function addReview(productItem) {
        const reviewSection = productItem.querySelector('.review-section');
        const reviewForm = document.createElement('form');
        reviewForm.innerHTML = `
            <textarea required placeholder="Write your review"></textarea>
            <button type="submit">Submit</button>
        `;
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reviewText = reviewForm.querySelector('textarea').value;
            if (reviewText) {
                const review = document.createElement('p');
                review.textContent = reviewText;
                reviewSection.appendChild(review);
                reviewForm.remove();
            }
        });
        reviewSection.appendChild(reviewForm);
    }

    function addToCart(productItem) {
        const productName = productItem.querySelector('h4').textContent;
        const productPrice = productItem.querySelector('p').textContent;

        cartItems.push({ name: productName, price: productPrice });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }
});
