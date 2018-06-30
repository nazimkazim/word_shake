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

var searched_word = '';

var boxes = document.querySelectorAll('.square');
//console.log(boxes);

function clickBox() {
  boxes.forEach(function(box) {
    box.addEventListener('click', function(e) {
      e.preventDefault();
      //console.log(this.innerHTML);
      //return this.innerHTML;
      searched_word += this.innerHTML;
      console.log(searched_word);
    });
  });
  return searched_word;
}

function randomLetters(boxes) {
  for (var i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    let randomLetterNumber = Math.floor(Math.random() * letters.length);
    box.innerHTML = letters[randomLetterNumber].toLocaleUpperCase();
    //console.log(box);
    //console.log(randomLetterNumber);
  }
}

function loadData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'words_dictionary.json', true);
  xhr.onload = function() {
    if (this.status === 200) {
      const words = JSON.parse(this.responseText);
      for (word in words) {
        //console.log(word);
        if (word === clickBox().toLowerCase()) {
          console.log('true');
        } else {
          console.log('false');
        }
      }
    }
  };
  xhr.send();
}

randomLetters(boxes);
console.log(clickBox());
