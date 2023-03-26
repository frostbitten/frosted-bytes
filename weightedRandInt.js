/*
Generate a random integer from min to max (inclusive) with an optional parameter to give more weight to min (0) or max (1) or evenly distributed (0.5)
*/
function randInt(min, max, weight = 0.5) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (weight < 0 || weight > 1) {
    throw new Error('Weight should be between 0 and 1.');
  }

  const weightOffset = (weight + 0.5) % 1;

  // Generate a random number
  const randomValue = Math.random();

  // Apply the weight as a power function
  const distribution = weightOffset <= 0.5 ? 1 - (2 * weightOffset) : 2 * (weightOffset - 0.5);
  const weightedRandomValue = weightOffset <= 0.5 ? Math.pow(randomValue, distribution) : 1 - Math.pow(1 - randomValue, distribution);

  // Ensure that the weighted random value does not fall out bounds
  const clampedWeightedRandomValue = weight === 0 ? 0 : Math.min(weightedRandomValue, 1 - Number.EPSILON);

  // Calculate the resulting integer using the weighted random value
  return Math.floor(clampedWeightedRandomValue * (max - min + 1)) + min;
}
