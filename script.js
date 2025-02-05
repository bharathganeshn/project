document.addEventListener("DOMContentLoaded", function() {
    let isRegister = false;
    let fieldCount = 0;

    const authSection = document.getElementById('authSection');
    const formSection = document.getElementById('formSection');
    const logoutButton = document.getElementById('logoutButton');
    const formTitle = document.getElementById('formTitle');
    const nameInput = document.getElementById('name');
    const toggleText = document.querySelector('.toggle');
    const authForm = document.getElementById('authForm');
    const addFieldButton = document.getElementById('addField');
    const formContainer = document.getElementById('formContainer');
    const submitFormButton = document.getElementById('submitForm');
    const resultsDiv = document.getElementById('results');

    toggleText.addEventListener("click", function() {
        isRegister = !isRegister;
        formTitle.textContent = isRegister ? 'Register' : 'Login';
        nameInput.style.display = isRegister ? 'block' : 'none';
        toggleText.textContent = isRegister ? 'Already have an account? Login' : "Don't have an account? Register";
    });

    authForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (!isRegister) {
            authSection.style.display = 'none';
            formSection.style.display = 'block';
            logoutButton.style.display = 'block';
        } else {
            alert('Registration successful! You can now log in.');
            toggleText.click();
        }
    });

    logoutButton.addEventListener("click", function() {
        authSection.style.display = 'block';
        formSection.style.display = 'none';
        logoutButton.style.display = 'none';
    });

    addFieldButton.addEventListener("click", function() {
        fieldCount++;
        const inputType = document.getElementById('inputType').value;
        const fieldLabel = prompt("Enter label for the field:");
        if (!fieldLabel) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'form-field';
        
        const label = document.createElement('label');
        label.textContent = fieldLabel;
        
        let input;
        if (inputType === 'textarea') {
            input = document.createElement('textarea');
        } else {
            input = document.createElement('input');
            input.type = inputType;
        }
        input.id = `field${fieldCount}`;
        input.placeholder = `Enter ${fieldLabel}`;
        input.className = 'form-input';
        input.required = true;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        formContainer.appendChild(wrapper);
    });

    submitFormButton.addEventListener("click", function() {
        const inputs = formContainer.querySelectorAll('.form-input, textarea, input[type=checkbox]:checked, input[type=radio]:checked');

        if (inputs.length === 0) {
            alert("Please add fields to the form before submitting.");
            return;
        }

        let formData = "<h3>Submitted Data:</h3><ul>";
        inputs.forEach(input => {
            const label = input.previousElementSibling ? input.previousElementSibling.textContent : 'Field';
            formData += `<li><strong>${label}:</strong> ${input.value}</li>`;
        });
        formData += "</ul>";

        resultsDiv.innerHTML = formData;
        resultsDiv.style.display = 'block';
    });
    async function submitDataToBackend() {
        const formData = [...document.querySelectorAll('.form-input')].map(input => input.value);
    
        const response = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: formData })
        });
    
        const result = await response.json();
        alert(result.message);
    }
});
