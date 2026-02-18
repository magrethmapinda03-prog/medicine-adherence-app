const form = document.getElementById("medicineForm");
const medicineList = document.getElementById("medicineList");
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

function displayMedicines() {
    medicineList.innerHTML = "";

    medicines.forEach((med, index) => {
        const li = document.createElement("li");
        li.textContent = med.name + " - " + med.dosage;
        medicineList.appendChild(li);
    });
}
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("medicineName").value;
    const dosage = document.getElementById("dosage").value;

    medicines.push({ name: name, dosage: dosage });
    localStorage.setItem("medicines", JSON.stringify(medicines));

    form.reset();
    displayMedicines();
});

displayMedicines();

