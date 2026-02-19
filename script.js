const form = document.getElementById("medicineForm");
const medicineList = document.getElementById("medicineList");
let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

 function displayMedicines() {
    medicineList.innerHTML = "";

    medicines.forEach((med, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${med.name} - ${med.dosage} 
            <button onclick="markAsTaken(${index})">
                ${med.taken ? "Taken ✅" : "Mark as Taken"}
            </button>
        `;

        medicineList.appendChild(li);
    });
    updateAdherence();

}
function markAsTaken(index) {
    medicines[index].taken = true;
    localStorage.setItem("medicines", JSON.stringify(medicines));
    displayMedicines();
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("medicineName").value;
    const dosage = document.getElementById("dosage").value;

    medicines.push({ name: name, dosage: dosage,taken: false });
    localStorage.setItem("medicines", JSON.stringify(medicines));

    form.reset();
    displayMedicines();
});

displayMedicines();
updateAdherence();
document.getElementById("progressFill").style.width = percentage + "%";

function updateAdherence() {
    const total = medicines.length;
    const taken = medicines.filter(med => med.taken).length;

    const percentage = total === 0 ? 0 : Math.round((taken / total) * 100);

    document.getElementById("adherence").textContent =
        "Adherence: " + percentage + "%";
}


