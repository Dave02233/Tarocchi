import React, { useState } from "react";
import { cardImageNames } from "./Cards";
import questionAPI from "./Gemini/GeminiAPI"

function App() {
  const [showCards, setShowCards] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [pickedCards, setPickedCards] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleDestroyEverything = () => {
    setShowCards(false);
    setInputValue('');
    setPickedCards([]);
    setQuestion('');
    setAnswer('');
  }

  const handleClick = async () => {
    if (!showCards) {
      try {
        const newCardsIndexes = [];
        while (newCardsIndexes.length < 3) {
          const randomIndex = Math.floor(Math.random() * cardImageNames.length);
          if (!newCardsIndexes.includes(randomIndex)) {
            newCardsIndexes.push(randomIndex);
          }
        }
        const newCards = newCardsIndexes.map(i => cardImageNames[i]);
        setPickedCards(newCards);
        setShowCards(true);
        setQuestion(inputValue);

        const response = await questionAPI(inputValue, newCards);
        setAnswer(response);
      } catch (error) {
        console.error('Errore nella lettura dell\'oracolo:', error);
        setAnswer('Scusa, l\'oracolo non riesce a rispondere in questo momento.');
      }
    } else {
      setShowCards(false);
      setInputValue('');
      setPickedCards([]);
      setQuestion('');
      setAnswer('');
    }
  };



  return (
    <>
      <h1>Tarocchi</h1>
      <input 
        onClick={handleDestroyEverything} 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Come andrà la mia vita?"
        aria-label="Inserisci la tua domanda per l'oracolo"
      />
      <button 
        onClick={handleClick} 
        disabled={!inputValue}
        aria-label={!showCards ? 'Mostra le carte dei tarocchi' : 'Nascondi le carte dei tarocchi'}
      >
        {!showCards ? 'Mostra le carte' : 'Nascondi le carte'}
      </button>

      {showCards
      ? <>
          <div>
            <img src={'/Tarocchi/Cards-jpg/' + pickedCards[0][0] + '.jpg'} alt="First Card" />
            <img src={'/Tarocchi/Cards-jpg/' + pickedCards[1][0] + '.jpg'} alt="Second Card" />
            <img src={'/Tarocchi/Cards-jpg/' + pickedCards[2][0] + '.jpg'} alt="Third Card" />
          </div>
          <ol>
            <li>{`${pickedCards[0][0]}: ${pickedCards[0][1]}`}</li>
            <li>{`${pickedCards[1][0]}: ${pickedCards[1][1]}`}</li>
            <li>{`${pickedCards[2][0]}: ${pickedCards[2][1]}`}</li>
          </ol>
        </>
      : <p>Poni una domanda e mostra le tue carte</p>
      }

      {
        showCards ? 
        <>
          {answer ? 
            <>
              <h1>Ecco la risposta dell'oracolo</h1>
              <div className="oracle-answer" dangerouslySetInnerHTML={{__html: answer}}></div>
            </>
          : <h1>L'oracolo sta elaborando la risposta...</h1>
          }
        </> :
        null
      }
    </>
  )
}

export default App;