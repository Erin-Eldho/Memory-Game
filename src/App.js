import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import useGameStore from './store/gameStore'; // Import Zustand store
import { Link } from 'react-router-dom'; // Import Link for navigation

const cardImages = [
  { "src": "/img/bee.png", matched: false },
  { "src": "/img/chick.png", matched: false },
  { "src": "/img/dog.png", matched: false },
  { "src": "/img/dolphin.png", matched: false },
  { "src": "/img/elephant.png", matched: false },
  { "src": "/img/snake.png", matched: false },
  { "src": "/img/stitch.png", matched: false },
  { "src": "/img/turtle.png", matched: false }
];

function App() {
  const { boardSize } = useGameStore(); // Get boardSize from Zustand store
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Calculate the number of pairs needed based on boardSize
  const numberOfPairs = Math.floor((boardSize * boardSize) / 2);

  // Shuffle cards
  const shuffleCards = () => {
    const selectedImages = cardImages.slice(0, numberOfPairs); // Select only the number of pairs needed
    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Start game automatically when board size changes
  useEffect(() => {
    shuffleCards();
  }, [boardSize]); // Re-shuffle cards when boardSize changes

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Link to="/">Open Settings</Link> {/* Link to Settings page */}
      <button onClick={shuffleCards}>New Game</button>

      <div
        className="card-grid"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`
        }}
      >
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;