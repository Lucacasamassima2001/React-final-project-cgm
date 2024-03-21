/* eslint-disable no-undef */
import { useState } from "react";
import Button from "../Button/Button";

export default function Reviews() {
  const [voti, setVoti] = useState({});
  const [commento, setCommento] = useState("");

  const gestisciClickStella = (categoria, voto) => {
    setVoti((prevVoti) => ({
      ...prevVoti,
      [categoria]: voto,
    }));
  };

  return (
    <form id="reviews">
      <h1>Dacci un tuo parere!!</h1>

      <div>
        <h2>{`Come ti sei trovato con l'app?`}</h2>
        <div>
          {[1, 2, 3, 4, 5].map((numeroStella) => (
            <span
              key={numeroStella}
              onClick={() => gestisciClickStella("app", numeroStella)}
            >
              {numeroStella <= voti.app ? "★" : "☆"}
            </span>
          ))}
          <p>Voto selezionato: {voti.app}</p>
        </div>
      </div>

      <div>
        <h2>Come valuti il nostro servizio?</h2>
        <div>
          {[1, 2, 3, 4, 5].map((numeroStella) => (
            <span
              key={numeroStella}
              onClick={() => gestisciClickStella("servizio", numeroStella)}
            >
              {numeroStella <= voti.servizio ? "★" : "☆"}
            </span>
          ))}
          <p>Voto selezionato: {voti.servizio}</p>
        </div>
      </div>

      <div>
        <h2>La del nostro cibo ti soddisfa?</h2>
        <div>
          {[1, 2, 3, 4, 5].map((numeroStella) => (
            <span
              key={numeroStella}
              onClick={() => gestisciClickStella("cibo", numeroStella)}
            >
              {numeroStella <= voti.cibo ? "★" : "☆"}
            </span>
          ))}
          <p>Voto selezionato: {voti.cibo}</p>
        </div>
      </div>

      <div>
        <h2>Dacci un tuo parere su come migliorare</h2>
        <textarea
          onChange={(event) => setCommento(event.target.value)}
          value={commento}
          className="textarea"
        ></textarea>
      </div>

      <Button type="submit">Invia Recensione</Button>
    </form>
  );
}
