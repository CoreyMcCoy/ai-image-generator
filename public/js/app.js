// Get the form and add a submit event listener
function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '' || size === '') {
        window.alert('Uh oh, enter a description and select a size');
        return;
    }

    generateImageRequest(prompt, size);
}

// Make a request to the server to generate an image
async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, size }),
        });

        if (!response.ok) {
            removeSpinner();
            throw new Error('The image could not be generated');
        }

        const data = await response.json();
        // console.log(data);

        const imageUrl = data.data;

        // Set image src to the imageUrl
        document.querySelector('#image').src = imageUrl;

        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}

// Show spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

// Remove spinner
function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Add event listener to form
document.querySelector('#image-form').addEventListener('submit', onSubmit);
