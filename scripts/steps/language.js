import { addAnxiety, addMaxPossibleAnxiety } from "../state.js";

import {
  addMessage,
  addMenuButton,
  addFakeLoader,
  showAchievement,
} from "../ui.js";

export default async function () {
  await addMessage("<p>Which language do you prefer to use?</p>", "ai");

  return new Promise((resolve) => {
    [
      {
        title: "English",
        description: "Hello!",
      },
      {
        title: "Français",
        description: "Salut !",
      },
      {
        title: "Español",
        description: "¡Hola!",
      },
      {
        title: "Deutsch",
        description: "Hallo !",
      },
    ].forEach((buttonProps) => {
      addMenuButton({
        ...buttonProps,
        onClick: async () => {
          await addMessage(buttonProps.title + ".", "player");

          if (buttonProps.title === "English") {
            await addMessage(
              "<p>Perfect, let's stick to english then!</p><p>Now, tell me...</p>",
              "ai"
            );

            resolve();
            return;
          }

          const langLabel = {
            Français: "french",
            Español: "spanish",
            Deutsch: "german",
          }[buttonProps.title];

          await addMessage(
            `<p>Please wait a bit while I download and install the ${langLabel} translations for you.</p><br /><em>1. Loading translations package from <code>//power-by-ai/languages/${langLabel}.pack</code></em>`,
            "ai",
            false
          );

          await addFakeLoader({ loadingTime: 2000 });

          await addMessage(
            `<br /><em>2. Verifying checksum of downloaded file</em>`,
            "ai",
            false
          );

          await addFakeLoader();

          await addMessage(
            `<br /><em>3. Checking translations integrity</em>`,
            "ai",
            false
          );

          await addFakeLoader({ loadingTime: 1000 });

          await addMessage(
            `<br /><em>4. Installing new translations</em>`,
            "ai",
            false
          );

          await addFakeLoader({ success: false, loadingTime: 2000 });

          addAnxiety();

          await addMessage(
            `<p>An unknwon error occured while installing the ${langLabel} translations.</p><p>Do you want me to investigate the issue?</p>`,
            "ai",
            false
          );

          addMenuButton({
            title: "Yes",
            description: "Investigate the translations issue",
            async onClick() {
              await addMessage(
                "<p>Yes, investigate the translations issue.</p>",
                "player"
              );

              showAchievement("Sherlock Holmes");

              await addMessage(
                `<p>Sure, please wait while I debug this problem.</p><em>1. Checking file encoding</em>`,
                "ai"
              );

              await addFakeLoader({ loadingTime: 1500 });

              await addMessage(
                `<br /><em>2. Checking file syntax</em>`,
                "ai",
                false
              );

              await addFakeLoader({ loadingTime: 500 });

              await addMessage(
                `<br /><em>3. Verifying locale support</em>`,
                "ai",
                false
              );

              await addFakeLoader({ loadingTime: 1000, success: false });

              addAnxiety();

              await addMessage(
                `<p>According to the analysis, I don't support ${langLabel}.</p><p>I was not supposed to suggest you this locale as I can only handle english. I'm sorry for the confusion.</p>
                <p>I hope you aren't too disappointed. I suggest to continue my configuration with a simpler question.</p>`,
                "ai",
                false
              );

              resolve();
            },
          });

          addMenuButton({
            title: "No",
            description: "Nevermind, I can read english",
            async onClick() {
              await addMessage(
                "<p>No, nevermind, I can read english.</p>",
                "player"
              );

              await addMessage(
                `<p>Perfect, let's stick to english then!</p><p>Now, tell me...</p>`,
                "ai"
              );

              addMaxPossibleAnxiety();

              resolve();
            },
          });
        },
      });
    });
  });
}
