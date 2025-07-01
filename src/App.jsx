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

    setAnswer(await questionAPI(inputValue, newCards));
  } else {
    setShowCards(false);
    setInputValue('');
    setPickedCards([]);
    setQuestion('');
    setAnswer('');
  }
};



  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardImageNames.length)

    if(pickedCards.includes(randomIndex)) {
      return randomCard();
    }

    pickedCards.push(randomIndex);
    console.log(pickedCards);
    return cardImageNames[randomIndex];
  }


  return (
    <>
      <h1>Tarocchi</h1>
      <input onClick={handleDestroyEverything} type="text" value={inputValue} onChange={handleChange} placeholder="Come andrà la mia vita?"/>
      <button onClick={handleClick} disabled={!inputValue}>{!showCards ? 'Mostra le carte' : 'Nascondi le carte'}</button>

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
              <p>{answer ? answer : null}</p>
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