const slider = document.querySelector('.brightness');
const value = document.querySelector('.brightness-value');
const main = document.querySelector('main');

function updateSlider() {
    const val = slider.value;
    value.textContent = val;
    slider.style.background = `linear-gradient(to right, var(--secondary-200) ${val}%, #e0e0e0 ${val}%)`;

    // Add this line
    main.style.filter = `brightness(${val / 100})`;
}

slider.addEventListener('input', updateSlider);
updateSlider();


const themes = [
    {
        "--primary-100": "#FEE4D7",
        "--primary-200": "#FFC7A8",
        "--primary-300": "#FF9B70",
        "--primary-400": "#7A1F4E",
        "--secondary-100": "#2D1B3F",
        "--secondary-200": "#C49BDD"
    },
    {
        "--primary-100": "#DFF6FF",
        "--primary-200": "#A5E8FF",
        "--primary-300": "#6FD2F7",
        "--primary-400": "#00394D",
        "--secondary-100": "#1C2A3A",
        "--secondary-200": "#AAC4D1"
    },
    {
        "--primary-100": "#E1F5E4",
        "--primary-200": "#B5E6C5",
        "--primary-300": "#7FCC9D",
        "--primary-400": "#1C4B28",
        "--secondary-100": "#203322",
        "--secondary-200": "#C7DCC6"
    },
    {
        "--primary-100": "#EDE4FF",
        "--primary-200": "#D2B8FF",
        "--primary-300": "#A585FF",
        "--primary-400": "#3B1C75",
        "--secondary-100": "#251B3A",
        "--secondary-200": "#C3B5DD"
    },
    {
        "--primary-100": "#FFE5E7",
        "--primary-200": "#FFB8BE",
        "--primary-300": "#FF6A74",
        "--primary-400": "#4A0A0F",
        "--secondary-100": "#2B0D12",
        "--secondary-200": "#D4A3A7"
    },
    {
        "--primary-100": "#D7F5F0",
        "--primary-200": "#A4E8DB",
        "--primary-300": "#60D4C2",
        "--primary-400": "#0E4D47",
        "--secondary-100": "#123A39",
        "--secondary-200": "#B4D4D2"
    }
];



let themeBtn = document.querySelector(".theme-btn");
let rootElem = document.documentElement;

function applyTheme(theme) {
    for (let key in theme) {
        rootElem.style.setProperty(key, theme[key]);
    }
}

let index = 0;

themeBtn.addEventListener("click", () => {
    applyTheme(themes[index]);
    index = (index + 1) % themes.length;
});


let windowIcon = document.querySelector("#window-icon");
let centerSection = document.querySelector(".center-section");

let powerIcon = document.querySelector("#power-icon");
let leftSection = document.querySelector(".left-section");

let trayIcon = document.querySelector("#tray-icon");
let rightSection = document.querySelector(".right-section");

toggleSections(windowIcon, centerSection, "active-center");
toggleSections(powerIcon, leftSection, "active-left");
toggleSections(trayIcon, rightSection, "active-right");

function toggleSections(elem, section, classs) {
    elem.addEventListener("click", (e) => {
        e.stopPropagation();
        section.classList.toggle(classs);
    })
}

centerSection.addEventListener("click", (e) => e.stopPropagation());
leftSection.addEventListener("click", (e) => e.stopPropagation());
rightSection.addEventListener("click", (e) => e.stopPropagation());

main.addEventListener("click", () => {
    centerSection.classList.remove("active-center");
    leftSection.classList.remove("active-left");
    rightSection.classList.remove("active-right");
})

const audio = new Audio("Song.mp3");
let play = document.querySelector("#play");

play.addEventListener("click", () => {
    play.classList.toggle("fa-pause");
    play.classList.toggle("fa-play");

    // If ended → restart from start and play
    if (audio.ended) {
        audio.currentTime = 0;
        audio.play();
        return;
    }

    // Toggle play/pause
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
})


let contextMenu = document.querySelector(".context-menu");

main.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    
    // Get cursor position
    let x = e.clientX;
    let y = e.clientY;
    
    // Get menu dimensions
    let menuWidth = 280;
    let menuHeight = 400;
    
    // Get viewport dimensions
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    // Default transform origin
    let originX = "left";
    let originY = "top";
    
    // Check if menu goes beyond right edge
    if (x + menuWidth > windowWidth) {
        x = windowWidth - menuWidth - 10;
        originX = "right";
    }
    
    // Check if menu goes beyond bottom edge
    if (y + menuHeight > windowHeight) {
        y = windowHeight - menuHeight - 10;
        originY = "bottom";
    }
    
    // Set transform origin and position
    contextMenu.style.transformOrigin = `${originX} ${originY}`;
    contextMenu.style.left = x + "px";
    contextMenu.style.top = y + "px";
    
    // Toggle menu (if open, close then reopen)
    if (contextMenu.classList.contains("active-menu")) {
        contextMenu.classList.remove("active-menu");
        setTimeout(() => {
            contextMenu.classList.add("active-menu");
        }, 50);
    } else {
        contextMenu.classList.add("active-menu");
    }
});

// Close menu on click outside
document.addEventListener("click", () => {
    contextMenu.classList.remove("active-menu");
});