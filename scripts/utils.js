export function random(max) {
  return Math.floor(Math.random() * (max + 1));
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = random(i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
