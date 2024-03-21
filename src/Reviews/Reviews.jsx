import { useState } from "react";
import Button from "../Button/Button";
import { inviaRecensione } from "../http";

export default function Reviews() {
  const [success, setSuccess] = useState(false);
  const [userReview, setUserReview] = useState({
    text: "",
    votes: { app: 0, food: 0, service: 0 },
  });

  const gestisciClickStella = (vote, category) => {
    setUserReview((prevReview) => ({
      ...prevReview,
      votes: { ...prevReview.votes, [category]: vote },
    }));
    console.log(userReview);
  };

  const getText = (e) => {
    setUserReview((prevReview) => ({
      ...prevReview,
      text: e.target.value,
    }));
  };

  async function handleReview(e) {
    e.preventDefault();

    try {
      await inviaRecensione(userReview);
    } catch (error) {
      console.log(error);
    } finally {
      setSuccess(true);
    }
    console.log(userReview);
  }

  return (
    <div>
      {success ? (
        <div id="reviews">
          <h1>Grazie per il feedback!!</h1>
          <img src="/1426689-carino-bambini-con-panin.png" alt="" />
        </div>
      ) : (
        <form id="reviews">
          <div>
            <h2>{`Come ti sei trovato con l'app?`}</h2>
            <div>
              {[1, 2, 3, 4, 5].map((numeroStella) => (
                <span
                  key={numeroStella}
                  onClick={() => gestisciClickStella(numeroStella, "app")}
                >
                  {numeroStella <= userReview.votes.app ? "★" : "☆"}
                </span>
              ))}
              <p>Voto selezionato: {userReview.votes.app}</p>
            </div>
          </div>

          <div>
            <h2>Come valuti il nostro servizio?</h2>
            <div>
              {[1, 2, 3, 4, 5].map((numeroStella) => (
                <span
                  key={numeroStella}
                  onClick={() => gestisciClickStella(numeroStella, "service")}
                >
                  {numeroStella <= userReview.votes.service ? "★" : "☆"}
                </span>
              ))}
              <p>Voto selezionato: {userReview.votes.service}</p>
            </div>
          </div>

          <div>
            <h2>La del nostro cibo ti soddisfa?</h2>
            <div>
              {[1, 2, 3, 4, 5].map((numeroStella) => (
                <span
                  key={numeroStella}
                  onClick={() => gestisciClickStella(numeroStella, "food")}
                >
                  {numeroStella <= userReview.votes.food ? "★" : "☆"}
                </span>
              ))}
              <p>Voto selezionato: {userReview.votes.food}</p>
            </div>
          </div>

          <div>
            <h2>Dacci un tuo parere su come migliorare</h2>
            <textarea
              className="textarea"
              name="text"
              onChange={getText}
              value={userReview.text}
              placeholder="Scrivi qui..."
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <Button type="submit" onClick={handleReview}>
            Invia Recensione
          </Button>
        </form>
      )}
    </div>
  );
}
