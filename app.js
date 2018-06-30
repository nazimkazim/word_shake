document.getElementById('button').addEventListener('click', loadData);

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

var word = '';

var boxes = document.querySelectorAll('.square');
//console.log(boxes);

function clickBox() {
  boxes.forEach(function(box) {
    box.addEventListener('click', function(e) {
      e.preventDefault();
      console.log(this.innerHTML);
    });
  });
}

function randomLetters(boxes) {
  for (var i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let randomLetterNumber = Math.floor(Math.random() * letters.length);
    box.innerHTML = letters[randomLetterNumber].toLocaleUpperCase();
    //console.log(box);
    console.log(randomLetterNumber);
  }
}

function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'words_dictionary.json', true);
  xhr.onload = function() {
    if (this.status === 200) {
      const words = JSON.parse(this.responseText);
      for (word in words) {
        console.log(word);
      }
    }
  };
  xhr.send();
}

randomLetters(boxes);
clickBox(boxes);
