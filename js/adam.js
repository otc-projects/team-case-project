var img = {
    Fennec_Fox_Small: "img/Fennec_Fox.jpg",
    fennec_running_sand_small: "img/fennec_running_sand.jpg",
    four_fennec_small: "img/four_fennec.jpg"
};

window.onload = function() {
    
    var thmbC = document.querySelector("div#thumbnailContainer");
    
    document.getElementById("newsLttrBttn").addEventListener("click", newsLetterSuccess, false);
    
    // Adds an event listener for each img element under the #thumbNailContainer div.
    var thumb = document.querySelectorAll("div#thumbnailContainer img");
    for (var i = 0; i < thumb.length; i++)
        thumb[i].addEventListener("click", thumbClick, false);
    
};

function newsLetterSuccess() {
    var e = document.getElementById("newsLttrField").value;
    document.querySelector("p:last-of-type").innerHTML = "You have successfully signed up for newsletters with " + e + ".";
}

function thumbClick() {
    // Get's the name of the image without the directory or extension.
    var name = this.getAttribute("src").split("/")[1].split(".")[0];
    var newImg = document.createElement("img");
    newImg.src = img[name];
    newImg.width = 640;
    
    // Removes the current enlarged image. and replaces it with the selected one.
    newImg.onload = function() {
        document.querySelector("div#imgContainer").removeChild(document.querySelector("div#imgContainer img"));
        document.querySelector("div#imgContainer").appendChild(newImg);
    };
}