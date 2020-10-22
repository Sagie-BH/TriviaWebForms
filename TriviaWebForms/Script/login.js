const isPostBack = document.getElementById('_ispostback').value;
const regElementsArray = Array.from(document.getElementsByClassName('register'));
const submitBtn = document.getElementById("submitBtn");
const regCheckBox = document.getElementById('isRegister');

document.addEventListener("DOMContentLoaded", () => {
    Array.from(document.getElementsByClassName('validators')).forEach(validator => {
        if (validator.style.visibility != 'hidden') {
            document.getElementById('submit-grid').classList.remove('bounceInLeft');
        }
        else {
            document.getElementById('submit-grid').classList.add('tada');
        }
    })
    // Displaying previos view
    if (isPostBack.toLowerCase() == 'true' && regCheckBox.checked) {
        regElementsArray.forEach(elememt => {
            elememt.classList.remove('hide');
            submitBtn.value = 'Register';
        });
    }
});

// Register CheckBox - Hiding\Revealing FullName & Psaaword Confirmation
regCheckBox.addEventListener('change', (e) => {
    if (e.target.checked) {
        regElementsArray.forEach(elememt => {
            elememt.classList.remove('hide');
            submitBtn.value = 'Register';
        });
    }
    else {
        regElementsArray.forEach(elememt => {
            elememt.classList.add('hide');
            submitBtn.value = 'Submit';
        });
    }
})

