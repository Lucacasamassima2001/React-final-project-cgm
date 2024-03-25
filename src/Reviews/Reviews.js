// functions for reviews

export const handleClickOnStars = (vote, category, setFunction) => {
  setFunction((prev) => ({
    ...prev,
    votes: { ...prev.votes, [category]: vote },
  }));
};

export const calculateRadiusOfReviews = (availableReviews) => {
  const reviewsScore = availableReviews.reviews?.reduce(
    (acc, review) =>
      acc + review.votes.app + review.votes.food + review.votes.service,
    0
  );
  const finalRadius = reviewsScore / availableReviews.reviews?.length / 3;
  return finalRadius;
};

export const calculateVotesRadius = (review) => {
  const totalVotes =
    review.votes.app + review.votes.food + review.votes.service;
  const finalRadius = totalVotes / 3;
  return finalRadius;
};
