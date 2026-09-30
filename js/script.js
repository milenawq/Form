const form = document.getElementById("adForm");
const title = document.getElementById("title");
const agreement = document.getElementById("agreement");
const submitButton = document.getElementById("submitButton");
const image = document.getElementById("image");
const preview = document.getElementById("preview");

function checkForm() {
    submitButton.disabled = title.value.trim() === "" || !agreement.checked;
}

title.addEventListener("input", checkForm);
agreement.addEventListener("change", checkForm);

image.addEventListener("change", function () {
    const file = image.files[0];

    if (!file) {
        preview.innerHTML = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        preview.innerHTML = `<img src="${reader.result}" width="300">`;
    };

    reader.readAsDataURL(file);
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);

    const selectedType = form.querySelector(
        'input[name="type"]:checked'
    ).value;

    if (selectedType === "Термінова") {
        formData.append("timestamp", new Date().toISOString());
    }

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    form.reset();
    preview.innerHTML = "";
    submitButton.disabled = true;
});

form.addEventListener("reset", function () {
    setTimeout(function () {
        preview.innerHTML = "";
        submitButton.disabled = true;
    }, 0);
});
