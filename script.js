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
