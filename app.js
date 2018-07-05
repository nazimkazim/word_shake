document.getElementById('button').addEventListener('click', loadData);
var wordsList = document.querySelector('.t-body');

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

var searched_word = '';
var tr = '';

var boxes = document.querySelectorAll('.square');
//console.log(boxes);

boxes.forEach(function(box) {
  box.addEventListener('click', function(e) {
    e.preventDefault();
    searched_word += this.innerHTML;
    document.querySelector('.input').value = searched_word;
  });

  console.log(searched_word);
  return searched_word;
});

function randomLetters(boxes) {
  for (var i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let randomLetterNumber = Math.floor(Math.random() * letters.length);
    box.innerHTML = letters[randomLetterNumber].toLocaleUpperCase();
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
    <th>${number}</th>
  </tr>
  `;
  wordsList.innerHTML = tr;
}

function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'words_dictionary_full.json', true);
  xhr.onload = function() {
    if (this.status === 200) {
      const words = Object.keys(JSON.parse(this.responseText));
      //console.log(words);

      // check if there is a word in the database
      if (binarySearch(words, searched_word.toLocaleLowerCase()) !== -1) {
        createList(searched_word, 1, 1);
        console.log('done');
      }

      searched_word = '';
      document.querySelector('.input').value = '';
    }
  };
  xhr.send();
}

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
  return items[middle] != value ? -1 : middle;
}

randomLetters(boxes);
