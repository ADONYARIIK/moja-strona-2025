document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        const maxScroll = 150;

        const progress = Math.min(scrollY / maxScroll, 1);

        const scale = 1 - 0.5 * progress;
        const translateY = -300 * progress;
        const opacity = 1 - progress;

        header.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        header.style.opacity = opacity;
    });

    const headerTextElements = document.querySelectorAll('.typewriter-header');

    function typeSequentially(elements, speed, i = 0) {
        if (i >= elements.length) return;

        const el = elements[i];
        const text = el.dataset.text;
        let index = 0;
        el.textContent = '';

        const interval = setInterval(() => {
            el.textContent += text.charAt(index);
            index++;
            if (index >= text.length) {
                clearInterval(interval);
                el.style.borderRight = 'none';
                typeSequentially(elements, speed, i + 1);
            }
        }, speed);
    }

    typeSequentially(headerTextElements, 100);

    function typeSequentiallyOnceInView(elements, speed = 60) {
        let index = 0;

        function typeNext() {
            if (index >= elements.length) return;
            const el = elements[index];
            const text = el.dataset.text;
            el.classList.remove('hiddenText');
            el.classList.add('visibleText');
            el.textContent = '';
            let charIndex = 0;

            const interval = setInterval(() => {
                el.textContent += text.charAt(charIndex);
                charIndex++;
                if (charIndex >= text.length) {
                    clearInterval(interval);
                    el.style.borderRight = 'none';
                    index++;
                    typeNext();
                }
            }, speed);
        }

        return typeNext;
    }

    const mainTextElements = Array.from(document.querySelectorAll('.typewriter.hiddenText'));
    const typeNextInMain = typeSequentiallyOnceInView(mainTextElements);

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                obs.disconnect();
                typeNextInMain();
            }
        });
    }, {
        threshold: 0.1
    });

    if (mainTextElements.length) {
        observer.observe(mainTextElements[0]);
    }

});
