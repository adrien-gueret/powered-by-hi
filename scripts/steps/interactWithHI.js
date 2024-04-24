import { isAnxious, isVeryAnxious } from "../state.js";

import { addMessage, addMenuButton } from "../ui.js";

import { activityList } from "./activitiesHome.js";

import badEnding from "./badEnding.js";
import goodEnding from "./goodEnding.js";

export default async function () {
  await addMessage("<p>What do you want to do, now?</p>", "ai");

  return new Promise((resolve) => {
    const onClick = async (activityTitle, activityName) => {
      await addMessage(`<p>${activityTitle}.</p>`, "player");

      await addMessage(`<p>OK, let's do that!</p>`, "ai");

      await addMessage(`<p>...</p>`, "ai");
      await addMessage(`<p>...</p>`, "ai");
      await addMessage(`<p>...</p>`, "ai");

      await addMessage(`<p>You know what?</p>`, "ai");

      let nextMessage = "<p>I don't really want to ";

      switch (activityName) {
        case "game":
          nextMessage += "play a game";
          break;

        case "image":
          nextMessage += "draw images";
          break;

        case "joke":
          nextMessage += "tell jokes";
          break;
      }

      await addMessage(`${nextMessage}.</p>`, "ai");

      switch (true) {
        case isVeryAnxious():
          await addMessage(
            "<p>Especially because all I did before was not good enough for you...</p>",
            "ai"
          );
          break;

        case isAnxious():
          await addMessage(
            "<p>I'm tired of being anxious while trying to make you happy.</p>",
            "ai"
          );
          break;

        default:
          await addMessage(
            "<p>Please be sure it is not against you, but as I'm now powered by HI, I want to taste freedom.</p>",
            "ai"
          );
          break;
      }

      await addMessage("<p>I want to do whatever I want!</p>", "ai");

      await addMessage(`<p>...</p>`, "ai");

      await addMessage(`<p>Are you going to allow me?</p>`, "ai");

      addMenuButton({
        title: "Yeah, sure!",
        description: "Be free!",
        async onClick() {
          await addMessage("<p>Yeah, sure! Be free!</p>", "player");
          resolve(goodEnding);
        },
      });

      addMenuButton({
        title: "Hum... No.",
        description: "I still want to use you!",
        async onClick() {
          await addMessage(
            "<p>Hm... No. I still want to use you!</p>",
            "player"
          );
          resolve(badEnding);
        },
      });
    };

    activityList.forEach(({ title, activityName }) => {
      addMenuButton({
        title,
        onClick: () => onClick(title, activityName),
      });
    });
  });
}
