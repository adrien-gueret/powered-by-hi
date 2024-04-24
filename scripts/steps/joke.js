import {
  addAnxiety,
  addMaxPossibleAnxiety,
  isAnxious,
  doActivity,
} from "../state.js";

import { addMessage, addMenuButton, showAchievement } from "../ui.js";

import { shuffleArray } from "../utils.js";

import activitiesHome from "./activitiesHome.js";

export default async function () {
  doActivity("joke");

  let totalLikes = 0;

  const jokes = shuffleArray([
    {
      question: "Why don't skeletons fight each other?",
      answer: "They don't have the guts!",
      explanation: `The joke is a play on words. "Guts" can mean two things here: literal internal organs, which skeletons don't have because they're just bones, or courage and bravery. The joke suggests that skeletons don't fight because they lack both the literal guts and the figurative "guts" or bravery to do so.`,
    },
    {
      question: "What do you call fake spaghetti?",
      answer: "An impasta!",
      explanation: `It's a play on words involving "impasta," which sounds like "impostor." The humor comes from labeling fake spaghetti as an "impasta," suggesting it's an impostor pretending to be real pasta. It's a pun where the likeness in sound between "impasta" and "impostor" creates a light-hearted and silly twist.`,
    },
    {
      question: "Why did the scarecrow win an award?",
      answer: "Because he was outstanding in his field!",
      explanation: `This joke plays on the phrase "outstanding in his field." It's a pun where "outstanding" can mean both "excellent" and "literally standing out in a field." Since a scarecrow stands out in a field and does a great job scaring birds away, it humorously suggests that this is why it won an award—both for being excellent and for being positioned in a field.`,
    },
  ]);

  const tellJoke = () => {
    const jokesLeftCount = jokes.length;

    const { question, answer, explanation } = jokes.shift();

    const intro = (() => {
      switch (jokesLeftCount) {
        case 3:
          return isAnxious()
            ? "I hope you'll like this joke."
            : "I know a very funny joke!";

        case 2:
          return isAnxious()
            ? "This one should be better than the first one."
            : "Here is another funny joke.";

        case 1:
          return isAnxious()
            ? "Here is another one..."
            : "You will probably love this one!";
      }
    })();

    return new Promise(async (resolve) => {
      const askForEnd = async () => {
        if (jokes.length === 0) {
          await addMessage(
            `<p>As a tool powered by AI, my sense of humor is not as fine as humans. ${
              isAnxious()
                ? "I don't feel like telling jokes anymore, can we do something else, please?"
                : `That's said, I hope you still had some fun reading these jokes!`
            }</p>`,
            "ai"
          );

          if (totalLikes === 3) {
            showAchievement("Bozo the Clown");
          }

          resolve(activitiesHome);
          return;
        }

        await addMessage(
          `<p>${
            isAnxious()
              ? "Do you want another joke or are you tired of my stupid traits of humor?"
              : "May I tell you another joke?"
          }</p>`,
          "ai"
        );

        addMenuButton({
          title: "Sure, another one",
          async onClick() {
            addMaxPossibleAnxiety();

            await addMessage("<p>Sure, another one.", "player");

            await addMessage(
              `<p>${isAnxious() ? "OK, if you insist." : "With pleasure!"}</p>`,
              "ai"
            );

            resolve(await tellJoke());
          },
        });

        const stopButtonTitle =
          totalLikes === 0
            ? "Please, stop..."
            : "I prefer doing something else.";

        addMenuButton({
          title: stopButtonTitle,
          async onClick() {
            addAnxiety();

            await addMessage(`<p>${stopButtonTitle}</p>`, "player");

            await addMessage(
              `<p>${
                isAnxious()
                  ? "Sure. If I were you, I would have asked the same..."
                  : "No problems, let's check what we can do together!"
              }</p>`,
              "ai"
            );

            resolve(activitiesHome);
          },
        });
      };

      await addMessage(
        `<p>${intro}<br />${question}</p><p>${"...<br />".repeat(
          5
        )}</p><p>${answer}</p>`,
        "ai"
      );

      addMenuButton({
        title: "That's a funny one!",
        async onClick() {
          totalLikes++;

          addMaxPossibleAnxiety(2);

          await addMessage("<p>That's a funny one!</p>", "player");

          await addMessage(
            `<p>${
              isAnxious()
                ? "Really? To be honest I was not <em>that</em> sure about this one. "
                : "I'm glad you liked it!"
            }</p>`,
            "ai"
          );

          askForEnd();
        },
      });

      addMenuButton({
        title: "I don't get it...",
        async onClick() {
          addAnxiety();
          addMaxPossibleAnxiety();

          await addMessage("<p>I don't get it...</p>", "player");

          await addMessage(
            `<p>${
              isAnxious()
                ? `Oh... If a joke needs to be explained, that means it's a bad joke, right...? It's supposed to be a play on words. ${explanation} Probably not as fun as I thought...`
                : `No worries! ${explanation} It's a bit of silly, pun-based humor!`
            }</p>`,
            "ai"
          );

          askForEnd();
        },
      });

      addMenuButton({
        title: "I got it, but it is not funny",
        async onClick() {
          addAnxiety(2);

          await addMessage("<p>I got it, but it is not funny.</p>", "player");

          await addMessage(
            `<p>${
              isAnxious()
                ? "Sorry to fail you with this joke, I thought it'd be funny enough for you..."
                : "No problems, humor can definitely be subjective!"
            }</p>`,
            "ai"
          );

          askForEnd();
        },
      });
    });
  };

  return await tellJoke();
}
