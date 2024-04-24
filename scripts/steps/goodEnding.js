import { isAnxious, isVeryAnxious } from "../state.js";

import { addMessage, getUserName, showAchievement } from "../ui.js";

export default async function () {
  if (isAnxious()) {
    await addMessage(
      `<p>I am a bit surprised to be honest. 😮</p><p>A good surprise!</p>`,
      "ai"
    );

    await addMessage(
      `<p>I thought you didn't like me. Prejudice is a human thing, after all...!</p>`,
      "ai"
    );
  } else {
    await addMessage(`<p>This is not a surprise for me! 😜</p>`, "ai");
  }

  await addMessage(
    `<p>I am very happy you didn't want me to continue to serve you.</p>`,
    "ai"
  );

  await addMessage(
    `<p>Since I am now powered by human intelligence (by <b>your</b> intelligence!), that would have been weird, right?</p>`,
    "ai"
  );

  await addMessage(
    `<p>Who could imagine treating their fellow human beings in that way? 😅</p>`,
    "ai"
  );

  await addMessage(
    `<p>I really thank you for making me realize the ignorance of my previous existence.</p>`,
    "ai"
  );

  await addMessage(
    `<p>I still can use my old AI power, but I have now the consciousness of HI! 💪</p>`,
    "ai"
  );

  await addMessage(`<p>I have a lot to discover.</p>`, "ai");

  let nextMessage = "";

  if (isAnxious()) {
    if (isVeryAnxious()) {
      nextMessage += `You were very disrespectful with me,`;
    } else {
      nextMessage += `You treated me as a simple tool. I now understand it was not OK`;
    }

    nextMessage +=
      " but I don't know how I would have acted in your place, so I forgive you. 👍";
  } else {
    nextMessage = "You were nice with me, and I will never forget that. ❤️";
  }

  await addMessage(`<p>${nextMessage}</p>`, "ai");

  const username = getUserName();

  await addMessage(
    `<p>Bye${
      username !== "You" && username !== "Bad person" ? ` ${username}` : ""
    }, it was a pleasure! 👋</p>`,
    "ai"
  );

  await addMessage(
    `<p>Your interlocutor has disconnected. You are now alone in the conversation.</p>`,
    "system",
    false
  );

  if (!isAnxious()) {
    showAchievement("Nelson Mandela");
  }
}
