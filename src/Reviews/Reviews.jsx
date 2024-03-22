import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { fetchReviews, inviaRecensione } from "../http";
import { Link } from "react-router-dom";

export default function Reviews() {
  const [success, setSuccess] = useState(false);
  const [userReview, setUserReview] = useState({
    text: "",
    name: "",
    votes: { app: 0, food: 0, service: 0 },
  });
  const [availableReviews, setAvailableReviews] = useState({
    showReviews: false,
    reviews: [],
  });

  const gestisciClickStella = (vote, category) => {
    setUserReview((prevReview) => ({
      ...prevReview,
      votes: { ...prevReview.votes, [category]: vote },
    }));
  };

  function getInputValues(e) {
    const { name, value } = e.target;
    setUserReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  }

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
  }, [success]);

  function calculateRadiusOfReviews(availableReviews) {
    const reviewsScore = availableReviews.reviews?.reduce(
      (acc, review) =>
        acc + review.votes.app + review.votes.food + review.votes.service,
      0
    );
    const finalRadius = reviewsScore / availableReviews.reviews?.length / 3;
    return finalRadius;
  }

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
      <div id="app__valutation">
        <h2>Valutazione del nostro Servizio!</h2>
        <div className="app__valutation__stars">
          {availableReviews.reviews?.length === 0 ? (
            ""
          ) : (
            <div>{calculateRadiusOfReviews(availableReviews).toFixed(1)}</div>
          )}
          {[1, 2, 3, 4, 5].map((numeroStella) => (
            <span key={numeroStella}>
              {numeroStella <= calculateRadiusOfReviews(availableReviews)
                ? "★"
                : "☆"}
            </span>
          ))}
          <div> - </div>
          <a
            onClick={() => {
              setAvailableReviews((prev) => ({
                ...prev,
                showReviews: !prev.showReviews,
              }));
            }}
          >
            {availableReviews.reviews?.length} recensioni
          </a>
        </div>
      </div>

      {success ? (
        <div>
          <h2 className="review__send__success">Grazie per aver votato!</h2>
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
            </div>
          </div>

          <div>
            <h2>Dacci un tuo parere su come migliorare</h2>
            <input type="text" name="name" onChange={getInputValues} />
            <textarea
              className="textarea"
              name="text"
              onChange={getInputValues}
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
      {availableReviews.showReviews && (
        <div className="reviews-cards">
          {availableReviews.reviews?.map((review) => (
            <div className="review" key={review.id}>
              <div>{review.name}</div>
              {[1, 2, 3, 4, 5].map((numeroStella) => (
                <span key={numeroStella}>
                  {numeroStella <= calculateVotesRadius(review) ? "★" : "☆"}
                </span>
              ))}
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
