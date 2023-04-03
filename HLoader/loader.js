function showLoader(loadstring=""){
    document.querySelector("light").innerHTML=loadstring
    console.log(document.querySelector("light"));
    fullscreen.classList.remove("hidden")
    setTimeout(function () {
        fullscreen.classList.remove("opasity0")
    },1000)
}

function hideLoader(params) {
    setTimeout(function () {
        fullscreen.classList.add("opasity0")
    },3000)

    setTimeout(function () {
        fullscreen.classList.add("hidden")
    },5000) 
} 