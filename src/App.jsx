import React, { useState } from "react";
import { cardImageNames } from "./Cards";
import questionAPI from "./Gemini/GeminiAPI"

function App() {
  const [showCards, setShowCards] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  let pickedCards = [];

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleClick = async () => {
    setShowCards(!showCards);
    showCards ? setInputValue('') : null;

    if(showCards) {
      setQuestion(inputValue);
      setAnswer(await questionAPI(`Fammi una predizione dei tarocchi. La domanda è: "${question}", e le carte uscite sono: ${pickedCards.toString()}.
Rispondi in modo semplice, chiaro e sintetico.
Usa una struttura con:
- Titolo per ogni carta (nome e posizione)
- 1-2 parole chiave in grassetto per ogni carta
- Una breve spiegazione (massimo 3-4 frasi) per ogni carta
- Una conclusione finale di massimo 2 frasi

Formatta la risposta per essere plain text.`));
    }
  }

  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * cardImageNames.length)

    if(pickedCards.includes(randomIndex)) {
      return randomCard();
    }

    pickedCards.push(randomIndex);
    console.log(pickedCards);
    return cardImageNames[randomIndex];
  }

  pickedCards = [randomCard(), randomCard(), randomCard()];

  return (
    <>
      <h1>Tarocchi</h1>
      <input type="text" value={inputValue} onChange={handleChange} placeholder="Come andrà la mia vita?"/>
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
        <p>{answer ? answer : null}</p> :
        'Funzione non in funzione'
      }
    </>
  )
}

export default App;