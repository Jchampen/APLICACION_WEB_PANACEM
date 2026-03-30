document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("mainNav");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const handleNavbarShadow = () => {
        if (!navbar) {
            return;
        }
        navbar.classList.toggle("scrolled", window.scrollY > 8);
    };

    handleNavbarShadow();
    window.addEventListener("scroll", handleNavbarShadow);

    const revealItems = document.querySelectorAll(".reveal-item");
    if ("IntersectionObserver" in window && revealItems.length > 0) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add("was-validated");
                if (formStatus) {
                    formStatus.textContent = "Revisa los campos requeridos.";
                    formStatus.classList.remove("text-success");
                    formStatus.classList.add("text-danger");
                }
                return;
            }

            contactForm.classList.remove("was-validated");
            contactForm.reset();

            if (formStatus) {
                formStatus.textContent = "Mensaje enviado correctamente.";
                formStatus.classList.remove("text-danger");
                formStatus.classList.add("text-success");
            }
        });
    }
});