import { Node } from "./node";

class Button extends Node {
  constructor(text) {
    super();
    this.renderButton();
    this.restartGame();
    this.resetGameState();
    }
    renderButton() {
    this.resetButton = document.createElement('button');
    this.resetButton.innerText = 'Restart Game';
    this.resetButton.addEventListener('click', () => this.restartGame());
    document.body.appendChild(this.resetButton);
    }
  
    restartGame() {
    this.resetGameState();
    this.startGame();
    }
    resetGameState() {
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.score = 10000;
    this.lockBoard = false;
    // this.updateScore();
    this.cards.forEach(card => {
      card.node.elm.remove();
    });
    this.cards.length = 0;
    }
}
