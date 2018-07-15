document.getElementById('button').addEventListener('click', loadData);
var wordsList = document.querySelector('.t-body');
var total = document.querySelector('.total');
var messageSlot = document.querySelector('.message-slot');
document
  .querySelector('.backspace-btn')
  .addEventListener('click', removeLetter);
var totalPoints = 0;

const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'w',
  'x',
  'y'
];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let selectedChars = vowels.concat(consonants);
let shuffledChars = shuffle(selectedChars).slice(0, 17);
console.log(shuffledChars);

// Assign  empty string to search word
var searched_word = '';

// Assign empty string to table row
var tr = '';

// Assign empty array to words bank
var wordsBank = [];

// Assign zero to words count variable
var wordsCount = 0;

// Cache tiles on the board
var boxes = document.querySelectorAll('.square');

// Cache table body
var tbody = document.querySelector('.t-body');
//console.log(boxes);

/*
  Loop through each tile in the board
  and add click event to each tile
  when each tile is clicked add its text value, e.g.
  letter to a searched_word variable, e.g. 
  concatinating each clicked letter
*/
boxes.forEach(function(box) {
  box.addEventListener('click', function(e) {
    e.preventDefault();
    searched_word += this.innerHTML;
    document.querySelector('.input').value = searched_word;
    console.log(searched_word);
  });

  // Return value
  return searched_word;
});

// Remove letter
function removeLetter() {
  //console.log('clicked');
  let newStr = searched_word.slice(0, -1);
  searched_word = newStr;
  console.log(searched_word);
  document.querySelector('.input').value = searched_word;
  return (searched_word = newStr);
}

// Check if a word is n the array
function checkRepeatedWords(arr, newWord) {
  if (arr.includes(newWord)) {
    return true;
  }
}

function randomLetters(boxes) {
  for (var i = 0; i < boxes.length; i++) {
    let box = boxes[i];

    let randomLetterNumber = Math.floor(Math.random() * shuffledChars.length);
    box.innerHTML = shuffledChars[i].toLocaleUpperCase();
    //console.log(box);
    //console.log(randomLetterNumber);
  }
}

function createList(word, points, number) {
  // create TR elelment
  tr += `
  <tr>
    <th>${number}</th>
    <th>${word}</th>
    <th>${points}</th>
  </tr>
  `;
  wordsList.innerHTML = tr;
}

function highlightWord(target_word) {
  var tbody = document.querySelector('.t-body');
  var children = tbody.children;
  for (var i = 0; i < children.length; i++) {
    let child = children[i].children[1];
    let text = child.innerHTML;
    if (text === target_word) {
      console.log('repeated');
      child.classList.add('has-text-warning');
    }
    console.log(child);
    setTimeout(function() {
      child.classList.remove('has-text-warning');
    }, 2000);
  }
}

function showMessage(messageWord, className) {
  messageSlot.innerHTML += `
  <article class="message ${className}">
    <div class="message-header">
      <p>${messageWord}</p>
    </div>
  </article>
  `;
  setTimeout(function() {
    messageSlot.innerHTML = '';
  }, 2000);
}

function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'words_dictionary_full.json', true);
  xhr.onload = function() {
    if (this.status === 200) {
      const words = Object.keys(JSON.parse(this.responseText));
      //console.log(words);

      /*
      check if there is a word in the database
      and it is not repeated
      */
      if (
        binarySearch(words, searched_word.toLocaleLowerCase()) !== -1 &&
        !checkRepeatedWords(wordsBank, searched_word)
      ) {
        // Get number of points - number of points equal length of a word
        let wordsPoint = searched_word.length;

        // Call createList function, add words to the table on the left
        createList(searched_word, wordsPoint, wordsCount);
        showMessage('Correct', 'is-success');

        totalPoints += wordsPoint;
        total.innerHTML = totalPoints;
        // Push a new word into array
        wordsBank.push(searched_word);

        // Increment number of words in the table
        wordsCount += 1;

        // Clear searched word after submition
        searched_word = '';

        // Clear input after submition
        document.querySelector('.input').value = '';

        console.log(words);
        //console.log(wordsBank);
        //console.log('done');
      } else if (
        searched_word === '' &&
        document.querySelector('.input').value === ''
      ) {
        showMessage('Please write a word', 'is-warning');
      } else {
        // Highlight a word in a table if it is a repeated word
        highlightWord(searched_word);

        // Clear searched word
        searched_word = '';

        // Clear input
        document.querySelector('.input').value = '';
        showMessage('The Word was not found', 'is-warning');
      }
    }
  };
  xhr.send();
}

/*
  Binary search function
*/
function binarySearch(items, value) {
  var startIndex = 0,
    stopIndex = items.length - 1,
    middle = Math.floor((stopIndex + startIndex) / 2);

  while (items[middle] != value && startIndex < stopIndex) {
    //adjust search area
    if (value < items[middle]) {
      stopIndex = middle - 1;
    } else if (value > items[middle]) {
      startIndex = middle + 1;
    }

    //recalculate middle
    middle = Math.floor((stopIndex + startIndex) / 2);
  }

  //make sure it's the right value
  console.log(middle);
  return items[middle] != value ? -1 : middle;
}

// Calling random letters function
randomLetters(boxes);
