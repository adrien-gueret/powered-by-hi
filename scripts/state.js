const state = {
  aiAnxiety: 0,
  aiMaxPossibleAxiety: 0,
  imagesShown: [],
  activitiesDone: [],
  hasTriedToHack: false,
};

export function addMaxPossibleAnxiety(total = 1) {
  state.aiMaxPossibleAxiety += total;
}

export function addAnxiety(total = 1) {
  state.aiAnxiety += total;
  addMaxPossibleAnxiety(total);
}

export function getAnxiety() {
  return state.aiAnxiety;
}

export function getMaxPossibleAnxiety() {
  return state.aiMaxPossibleAxiety;
}

export function getPercentAnxiety() {
  return getAnxiety() / getMaxPossibleAnxiety();
}

export function isAnxious() {
  return getAnxiety() > 1 && getPercentAnxiety() >= 0.4;
}

export function isVeryAnxious() {
  return getAnxiety() > 1 && getPercentAnxiety() >= 0.6;
}

export function addImagesShown(imageName) {
  state.imagesShown.push(imageName);
}

export function hasImageBeenShown(imageName) {
  return state.imagesShown.includes(imageName);
}

export function doActivity(activityName) {
  state.activitiesDone.push(activityName);
}

export function hasDoneActivity(activityName) {
  return state.activitiesDone.includes(activityName);
}

export function hasDoneAtLeastOneActivity() {
  return state.activitiesDone.length > 0;
}

export function hasDoneAllActivities() {
  return state.activitiesDone.length === 3;
}

export function setHasTriedToHack() {
  state.hasTriedToHack = true;
}

export function hasTriedToHack() {
  return state.hasTriedToHack;
}
