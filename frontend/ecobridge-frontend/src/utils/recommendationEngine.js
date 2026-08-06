const BASE_PRICES = {
  PLASTIC: 18,
  PAPER: 12,
  GLASS: 10,
  METAL: 35,
  EWASTE: 60,
  ORGANIC: 8,
};

export const getBasePrice = (wasteType) => {
  return BASE_PRICES[wasteType] || 15;
};

export const calculateOfferedPrice = (recycler, waste) => {
  const basePrice = getBasePrice(waste.wasteType);

  const capacityBonus = recycler.availableCapacity * 0.01;

  const distancePenalty = recycler.distanceKm * 0.2;

  return Number(
    (basePrice + capacityBonus - distancePenalty).toFixed(2)
  );
};

export const calculateRating = (recycler) => {
  if (recycler.verificationStatus === "VERIFIED") {
    return 4.8;
  }

  return 4.2;
};

export const calculateETA = (distance) => {
  return Math.round((distance / 35) * 60);
};

export const calculateScore = (
  recycler,
  waste,
  distance
) => {
  const price = calculateOfferedPrice(recycler, waste);

  const rating = calculateRating(recycler);

  return Number(
    (
      price * 0.4 +
      (100 - distance) * 0.3 +
      recycler.availableCapacity * 0.02 +
      rating * 2
    ).toFixed(2)
  );
};

export const recommendRecyclers = (
  recyclers,
  waste
) => {
  return recyclers
    .map((recycler) => ({
      ...recycler,
      offeredPrice: calculateOfferedPrice(
        recycler,
        waste
      ),
      rating: calculateRating(recycler),
      etaMinutes: calculateETA(
        recycler.distanceKm
      ),
      score: calculateScore(
        recycler,
        waste,
        recycler.distanceKm
      ),
    }))
    .sort((a, b) => b.score - a.score);
};