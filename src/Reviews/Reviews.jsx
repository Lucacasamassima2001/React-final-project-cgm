import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { fetchReviews, inviaRecensione } from "../http";
import { Link } from "react-router-dom";
import styles from "./Reviews.module.css";

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
      <div id={styles.reviewsHeader}>
        <div>
          <Link to="/Home">
            <img id={styles.reviewsLogo} src="/public/logo.jpg" alt="logo" />
          </Link>
          <h1>REACTFOOD</h1>
        </div>
      </div>
      <div id={styles.appValutation}>
        <h2>Valutazione del nostro Servizio!</h2>
        <div className={styles.appValutationStars}>
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
          <h2 className={styles.reviewSendSuccess}>Grazie per aver votato!</h2>
        </div>
      ) : (
        <form id={styles.reviews}>
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
            <h3>Dacci un tuo parere su come migliorare</h3>
            <label>Nome</label>
            <input
              type="text"
              name="name"
              onChange={getInputValues}
              placeholder="Scrivi qui..."
            />
            <label>Recensione</label>
            <textarea
              className={styles.textarea}
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
        <div className={styles.reviewsCards}>
          {availableReviews.reviews?.map((review) => (
            <div className={styles.review} key={review.id}>
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
