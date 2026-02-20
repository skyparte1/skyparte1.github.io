window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});


const reveals = document.querySelectorAll(".card");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < windowHeight - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


reveals.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});
