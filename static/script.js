const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());

function renderSchedule(students) {
    const tbody = document.querySelector("#schedule-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    students.sort((a, b) => a.classTime.localeCompare(b.classTime));

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.classTime}</td>
            <td>${student.classType}</td>
            <td>${student.instructor}</td>
        `;
        tbody.appendChild(row);
    });
}

async function loadSchedule() {
    try {
        const res = await fetch("/api/students");
        if (!res.ok) return;
        const students = await res.json();
        renderSchedule(students);
    } catch (e) {
        console.warn("Failed to load schedule", e);
    }
}

async function bookClass(formData) {
    try {
        const res = await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!res.ok) {
            throw new Error("Unable to book class");
        }

        return await res.json();
    } catch (err) {
        console.warn(err);
        throw err;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    loadSchedule();

    const bookingForm = document.querySelector("#booking-form");
    const bookingMessage = document.querySelector("#booking-message");

    if (bookingForm) {
        bookingForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(bookingForm);
            const payload = {
                name: formData.get("name") || "",
                classTime: formData.get("classTime") || "",
                classType: formData.get("classType") || "1h",
                instructor: formData.get("instructor") || "",
            };

            try {
                const created = await bookClass(payload);
                bookingMessage.textContent = `Booked ${created.name} at ${created.classTime}`;
                bookingMessage.className = "booking-message success";
                bookingForm.reset();
                loadSchedule();
            } catch (error) {
                bookingMessage.textContent = "Failed to book class. Please try again.";
                bookingMessage.className = "booking-message error";
            }
        });
    }

    const contactForm = document.querySelector("#contact-form");
    const contactMessage = document.querySelector("#contact-message");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            contactMessage.textContent = "Thanks for reaching out! We'll get back to you soon.";
            contactMessage.className = "contact-message success";
            contactForm.reset();
        });
    }
});
