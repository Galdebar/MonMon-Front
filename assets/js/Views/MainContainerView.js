export function createWebElement(){
    let main = document.createElement("main");
    let colorOverlay = document.createElement("div");

    colorOverlay.setAttribute("id", "main-color-overlay");
    colorOverlay.classList.add("hidden");

    main.appendChild(colorOverlay);

    return main;
}