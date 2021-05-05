"use strict";

/*
   
   Word Search Game Script
   
   Global Variables
   
   allCells
      References all of the cells in the word search table
      
   found
      Stores a Boolean value indicating whether the currently
      selected letters represents a word in the word search list.
     
   Function List
   
   function drawWordSearch(letters, words)
      Returns the HTML code for a word search table based on the entries
      in the letters array and the location of the words
      in the words array
      
   showList(list)
      Returns the HTML for code for an unordered list of words based
      on the items in the list array

*/

var allCells; /* references all of the cells in the word search table. */
var found = false; /* references all of the cells in the word search table. */

window.onload = init;

function init() { /* calls the above functions to display the title, the game board, and the word list. */
   document.querySelectorAll("aside h1")[0].innerHTML = wordSearchTitle;
   document.getElementById("wordTable").innerHTML = drawWordSearch(letterGrid, wordGrid);
   document.getElementById("wordList").innerHTML = showList(wordArray);

   allCells = document.querySelectorAll("table#wordSearchTable td");
   
   //MY CODE STARTS HERE
   document.styleSheets[0].insertRule("body { webkit-user-select: none; moz-user-select: none; o-user-select: none; user-select: none; }")
   // adds style element to remove highlighting


   var cellID = []; // stores the cellID for highlighting correct words as green
   var strArr = []; // stores the string to display characters in textbox
   var str = ""; // used with strArr to store word
   var mouseDown = 0; // 1 = mouseDown    0 = mouseUp
   var count = 0; // increments when a user finds a word
   var submitButton = document.getElementById("showSolution"); // used to show solution

   for(let i=0 ; i<allCells.length ; i++) {
      allCells[i].style.cursor = "pointer"; // changes cursor to hand
      allCells[i].onmouseover = function(event) { // MOUSEOVER
         if (mouseDown == 1) { // while mouse down is activated
            if (event.target.found != true) {
               event.target.style.backgroundColor = "pink"; // highlights cells pink
            }
            strArr.push(allCells[i].innerHTML); // stores the chars 
            str = strArr.join(""); // used for comparison
            document.getElementById("pickedLetters").value = str;
            cellID.push(i);
         }
      }

      allCells[i].onmousedown = function(event) { // MOUSEDOWN
         if (event.target.found != true) {
            event.target.style.backgroundColor = "pink"; // highlights cells pink
         }
         mouseDown = 1; // mouse down is activated
         strArr.push(allCells[i].innerHTML); // stores the chars 
         str = strArr.join(""); // used for comparison
         document.getElementById("pickedLetters").value = str; 
         cellID.push(i);
      }

      allCells[i].onmouseup = function() { // MOUSEDOWN RELEASED
         mouseDown = 0; // not activated
         if(wordArray.includes(str)){ // if string is correct
            for (let x=0 ; x<cellID.length ; x++) {
               allCells[cellID[x]].style.backgroundColor = "lightgreen"; // sets those selected cells backgroundColor to lightgreen
               allCells[cellID[x]].found = true; // permanent 
            }
            document.getElementById("wordList").innerHTML = document.getElementById("wordList").innerHTML.replace(str, str.strike()); // crosses out text 
            document.getElementById("wordList").innerHTML = document.getElementById("wordList").innerHTML.replace(str, str.fontcolor("gray")); // grays out text

            count += 1; // increments count
            if (count == wordArray.length) { // solved all
               alert("Congratulations, you finished!"); 
            }
         }
         else { // if not correct, sets backgroundColor back to white
            for (let x=0 ; x<cellID.length ; x++) {
               if (allCells[cellID[x]].found != true) {
                  allCells[cellID[x]].style.backgroundColor = "white";
               }
            }
         }
         cellID = []; // emptys
         strArr = []; // emptys
         str = " " // empty
         document.getElementById("pickedLetters").value = str; // emptys
      }

      submitButton.onmousedown = function(event) { //solves crossword puzzle
         var solve = document.getElementsByClassName("wordCell");
         for (let i=0 ; i<solve.length ; i++) {
            solve[i].setAttribute("style", "background-color: lightblue;");
         }
      }
   } // end of for loop
} // end of init()

/*============================================================*/

/* writes the HTML code for a table (with id="wordSearchTable") 
containing the letters in the word search puzzle. That is your puzzle board. */
function drawWordSearch(letters, words) {
   var rowSize = letters.length;
   var colSize = letters[0].length;

   var htmlCode = "<table id='wordSearchTable'>";
   htmlCode += "<caption>Word Search</caption>";

   for (var i = 0; i < rowSize; i++) {
      htmlCode += "<tr>";

      for (var j = 0; j < colSize; j++) {
         if (words[i][j] == " ") {
            htmlCode += "<td>";
         } else {
            htmlCode += "<td class='wordCell'>";
         }
         htmlCode += letters[i][j];
         htmlCode += "</td>";
      }

      htmlCode += "</tr>";
   }
   htmlCode += "</table>";

   return htmlCode;
}

/* writes the HTML code for an unordered list (with id="wordSearchList")
containing the words to be found in the puzzle. */
function showList(list) {
   var htmlCode = "<ul id='wordSearchList'>";

   for (var i = 0; i < list.length; i++) {
      htmlCode += "<li>" + list[i] + "</li>";
   }

   htmlCode += "</ul>";

   return htmlCode;
}
