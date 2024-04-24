import { addAnxiety, addMaxPossibleAnxiety, isAnxious } from "../state.js";

import { addMessage, addMenuButton, setUserColor } from "../ui.js";

export default async function () {
  setUserColor("#fff");

  await addMessage("<p>What's your favorite color?</p>", "ai");

  return new Promise((resolve) => {
    [
      {
        title: "Red",
        color: "lightcoral",
      },
      {
        title: "Green",
        color: "lightgreen",
      },
      {
        title: "Blue",
        color: "lightblue",
      },
      {
        title: "None of them",
        color: "#fff",
      },
    ].forEach(({ title, color }) => {
      const button = addMenuButton({
        title,
        async onClick() {
          await addMessage(title + ".", "player");

          setUserColor(color);

          if (title === "None of them") {
            addAnxiety();

            await addMessage(
              isAnxious()
                ? "<p>Oh... Sorry to not being able to suggest your favorite color.<br />Please forgive me and let's go to next question!</p>"
                : "<p>Oh, OK. Nevermind, let's skip this question then.</p>",
              "ai"
            );
          } else {
            addMaxPossibleAnxiety();
            await addMessage(
              (isAnxious()
                ? "<p>Your choice has been registered, I'll use it for you from now on.</p>"
                : "<p>This is indeed a nice color! Let's use it for you right now!</p>") +
                "<p>Now let's continue the configuration of your experience with me.</p>",
              "ai"
            );
          }

          resolve();
        },
      });

      button.style.setProperty("--bg-color", color);
    });
  });
}
