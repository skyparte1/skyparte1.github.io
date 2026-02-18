document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            card.style.transition = "all 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 150);
    });
});

const emailElement = document.querySelector(".email");

if (emailElement) {
    emailElement.addEventListener("click", () => {
        const email = emailElement.textContent;
        navigator.clipboard.writeText(email);
        alert("Email copiado!");
    });
}
