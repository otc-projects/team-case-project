window.onload = function() {
    
    document.getElementById("newsLttrBttn").addEventListener("click", function() {
        newsLetterSuccess(document.getElementById("newsLttrField").value);
    });
    
};

function newsLetterSuccess(e) {
    alert("You have successfully signed up for newsletters with " + e + ".\nNOTE: This was just a test you haven't signed up for anything.");
}