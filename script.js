const form = document.getElementById("medicineForm");
const medicineList = document.getElementById("medicineList");
const adherenceText = document.getElementById("adherencePercentage");
const progressFill = document.getElementById("progressFill");

let medicines = JSON.parse(localStorage.getItem("medicines")) || [];

// DISPLAY
function displayMedicines() {
    medicineList.innerHTML = "";

    medicines.forEach((medicine, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${medicine.name}</strong> - ${medicine.dosage}<br>
            Dose Time: ${medicine.time || "Not set"}<br>
            ${medicine.takenAt ? "Taken at: " + medicine.takenAt : ""}
            <button onclick="markTaken(${index})" class="btn secondary">
                ${medicine.taken ? "Taken ✓" : "Mark as Taken"}
            </button>
        `;

        medicineList.appendChild(li);
    });

    updateAdherence();
}

// MARK TAKEN
function markTaken(index) {
    medicines[index].taken = true;
    medicines[index].takenAt = new Date().toLocaleTimeString();

    localStorage.setItem("medicines", JSON.stringify(medicines));
    displayMedicines();
}

// FORM SUBMIT
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("medicineName").value;
    const dosage = document.getElementById("dosage").value;
    const time = document.getElementById("doseTime").value;

    medicines.push({
        name: name,
        dosage: dosage,
        time: time,
        taken: false,
        takenAt: null
    });

    localStorage.setItem("medicines", JSON.stringify(medicines));

    form.reset();
    displayMedicines();
});

// ADHERENCE
function updateAdherence() {
    const total = medicines.length;
    const taken = medicines.filter(med => med.taken).length;

    const percentage = total === 0 ? 0 : Math.round((taken / total) * 100);

    adherenceText.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";
}

// INITIAL LOAD
displayMedicines();
const waitlistForm = document.getElementById("waitlistForm");

if (waitlistForm) {
  waitlistForm.addEventListener("submit", function (e) {
    e.preventDefault(); // ⛔ stops page reload

    const name = document.getElementById("waitlistName").value.trim();
    const email = document.getElementById("waitlistEmail").value.trim();

    if (!name || !email) return;

    const waitlist =
      JSON.parse(localStorage.getItem("waitlist")) || [];

    waitlist.push({
      name,
      email,
      joinedAt: new Date().toISOString()
    });

    localStorage.setItem("waitlist", JSON.stringify(waitlist));

    waitlistForm.reset();
    alert("You're on the waitlist!");
  });
}