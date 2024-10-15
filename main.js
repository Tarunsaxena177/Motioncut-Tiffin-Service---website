const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navIcons = document.querySelector('.nav-icons');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navIcons.classList.toggle('active');
});


let cart = [];
let total = 0;

// Function to add items to cart
function addToCart(name, price, quantityInputId) {
    const quantity = document.getElementById(`quantity${quantityInputId}`).value;

    if (quantity > 0) {
        cart.push({
            name: name,
            price: price,
            quantity: parseInt(quantity)
        });

        updateCart();
    } else {
        alert('Please enter a valid quantity');
    }
}

// Function to update the cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    total = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <h3>${item.name} x${item.quantity}</h3>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
        `;

        total += item.price * item.quantity;
        cartItemsDiv.appendChild(cartItem


            // Initialize an empty array for storing reviews
let reviews = [];

// Rating functionality
const stars = document.querySelectorAll('.stars span');
let rating = 0;

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        rating = index + 1;
        updateStarRating(rating);
    });
});

// Function to highlight stars based on the selected rating
function updateStarRating(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Handle review form submission
const reviewForm = document.getElementById('review-form');
const reviewsDisplay = document.getElementById('reviews-display');

reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('review-text').value;

    // Validate that a rating has been selected
    if (rating === 0) {
        alert('Please select a rating!');
        return;
    }

    // Create a review object
    const review = {
        name: name,
        rating: rating,
        reviewText: reviewText
    };

    // Add the review to the reviews array
    reviews.push(review);

    // Display the review
    displayReviews();

    // Clear the form
    reviewForm.reset();
    updateStarRating(0);
    rating = 0;
});

// Function to display reviews on the page
function displayReviews() {
    // Clear the reviews display area
    reviewsDisplay.innerHTML = '<h2>Customer Reviews</h2>';

    if (reviews.length === 0) {
        reviewsDisplay.innerHTML += '<p>No reviews yet.</p>';
    } else {
        reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');

            // Create HTML for the review
            reviewDiv.innerHTML = `
                <h3>${review.name}</h3>
                <div class="stars">${'&#9733;'.repeat(review.rating)}</div>
                <p>${review.reviewText}</p>
            `;

            reviewsDisplay.appendChild(reviewDiv);
        });
    }
}

// Initial load (no reviews yet)
displayReviews();


// Function to toggle between login and sign-up forms
function showSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Simulate local storage for user authentication data
let users = JSON.parse(localStorage.getItem('users')) || [];

// Sign Up Functionality
function signUpUser() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (users.some(user => user.email === email)) {
        alert('Email already exists. Please log in.');
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! You can now log in.');

    showLogin(); // Redirect to login form
}

// Login Functionality
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Login success - Show profile section
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;

        localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
        alert('Invalid email or password');
    }
}

// Automatically log in if user is already logged in
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('profile-section').style.display = 'block';
        document.getElementById('profile-name').textContent = loggedInUser.name;
        document.getElementById('profile-email').textContent = loggedInUser.email;
    }
});

// Logout Functionality
function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('profile-section').style.display = 'none';
    showLogin();
}
