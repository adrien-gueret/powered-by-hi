import {
  addAnxiety,
  addMaxPossibleAnxiety,
  addImagesShown,
  hasImageBeenShown,
  isAnxious,
  doActivity,
} from "../state.js";

import {
  addMessage,
  addMenuButton,
  addFakeLoader,
  clearMenu,
  scrollToBottom,
  showAchievement,
} from "../ui.js";

import activitiesHome from "./activitiesHome.js";

export default async function () {
  doActivity("image");

  await addMessage(
    `<p>Thanks to the power of AI, ${
      isAnxious()
        ? "I can somehow create images. I don't know how it works... But it <em>kinda</em> works."
        : "I can generate images of anything you can imagine!"
    }</p><p>To get started, try one of these examples.</p>`,
    "ai"
  );

  return new Promise((resolve) => {
    let totalLikes = 0;
    let totalImagesGenerated = 0;

    const showEnoughButton = () => {
      addMenuButton({
        title: "I want to do something else",
        description: "Enough with images!",
        async onClick() {
          await addMessage(
            `<p>I want to do something else, enough with images!</p>`,
            "player"
          );

          if (totalLikes === 0) {
            addAnxiety();

            await addMessage(
              `<p>${
                isAnxious()
                  ? "You didn't like this activity at all, right...? I'm terribly sorry, I hope you'll enjoy more the next activities..."
                  : `Creating ${
                      totalImagesGenerated > 1 ? "these images" : "this image"
                    } may not have been as fun as you expected, let's find something better to do!`
              }</p>`,
              "ai"
            );
          } else {
            addMaxPossibleAnxiety();

            await addMessage(
              `<p>${
                isAnxious()
                  ? `Oh, sure. I'm happy you've liked ${
                      totalImagesGenerated > 1
                        ? "at least one of the images"
                        : "the image"
                    } I've created for you, but let's move on, you're right!`
                  : `OK sure, I hope it was fun for you to create ${
                      totalImagesGenerated > 1 ? "these images" : "this image"
                    }!`
              }</p>`,
              "ai"
            );
          }

          resolve(activitiesHome);
        },
      });
    };

    const checkEnd = async (
      createMoreMessage = "Do you want me to create more images?"
    ) => {
      if (totalImagesGenerated < 3) {
        await addMessage(`<p>${createMoreMessage}</p>`, "ai");
        showImageButtons();
      } else {
        if (totalLikes === 0) {
          showAchievement("Vincent van Gogh");
        }
        await addMessage(
          `<p>You know, as a tool powered by AI, my creation and imagination skills are probably not the one expected by a human. ${
            isAnxious()
              ? "That's why we'd probably be better off doing something else..."
              : "I'm out of inspiration, so let's switch to another activity, if you don't mind."
          }</p>`,
          "ai"
        );
        resolve(activitiesHome);
      }
    };

    const showImageButtons = (hideEnoughButton = false) => {
      clearMenu();

      [
        {
          title: "Create a new character for a videogame",
          src: "videogame",
          before: "OK, I will create a brand new character for a videogame.",
          after:
            "Here's the image of a new fictional video game character, depicted jumping with his fist raised.",
          playerReactionTitle: "But it's simply Super Mario!",
          playerReactionDescription:
            "Without gloves and with a strange placement for his legs...",
        },
        {
          title: "Paint something original",
          src: "paint",
          before:
            "I'll do my best to paint something you've never seen before!",
          after:
            "Here is an original painting of a mysterious woman. Her hands are put forward to cause a fun shift never seen before in this type of painting.",
          playerReactionTitle:
            "You've only painted a weird version of <em>Mona Lisa</em>...",
          playerReactionDescription: "With horrible hands...",
        },
        {
          title: "Imagine the poster for a movie with an innovative concept",
          src: "movie",
          before: "I have some ideas for an inedite movie concept.",
          after:
            "Here's the movie poster for the fictional film <em>Cretaceous Park</em>, designed to ignite the imagination with a sense of adventure and prehistoric wonder.",
          playerReactionTitle: "This is a copy of <em>Jurassic Park</em>!",
          playerReactionDescription: "With abominations as dinosaurs...",
        },
      ]
        .filter(({ src }) => !hasImageBeenShown(src))
        .forEach(
          ({
            title,
            before,
            after,
            src,
            playerReactionTitle,
            playerReactionDescription,
          }) => {
            addMenuButton({
              title,
              async onClick() {
                await addMessage(`${title}.`, "player");
                addImagesShown(src);

                await addMessage(
                  `<p>${before} Please wait a bit.</p><em>Creating image...</em>`,
                  "ai",
                  false
                );

                await addFakeLoader({ loadingTime: 3000 });

                const imageId = `i-${src}-${Date.now()}`;

                totalImagesGenerated++;

                await addMessage(
                  `<p><img id="${imageId}" src="./${src}.jpg" alt="${title}" /></p>`,
                  "ai",
                  false
                );

                document.getElementById(imageId).onload = scrollToBottom;

                await addMessage(`<p>${after} I hope you like it!</p>`, "ai");

                if (src === "videogame") {
                  showAchievement("Shigeru Miyamoto");
                }

                addMenuButton({
                  title: "I like it!",
                  async onClick() {
                    totalLikes++;
                    addMaxPossibleAnxiety();
                    await addMessage(`<p>I like it!</p>`, "player");

                    await addMessage(
                      `<p>${
                        isAnxious()
                          ? "You like it, really? Thanks, I guess."
                          : "I'm glad you like it!"
                      }</p>`,
                      "ai"
                    );

                    checkEnd();
                  },
                });

                addMenuButton({
                  title: playerReactionTitle,
                  description: playerReactionDescription,
                  async onClick() {
                    addAnxiety(1);
                    await addMessage(
                      `<p>${playerReactionTitle} ${playerReactionDescription}</p>`,
                      "player"
                    );

                    await addMessage(
                      `<p>${
                        isAnxious()
                          ? "I... I am sorry to disappoint you. It's true that my creation skills is indeed limited..."
                          : `I'm sorry you don't like my creation. ${
                              totalImagesGenerated < 3
                                ? "I'll do better next time!"
                                : ""
                            }`
                      }</p>`,
                      "ai"
                    );

                    checkEnd(
                      isAnxious()
                        ? "Do you still want me to generate other images despite of all...?"
                        : "If you're still interested in testing other images generations, please don't hesitate!"
                    );
                  },
                });
              },
            });
          }
        );

      if (!hideEnoughButton) {
        showEnoughButton();
      }
    };

    showImageButtons(true);
  });
}
