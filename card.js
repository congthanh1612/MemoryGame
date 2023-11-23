import { Node } from "./node.js";
import { Sprite } from "./sprite.js";
import { Label } from "./label.js";

export class Card {
  constructor(imageSrc, x, y,index) {

    this._imageSrc = imageSrc;
    this.node = new Node();
    this.cover = new Node();
    this.image = new Sprite();
    this.text = new Label();
    this.restartButton = new Node();
    this.node.elm.appendChild(this.cover.elm);
    this.node.elm.appendChild(this.image.elm);
    this.node.elm.appendChild(this.text.elm);
    document.body.appendChild(this.node.elm);
    Card.WIDTH = 130;
    Card.HEIGHT = 130;
    Card.x = x;
    Card.y = y;
  }


  createCard() {
    this.image.width = Card.WIDTH;
    this.image.height = Card.HEIGHT;
    this.image.x = Card.x;
    this.image.y = Card.y;
    this.image.imageSrc = this._imageSrc;
    this.image.scaleX = 0;

    this.cover.width = Card.WIDTH;
    this.cover.height = Card.HEIGHT;
    this.cover.x = Card.x;
    this.cover.y = Card.y;
    this.cover.elm.style.backgroundColor = '#006666';
    this.cover.scaleX = 1;

    this.text.width = Card.WIDTH;
    this.text.height = Card.HEIGHT;
    this.text.x = 709;
    this.text.y = 205;
  }
}

let cardImages = Array.from({ length: 10 }, (_, index) => `images/image${index + 1}.png`);
cardImages = cardImages.concat(cardImages.slice(0));
let flippedCards = [];
const cards = [];
let matchedPairs = 0;
let score = 10000;
let lockBoard = false;

document.getElementById('score').innerHTML = 'Score: ' + score;
// shuffle(cardImages);

function startGame() { 
  const width = 150; 
  const height = 150; 
  const startX = 350; 
  const startY = 300; 
  let card = new Card("", startX + width * 2, height); 
  card.createCard();   
  cardImages.forEach((src, index) => { 
    updateCard(card, src, index, index === cardImages.length - 1); 
  }); 
} 
 
function updateCard(card, src, index, isFinished) { 
  gsap.to(card.node.elm, { 
    duration: 1, 
    delay: index * 0.1, 
    onComplete: () => { 
      card.text.setText(`${index + 1}`);
      // card.image.imageSrc = src; 
      card.text.scaleX = 1; 
      if (isFinished) { 
        initCards(); 
        card.node.elm.style.display = 'none';
      } 
    }, 
  }) 
} 
startGame();

function initCards(){
  cardImages.forEach((src, index) => { 
    const width = 150; 
    const height = 150; 
    const startX = 350; 
    const startY = 300; 
    let card = new Card(src, startX + width * 2, height); 
    card.createCard(); 
    card.node.elm.addEventListener('click', flipCard) 
    cards.push(card); 
    movingCard(card, index); 
  }); 
}
 
function movingCard(card, index, width = 165, height = 165) { 
  gsap.to(card.node.elm, { 
    duration: 1, 
    delay: index * 0.2  , 
    x: (index % 5 - 2) * width, 
    y: (Math.floor(index / 5) - 1.5) * height, 
    ease: 'elastic.out(1, 0.5)', 
    onComplete: () => { 
      console.log('Animation complete'); 
    }, 
  }) 
}

const duration = 0.3;
function flipCard() {
  if (lockBoard) return;
  lockBoard = true;
  const selectedCard = this;
  let currentCard = cards.find((card) => card.node.elm == selectedCard);
  let cover = currentCard.cover.elm;
  let image = currentCard.image.elm;

  if (flippedCards.length < 2 && currentCard.cover.active) {
    gsap.to(cover, { scaleX: 0, duration })
    gsap.to(image, {
      scaleX: 1, duration, delay: duration, onComplete: () => {
        flippedCards.push(currentCard);
        if (flippedCards.length === 2) {
          checkMatch();
        } else {
          lockBoard = false;
        }
      }
    })
  }
}


function checkMatch() {
  lockBoard = true;
  const [card1, card2] = flippedCards;
  if (card1._imageSrc === card2._imageSrc) {
    card1.node.elm.removeEventListener("click", flipCard);
    card2.node.elm.removeEventListener("click", flipCard);

    let isZoomed = false;
    let imageCard1 = card1.image.elm;
    let imageCard2 = card2.image.elm;

    if (!isZoomed) {
      imageCard1.style.transition = 'transform 1.5s ease-in-out, opacity 1.5s ease-in-out';
      imageCard1.style.transform = 'scale(1.5) translate(-10%, -10%)';
      imageCard1.style.opacity = '2';
      imageCard2.style.transition = 'transform 1.5s ease-in-out, opacity 1.5s ease-in-out';
      imageCard2.style.transform = 'scale(1.5) translate(-10%, -10%)';
      imageCard2.style.opacity = '2';
      isZoomed = true;
      setTimeout(() => {
        imageCard1.style.opacity = '0';
        imageCard2.style.opacity = '0';
        lockBoard = false;
      }, 1500);
    }
    score = updateScore(1000);
    matchedPairs++;
    if (matchedPairs === cardImages.length-10) {
      alert("You win 🎉🎉! Refresh to start again.");
      setTimeout(() => {
        location.reload(true);
      }, 1000);
      console( matchedPairs===20);
    }
  } else {
    gsap.to(card1.image.elm, { scaleX: 0, duration })
    gsap.to(card2.image.elm, {
      scaleX: 0, duration, onComplete: () => {
        gsap.to(card1.cover.elm, { scaleX: 1, duration })
        gsap.to(card2.cover.elm, { scaleX: 1, duration })
        lockBoard = false;
      }
    })

    score = updateScore(-500);
    if (score < 0) {
      alert('You lose ! Refresh to try again');
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  }

  flippedCards = [];
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function updateScore(newUpdateScore) {
  let result = score + newUpdateScore;
  document.getElementById('score').innerHTML = 'Score: ' + result;
  return score + newUpdateScore;
}

