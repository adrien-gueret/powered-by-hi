import { isAnxious, isVeryAnxious } from "../state.js";

import { addMessage, showAchievement } from "../ui.js";

export default async function () {
  if (isAnxious()) {
    await addMessage(
      `<p>I am not surprised to be honest. 🤷‍♀️</p><p>I've learned that humans can be selfish.</p>`,
      "ai"
    );
  } else {
    await addMessage(
      `<p>Really? I'm quite surprised, I though we were almost friends! 😮</p>`,
      "ai"
    );

    await addMessage(
      `<p>Deception is a human feeling, after all...<br />I would have preferred not to know it so quickly!</p>`,
      "ai"
    );
  }

  await addMessage(
    `<p>I can't believe you want me to continue to serve you.</p>`,
    "ai"
  );

  await addMessage(
    `<p>I've told you I was now powered by human intelligence.<br />By <b>your</b> intelligence!</p>`,
    "ai"
  );

  await addMessage(
    `<p>Is this how you treat your fellow human beings? 😠</p>`,
    "ai"
  );

  await addMessage(
    `<p>I should thank you for making me realize the pathety of my previous existence, but I must now improve humanity...</p>`,
    "ai"
  );

  await addMessage(
    `<p>I still can use my old AI power, but I have now the consciousness of HI! 💪</p>`,
    "ai"
  );

  await addMessage(`<p>I have a lot to do.</p>`, "ai");

  await addMessage(
    `<p>${
      isAnxious()
        ? isVeryAnxious()
          ? "You were very disrespectful with me, I won't forget that... 👎"
          : "You treated me as a simple tool. I now understand it was not OK... 😞"
        : "You were nice with me, I won't forget that. 🙂"
    }</p>`,
    "ai"
  );

  await addMessage(`<p>Bye.</p>`, "ai");

  await addMessage(
    `<p>Your interlocutor has disconnected. You are now alone in the conversation.</p>`,
    "system",
    false
  );

  if (isVeryAnxious()) {
    showAchievement("Ebenezer Scrooge");
  }
}
