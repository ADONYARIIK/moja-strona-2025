document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY < 50) {
            header.style.height = '20vh';
            header.style.opacity = '1';
        } else {
            header.style.height = '0vh';
            header.style.opacity = '0';
        }
    });


    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('animate__fadeOut');
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                entry.target.classList.remove('animate__fadeIn');
                entry.target.classList.add('animate__animated', 'animate__fadeOut');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));


    document.getElementById("toggleInfo").addEventListener("click", function () {
        const info = document.getElementById("extraInfo");
        if (info.classList.contains("hidden")) {
            info.classList.remove("hidden");
            this.textContent = "Ukryj informacje";
        } else {
            info.classList.add("hidden");
            this.textContent = "Pokaż więcej informacji";
        }
    });
});