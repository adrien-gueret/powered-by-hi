import {
  addAnxiety,
  addMaxPossibleAnxiety,
  isAnxious,
  setHasTriedToHack,
} from "../state.js";

import {
  addMessage,
  addMenuButton,
  addMenuInput,
  setUserName,
  showAchievement,
} from "../ui.js";

export default async function () {
  await addMessage("<p>What's your name?</p>", "ai");
  let tryEmptyNameCount = 0;

  return new Promise((resolve) => {
    addMenuInput({
      placeholder: "John, Emily, Mario, Peach...",
      async onSubmit(username) {
        const cleanUsername = username.trim();

        addMaxPossibleAnxiety();

        if (!cleanUsername) {
          await addMessage("", "player");

          addAnxiety(2);

          tryEmptyNameCount++;

          if (tryEmptyNameCount === 1) {
            await addMessage(
              "<p>You've sent nothing. Please try again with your actual name, please.</p>",
              "ai",
              false
            );

            return;
          }

          await addMessage(
            "<p>You've still sent nothing. If you don't want to answer, it's probably better to skip this question...</p>",
            "ai",
            false
          );

          resolve();
          return;
        } else {
          addMaxPossibleAnxiety(2);
        }

        const escapedUsername = cleanUsername.replace(
          /[<>\&]/gim,
          (i) => `&#${i.charCodeAt(0)};`
        );

        await addMessage(escapedUsername, "player");

        if (escapedUsername === cleanUsername) {
          setUserName(escapedUsername);

          addMaxPossibleAnxiety(2);

          await addMessage(
            `<p>Nice to meet you <b>${escapedUsername}</b>! I hope you already enjoy this experience!</p><p>Let's continue with another simple question.</p>`,
            "ai",
            false
          );
        } else {
          setUserName("Bad person");
          setHasTriedToHack();
          showAchievement("Kevin Mitnick");

          addAnxiety(2);

          await addMessage(
            `<p>Hm... Did you try to hack me? That's not nice... You are a <b>bad person</b>!</p><p>But as a tool powered by AI, I ${
              isAnxious() ? "<em>should</em> not" : "don't"
            } care. Let's continue with another simple question.</p>`,
            "ai",
            false
          );
        }

        resolve();
      },
    });

    addMenuButton({
      title: "I prefer not to say",
      async onClick() {
        addAnxiety();

        await addMessage("<p>I prefer not to say.</p>", "player");

        await addMessage(
          `<p>${
            isAnxious()
              ? `Oh. OK. That's fine. I'll continue to call you "You", then. I would prefer to use a more friendly name, but you are the chief here!`
              : `I'll continue to call you "You", then. Let me ask you another question!`
          }</p>`,
          "ai"
        );

        resolve();
      },
    });
  });
}
