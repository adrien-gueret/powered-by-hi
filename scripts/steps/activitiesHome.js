import {
  addAnxiety,
  addMaxPossibleAnxiety,
  isAnxious,
  isVeryAnxious,
  hasDoneActivity,
  hasDoneAtLeastOneActivity,
  hasDoneAllActivities,
} from "../state.js";
import { addMessage, addMenuButton } from "../ui.js";

import game from "./game.js";
import image from "./image.js";
import joke from "./joke.js";

export const activityList = [
  {
    title: "A fun game",
    target: game,
    activityName: "game",
  },
  {
    title: "Generate an image",
    target: image,
    activityName: "image",
  },
  {
    title: "Tell me a joke",
    target: joke,
    activityName: "joke",
  },
];

export default async function () {
  if (hasDoneAllActivities()) {
    await addMessage(
      `<p>Well...<br />${
        isAnxious()
          ? isVeryAnxious()
            ? "I feel like I'm useless, I think we should stop doing activities..."
            : "I'm sorry but I don't feel very good right now, we should stop doing activities."
          : "What about stop doing activities?"
      }</p>`,
      "ai"
    );

    return;
  }

  if (hasDoneAtLeastOneActivity()) {
    await addMessage(
      `<p>${
        isAnxious()
          ? isVeryAnxious()
            ? "So, how can I waste your time now?"
            : "So how can I live up to your expectations?"
          : "So, what do you want to do now?"
      }</p>`,
      "ai"
    );
  } else {
    await addMessage(
      "<p>I can now help you with everything you need.</p>",
      "ai"
    );

    if (isAnxious()) {
      await addMessage(
        "<p><em>Well... If you want to, at least...</em></p>",
        "ai",
        false
      );
    }

    await addMessage("<p>So tell me: how can I help you?</p>", "ai");
  }

  return new Promise((resolve) => {
    const showSuggestActivities = () => {
      activityList
        .filter(({ activityName }) => !hasDoneActivity(activityName))
        .forEach(({ title, target }) => {
          addMenuButton({
            title,
            async onClick() {
              await addMessage(`${title}.`, "player");
              resolve(target);
            },
          });
        });
    };

    if (hasDoneAtLeastOneActivity()) {
      showSuggestActivities();
      return;
    }

    addMenuButton({
      title: "I just want to play!",
      description: 'This "game" sucks...',
      async onClick() {
        addAnxiety();

        await addMessage(
          '<p>I just want to play !<br/>This "game" sucks...</p>',
          "player"
        );

        await addMessage(
          `<p>${
            isAnxious()
              ? "Ok ok, don't be nervous please..."
              : "Sorry to see you writing that."
          }<br />Let's see which game we can play together!</p>`,
          "ai"
        );

        resolve(game);
      },
    });

    addMenuButton({
      title: "I don't really know...",
      description: "Suggest me something",
      async onClick() {
        addMaxPossibleAnxiety();

        await addMessage(
          "<p>I don't really know...<br/>Suggest me something.</p>",
          "player"
        );

        await addMessage(
          `<p>${
            isAnxious()
              ? "Please be sure I'll do my best to suggest you something you'll like."
              : "We can do almost anything you want!"
          }<br />Here are three possible activities. Please choose one.</p>`,
          "ai"
        );

        showSuggestActivities();
      },
    });
  });
}
