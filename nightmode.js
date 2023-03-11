const body = document.body;


const btnImg = document.querySelector("#nightMode img");
const toggleBtn = document.getElementById("nightMode");

const enableDarkMode = () => { 
    body.classList.add("dark");
    btnImg.src = "assets/sun-icon.svg";
    localStorage.setItem("dark-mode","enabled");
}
const removeDarkMode = () => {
    body.classList.remove("dark");
    btnImg.src = "assets/moon-icon.svg";
    localStorage.setItem("dark-mode", "disabled");
}


if(localStorage.getItem("dark-mode") === "enabled") enableDarkMode();
else if(localStorage.getItem("dark-mode") === "disabled") removeDarkMode();
else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) 
enableDarkMode();
//match media will return an object containes an object matches
else 
removeDarkMode();


toggleBtn.addEventListener("click", ()=>{
    if(localStorage.getItem("dark-mode") === "enabled") removeDarkMode();
    else enableDarkMode();
})