"use strict"
/*
File name: eric.js
Author: Eric Guo
Date: Sep 15, 2018

This file server some functions for improve the users experiences.
Add dynamic short facts on page, depending on date of visiting.

 */

const factsAmount = 3; //indicate how many facts can be used in the showing circle

function determineFact (){
    var currentDate = new Date();
    var nDay = currentDate.getDay();
    var number = nDay % factsAmount;
    return number;
}

//match infomation with the parameter
function sendFacts (num){
    var fact = "Elephants are the largest land mammals.";

    switch (num){
        case factsAmount-1:
            fact = "Elephants are the largest land mammals.";
            break;
        case factsAmount-2:
            fact = "Elephants love to swim, bathe and play in rivers.";
            break;
        case factsAmount-3:
            fact = "Elephants love bananas.";
    }
    return fact;
}

window.onload = function(){
    var number = determineFact();
    alert("Do you know?\n    " + sendFacts(number));
}