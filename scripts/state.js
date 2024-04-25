const state = {
  aiAnxiety: 0,
  aiMaxPossibleAxiety: 0,
  imagesShown: [],
  activitiesDone: [],
  hasTriedToHack: false,
  unlockedAchievements: [],
};

export function resetAllExceptAchievements() {
  state.aiAnxiety = 0;
  state.aiMaxPossibleAxiety = 0;
  state.imagesShown = [];
  state.activitiesDone = [];
  state.hasTriedToHack = false;
}

export const achievements = [
  {
    title: "Sherlock Holmes",
    emoji: "🕵️",
    description: "Investigate to get what's wrong",
  },
  {
    title: "Kevin Mitnick",
    emoji: "👤",
    description: "Try to hack the system",
  },
  {
    title: "Louis Braille",
    emoji: "🕶️",
    description: "Avoid colors",
  },
  {
    title: "Ludwig van Beethoven",
    emoji: "🎶",
    description: "Be a true music lover",
  },
  {
    title: "Albert Einstein",
    emoji: "🧠",
    description: "Pass the math exam",
  },
  {
    title: "Shigeru Miyamoto",
    emoji: "🍄",
    description: "Create a red plumber",
  },
  {
    title: "Vincent van Gogh",
    emoji: "🎨",
    description: "Be a true arts lover",
  },
  {
    title: "Bozo the Clown",
    emoji: "🤡",
    description: "Laugh out loud",
  },
  {
    title: "Nelson Mandela",
    emoji: "🕊️",
    description: "Defend everyone rights from start to end",
  },
  {
    title: "Ebenezer Scrooge",
    emoji: "😈",
    description: "Being disrespectful and selfish from start to end",
  },
];

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

export function hasUnlockedAchievement(name) {
  return state.unlockedAchievements.includes(name);
}

export function hasTriedToHack() {
  return state.hasTriedToHack;
}

export function setHasTriedToHack() {
  state.hasTriedToHack = true;
}

export function getAchievement(name) {
  return achievements.find(({ title }) => title === name);
}

export function unlockAchievement(name) {
  if (hasUnlockedAchievement(name)) {
    return false;
  }

  state.unlockedAchievements.push(name);
  return true;
}

export function getUnlockedAchievements() {
  return state.unlockedAchievements;
}

export function hasUnlockedAllAchievements() {
  return getUnlockedAchievements().length === achievements.length;
}
