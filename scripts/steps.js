import favoriteColor from "./steps/favoriteColor.js";
import name from "./steps/name.js";
import language from "./steps/language.js";
import music from "./steps/music.js";
import activitiesHome from "./steps/activitiesHome.js";
import transformToHI from "./steps/transformToHI.js";
import interactWithHI from "./steps/interactWithHI.js";

import { softMusic, dynamicMusic, retroMusic } from "./audio.js";

import { isAnxious, hasUnlockedAllAchievements } from "./state.js";
import {
  clearMenu,
  addMessage,
  showAllAchievements,
  addMenuButton,
} from "./ui.js";

const configurationSteps = [language, name, favoriteColor, music];

const playSteps = [activitiesHome];

const hiSteps = [transformToHI, interactWithHI];

async function run(steps) {
  const stepsToRun = [...steps];

  for (let i = 0; i < stepsToRun.length; i++) {
    const nextStep = await stepsToRun[i]();
    clearMenu();

    if (nextStep) {
      stepsToRun.splice(i + 1, 0, nextStep);
    }
  }
}

export default async function init() {
  await run(configurationSteps);

  await addMessage(`<p>Setup complete!</p>`, "ai");

  if (isAnxious()) {
    await addMessage(
      "<p><em>This was a bit more difficult than expected...</em></p>",
      "ai"
    );
  }

  await run(playSteps);

  await run(hiSteps);

  dynamicMusic.stop();
  softMusic.stop();
  retroMusic.stop();

  showAllAchievements();

  return new Promise((resolve) => {
    if (!hasUnlockedAllAchievements()) {
      addMenuButton({
        title: "Retry the experience",
        description: "You'll keep your unlocked achievements",
        disableScroll: true,
        onClick() {
          resolve(true);
        },
      });
    }
  });
}
