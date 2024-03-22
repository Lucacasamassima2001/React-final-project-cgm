import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { fetchReviews, inviaRecensione } from "../http";
import { Link } from "react-router-dom";

export default function Reviews() {
  const [success, setSuccess] = useState(false);
  const [userReview, setUserReview] = useState({
    text: "",
    votes: { app: 0, food: 0, service: 0 },
  });
  const [availableReviews, setAvailableReviews] = useState({
    isFetching: null,
    reviews: [],
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
  }

  useEffect(() => {
    async function fetchAvailableReviews() {
      try {
        const reviews = await fetchReviews();
        setAvailableReviews((prev) => ({ ...prev, reviews: reviews }));
      } catch (error) {
        console.log(error);
      }
    }

    fetchAvailableReviews();
  }, []);

  // function calculateVotesRadius(){
  //   const totalVotes = userReview.votes.app + userReview.votes.food + userReview.votes.service;
  //   const appVotes = userReview.votes.app;
  //   const foodVotes = userReview.votes.food;
  //   const serviceVotes = userReview.votes.service;
  //   const appRadius = (appVotes / totalVotes) * 100;
  // }

  function calculateVotesRadius(review) {
    const totalVotes =
      review.votes.app + review.votes.food + review.votes.service;
    const finalRadius = totalVotes / 3;
    return finalRadius;
  }

  return (
    <div id="reviews-container">
      <div id="reviews__header">
        <div>
          <Link to="/Home">
            <img id="reviews__logo" src="/public/logo.jpg" alt="logo" />
          </Link>
          <h1>REACTFOOD</h1>
        </div>
      </div>
      <div className="reviews-cards">
        {availableReviews.reviews?.map((review) => (
          <div className="review" key={review.id}>
            <h3>{review.text}</h3>
            <div>{calculateVotesRadius(review).toFixed(1)}</div>
            {[1, 2, 3, 4, 5].map((numeroStella) => (
              <span key={numeroStella}>
                {numeroStella <= calculateVotesRadius(review) ? "★" : "☆"}
              </span>
            ))}
          </div>
        ))}
      </div>
      {success ? (
        <div id="reviews">
          <h1>Grazie per il feedback!!</h1>
          <img
            src="/1426689-carino-bambini-con-panin.png"
            alt="immagine-feedback"
          />
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
