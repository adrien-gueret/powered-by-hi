import { addAnxiety, isAnxious, doActivity } from "../state.js";

import {
  addMessage,
  addFakeLoader,
  addMenuButton,
  getUserName,
  getResultIcon,
  clearMenu,
} from "../ui.js";
import activitiesHome from "./activitiesHome.js";

export default async function () {
  doActivity("game");

  await addMessage(
    `<p>${
      isAnxious()
        ? "I will try to create a game you'll enjoy."
        : "I will generate a fun and original game just for you."
    } Please wait a bit.</p>`,
    "ai"
  );

  await addMessage("<em>Gathering games ideas...</em>", "ai", false);

  await addFakeLoader({ loadingTime: 2000 });

  const username = getUserName();
  await addMessage(
    `<br /><em>Selecting best game idea${
      username !== "You" ? ` for <b>${username}</b>` : ""
    }...</em>`,
    "ai",
    false
  );

  await addFakeLoader({ loadingTime: 500 });

  await addMessage(
    `<br /><em>Generating rules and gameplay...</em>`,
    "ai",
    false
  );

  await addFakeLoader({ loadingTime: 1000 });

  return new Promise(async (resolveActivity) => {
    await addMessage(
      "<hr /><p>I'm done!</p><p class='big-text'>The Power of Three</p><p>The objective is to find a way to calculate some numbers with only <b>3</b>.</p>",
      "ai",
      false
    );

    const endGameActivity = async () => {
      await addMessage(
        `<p>I have to be honest with you: as a tool powered by AI, I can't really imagine new games concepts on my own like a human would do. I only take inspiration on existing stuff.</p>
        <p>If you've liked this game and want to go further, I strongly suggest you to test the original game from <b>Xem</b>: <a href="https://maximeeuziere.itch.io/the-power-of-two" target="_blank">The Power of Two</a>.</p>
        <p>${
          isAnxious()
            ? "I really hope you don't feel cheated... At least I can assure you"
            : "I hope you"
        }'ll enjoy the original game ${
          isAnxious() ? "way" : "even"
        } more than my own version!</p>`,
        "ai"
      );
      resolveActivity(activitiesHome);
    };

    const initNewGame = async (goal) => {
      clearMenu();

      const outputId = `o-${goal}-${Date.now()}`;

      await addMessage(
        `<p>Use buttons below to write the operation.</p>
        <p><output id="${outputId}"></output></p>
        <p><em>Goal is <b>${goal}</b> | Use <kbd>=</kbd> to submit your answer | 
        Use <kbd>&larr;</kbd> to erase last character</em></p>`,
        "ai"
      );

      const output = document.getElementById(outputId);

      const emptyContent = "<p style='min-height: 32px;'>&nbsp;</p>";
      const resultMessage = await addMessage(emptyContent, "ai");

      const removeResultMessage = () => {
        resultMessage.innerHTML = emptyContent;
      };

      const wrong = () => {
        resultMessage.innerHTML = `<p>Wrong answer! ${getResultIcon(
          false
        )}</p>`;
      };

      return new Promise((resolveGame) => {
        const success = () => {
          clearMenu();
          resultMessage.innerHTML = `<p>Well done! ${getResultIcon(
            true
          )}</p><hr />`;

          setTimeout(resolveGame, 1000);
        };

        ["3", "+", "-", "*", "/"].forEach((calculatorKey) => {
          addMenuButton({
            title: calculatorKey,
            onClick() {
              output.innerHTML += calculatorKey;

              removeResultMessage();
            },
            disableClearMenu: true,
          });
        });

        addMenuButton({
          title: "=",
          onClick() {
            try {
              const answer = eval(output.innerHTML);

              if (Number(answer) === goal) {
                success();
              } else {
                wrong();
              }
            } catch (e) {
              wrong();
            }
          },
          disableClearMenu: true,
        });

        addMenuButton({
          title: "&larr;",
          onClick() {
            output.innerHTML = output.innerHTML.slice(0, -1);
          },
          disableClearMenu: true,
        });

        addMenuButton({
          title: "I don't want to play anymore",
          async onClick() {
            addAnxiety();
            await addMessage("I don't want to play anymore.", "player");

            await addMessage(
              `<p>${
                isAnxious()
                  ? "Oh... OK. I thought this game would be fun enough. Guess I was wrong..."
                  : "No problems! Let's stop this game right now!"
              }</p>`,
              "ai"
            );

            endGameActivity();
          },
        });
      });
    };

    const goals = [6, 999, 4];
    const generatingMessage = "<br /><em>Generating a new goal...</em>";

    for (let i = 0, l = goals.length; i < l; i++) {
      if (i > 0) {
        await addMessage(generatingMessage, "ai", false);
        await addFakeLoader({ loadingTime: 500 });
      }

      await addMessage(
        `<p>${
          i === 0
            ? `First goal is easy: give me a <b>${goals[i]}</b>!`
            : `New goal! Now give me a <b>${goals[i]}</b>!`
        }</p>`,
        "ai",
        false
      );
      await initNewGame(goals[i]);
    }

    await addMessage(generatingMessage, "ai", false);
    await addFakeLoader({ loadingTime: 500, success: false });

    addAnxiety();

    await addMessage(
      `<p>You're good at this game! Unfortunately, my memory is limited and I can't generate a new game for you...</p>`,
      "ai"
    );

    endGameActivity();
  });
}
