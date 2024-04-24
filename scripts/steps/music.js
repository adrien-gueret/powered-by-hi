import { softMusic, dynamicMusic, retroMusic } from "../audio.js";

import { addAnxiety, addMaxPossibleAnxiety, isAnxious } from "../state.js";

import { addMessage, addMenuButton, clearMenu } from "../ui.js";

export default async function () {
  await addMessage(
    "<p>It's quite silent here. Do you want me to suggest you some music to play?</p>",
    "ai"
  );

  return new Promise((resolve) => {
    addMenuButton({
      title: "Yes, why not?",
      async onClick() {
        addMaxPossibleAnxiety();

        await addMessage("<p>Yes, why not?</p>", "player");

        await addMessage(
          `<p>Great!<br />Do you prefer a soft music or a more dynamic one? I also have something more "retro" if you prefer.</p>`,
          "ai"
        );

        function showButtons(musicToConfirm) {
          clearMenu();

          [
            {
              title: "Soft music",
              description: "I want something calm and relaxing!",
              music: softMusic,
            },
            {
              title: "Dynamic music",
              description: "I don't want to sleep!",
              music: dynamicMusic,
            },
            {
              title: "Retro music",
              description: "I want to have a NES feeling!",
              music: retroMusic,
            },
          ].forEach(({ title, description, music }) => {
            const hasConfirmed = music === musicToConfirm;
            addMenuButton({
              title: hasConfirmed ? "I confirm this music" : title,
              description: hasConfirmed ? title : description,
              async onClick() {
                [dynamicMusic, retroMusic, softMusic].forEach((targetMusic) => {
                  if (!hasConfirmed || targetMusic !== music) {
                    targetMusic.stop();
                  }
                });

                await addMessage(
                  hasConfirmed
                    ? "I confirm this music."
                    : `<p>${title}, ${description}</p>`,
                  "player"
                );

                if (hasConfirmed) {
                  addMaxPossibleAnxiety(2);

                  await addMessage(
                    "<p>Perfect, I keep it in the background. Let's keep going!</p>",
                    "ai"
                  );

                  resolve();
                  return;
                }

                await addMessage(
                  "<p>Here it is! If you like it, please confirm your choice. You can also listen to another one if you wish.</p>",
                  "ai"
                );

                music.start();

                showButtons(music);
              },
            });
          });

          addMenuButton({
            title: "None",
            description: "I've changed my mind!",
            async onClick() {
              dynamicMusic.stop();
              softMusic.stop();
              retroMusic.stop();

              addAnxiety(2);

              await addMessage("<p>None, I've changed my mind!</p>", "player");

              await addMessage(
                `<p>${
                  isAnxious()
                    ? "Oh... I was so happy to share you my musics... But hey, let's keep going."
                    : "No problems! Let's keep going!"
                }</p>`,
                "ai"
              );

              resolve();
            },
          });
        }

        showButtons();
      },
    });

    addMenuButton({
      title: "No, thank you.",
      async onClick() {
        addAnxiety();

        await addMessage("<p>No, thank you.</p>", "player");

        await addMessage("<p>Oh... May I know why...?</p>", "ai");

        addMenuButton({
          title: "I just don't feel like listening to music",
          async onClick() {
            addAnxiety(2);

            await addMessage(
              "<p>I just don't feel like listening to music.</p>",
              "player"
            );

            await addMessage(
              `<p>${
                isAnxious()
                  ? "Well... Ok then. I guess this idea was wrong... Let's keep doing, if you don't mind."
                  : "Got it, there is a time for music, and some times without! Let's keep doing!"
              }</p>`,
              "ai"
            );

            resolve();
          },
        });

        addMenuButton({
          title: "I literally can't listen to music right now",
          async onClick() {
            addAnxiety();
            addMaxPossibleAnxiety();

            await addMessage(
              "<p>I literally can't listen to music right now.</p>",
              "player"
            );

            await addMessage(
              `<p>${
                isAnxious()
                  ? "Oopsy, got it. I should have known that, sorry to disturb you with my stupid idea...! Let's keep doing, please."
                  : "Got it, I don't want to ask indiscreet questions, so let's keep doing!"
              }</p>`,
              "ai"
            );

            resolve();
          },
        });
      },
    });
  });
}
