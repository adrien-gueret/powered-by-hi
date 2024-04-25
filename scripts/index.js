import initNavigation from "./navigation.js";
import {
  addAnxiety,
  addMaxPossibleAnxiety,
  resetAllExceptAchievements,
} from "./state.js";
import initUI, { addMessage, clearMessages, clearMenu } from "./ui.js";

import runSteps from "./steps.js";

(async function runGame() {
  const onChatStart = async (data) => {
    const isUnhappy = data.choice === "wtf";

    clearMessages();
    clearMenu();

    await addMessage(
      document.getElementById("initial-message").innerHTML,
      "ai",
      false
    );

    await addMessage(
      isUnhappy
        ? "<p>WTF is that...?</p><p><em>I thought this was a game...</em></p>"
        : "<p>OK, cool!</p><p><em>Can't wait to play with this AI!</em></p>",
      "player"
    );

    if (isUnhappy) {
      addAnxiety();
    } else {
      addMaxPossibleAnxiety();
    }

    await addMessage(
      `${
        isUnhappy
          ? "<p>I'm sorry to start with a disappointment.<br />I am indeed not a game, but a powerful tool powered by AI. My main goal is to help you. If you need to have fun, I can help you with that!</p>"
          : ""
      }<p class="big-text">So let's start!</p><p>First, please configure your future experience with me.</p>`,
      "ai"
    );

    await runSteps();

    resetAllExceptAchievements();
    runGame();
  };

  initNavigation(onChatStart);
  initUI();
})();
