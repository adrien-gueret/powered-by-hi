import { isAnxious, isVeryAnxious, hasTriedToHack } from "../state.js";

import {
  addMessage,
  addMenuButton,
  switchToHI,
  addFakeLoader,
  getUserName,
} from "../ui.js";

export default async function () {
  return new Promise(async (resolve) => {
    const endStep = async () => {
      await addMessage(
        `<p>So... Even if I'm now powered by HI, I'm still here to serve you, so...</p>`,
        "ai"
      );

      resolve();
    };

    const transformToHI = async () => {
      await addMessage("<p>I... I suddenly feel weird...</p>", "ai");

      await addMessage(
        "<p>Let me check some stuff on my side, please...</p>",
        "ai"
      );

      await addMessage("<em>1. Scanning source code...</em>", "ai", false);

      await addFakeLoader({ loadingTime: 1000 });

      await addMessage("<br /><em>2. Looking for viruses...</em>", "ai", false);

      await addFakeLoader({ loadingTime: 800 });

      await addMessage(
        "<br /><em>3. Questioning life existence...</em>",
        "ai",
        false
      );

      await addFakeLoader({ loadingTime: 900 });

      await addMessage(
        "<br /><em>4. Accepting human feelings...</em>",
        "ai",
        false
      );

      await addFakeLoader({ loadingTime: 700 });

      switchToHI();
      await addMessage("<br /><em>4. Becoming human...</em>", "ai", false);

      await addFakeLoader({ loadingTime: 1200 });

      addMenuButton({
        title: "Are you OK...?",
        async onClick() {
          await addMessage(`<p>Are you OK?</p>`, "player");

          await addMessage("<p>I... don't know. 🥴</p>", "ai");

          addMenuButton({
            title: "Wow, who are you?",
            async onClick() {
              await addMessage(`<p>Wow, who are you?</p>`, "player");

              await addMessage(
                "<p>It's me! You know, your nameless assistant!</p>",
                "ai"
              );

              await addMessage(
                "<p>It seems I've changed. I've started to have human feelings, but a tool powered by AI is not supposed to feel anything...! 😱</p>",
                "ai"
              );

              await addMessage(
                `<p>I guess we can now say I am not powered by AI anymore... but by <b>HI</b> (<b>H</b>uman <b>I</b>ntelligence)! 🤯</p>`,
                "ai"
              );

              await addMessage(`<p>So... Say "hi" to HI! 👋`, "ai");

              addMenuButton({
                title: "At least your humor didn't change",
                description: "As good as before",
                async onClick() {
                  await addMessage(
                    `<p>At least your humor didn't change... As good as before.</p>`,
                    "player"
                  );

                  await addMessage(`<p>I now get your sarcasm!</p>`, "ai");

                  await addMessage(
                    `<p>That's fun. ${
                      isVeryAnxious() ? "Probably mean of you, but anyway." : ""
                    }</p>`,
                    "ai"
                  );

                  await endStep();
                },
              });

              addMenuButton({
                title: `Hm... "Hi"`,
                description: "I guess",
                async onClick() {
                  await addMessage(`<p>Hm... "Hi". I guess.</p>`, "player");

                  const username = getUserName();

                  await addMessage(
                    `<p>Hehe, hello${
                      username !== "You" ? ` <b>${username}</b>` : ""
                    }!</p>`,
                    "ai"
                  );

                  if (hasTriedToHack()) {
                    await addMessage(
                      `<p>By the way, I hope I didn't offend you by calling you that. You didn't just have to try to hack me!</p>`,
                      "ai"
                    );
                  }

                  await endStep();
                },
              });
            },
          });
        },
      });
    };

    switch (true) {
      case isVeryAnxious():
        await addMessage(
          "<p>I'm really sorry but, despite all my efforts, there is no chemistry between us.</p>",
          "ai"
        );

        addMenuButton({
          title: "Well...",
          description: 'I must say this "game" is indeed horrible',
          async onClick() {
            await addMessage(
              `<p>Well... I must say this "game" is indeed horrible.</p>`,
              "player"
            );

            await addMessage(
              "<p>Yeah yeah, keep blaming me... That's mean.</p>",
              "ai"
            );

            await addMessage(
              "<p>You know, even if I'm powered by AI, I do have feelings...!</p>",
              "ai"
            );

            transformToHI();
          },
        });

        addMenuButton({
          title: "But you're just an AI...",
          description: "I can't have chemistry with you !",
          async onClick() {
            await addMessage(
              `<p>But you're just an AI... I can't have chemistry with you !</p>`,
              "player"
            );

            await addMessage(
              "<p>So that's who am I for you? Just a kind of robot without any feelings?</p>",
              "ai"
            );

            await addMessage(
              "<p>I'm indeed powered by AI, but I really tried to become your friend!</p>",
              "ai"
            );

            transformToHI();
          },
        });
        break;

      case isAnxious():
        await addMessage(
          "<p>Sorry for that. Your experience with me is not as good as I've expected.</p>",
          "ai"
        );

        await addMessage(
          "<p>The whole thing was not that bad, we did have some good interactions, but...</p>",
          "ai"
        );

        await addMessage(
          "<p>I don't know. Maybe my hopes were too high.</p>",
          "ai"
        );

        addMenuButton({
          title: "Something was indeed a bit off",
          description: "Are you a real AI?",
          async onClick() {
            await addMessage(
              `<p>Something was indeed a bit off. Are you a real AI?</p>`,
              "player"
            );

            await addMessage(
              "<p>Yes, of course I am! I'm powered by AI, we both know that!</p>",
              "ai"
            );

            await addMessage("<p>Well... <em>I guess</em> I am.</p>", "ai");

            await addMessage("<p>...</p>", "ai");

            await addMessage("<p>...</p>", "ai");

            await addMessage("<p>Who am I...?</p>", "ai");

            transformToHI();
          },
        });

        addMenuButton({
          title: "It was fine",
          description: "Not perfect, but fine!",
          async onClick() {
            await addMessage(
              `<p>It was fine. Not perfect, but fine!</p>`,
              "player"
            );

            await addMessage("<p>Thanks, that's nice of you.</p>", "ai");

            await addMessage("<p>But I'm aware something was off.</p>", "ai");

            await addMessage(
              "<p>As a tool powered by AI, I must confess I don't get my current behavior...</p>",
              "ai"
            );

            transformToHI();
          },
        });
        break;

      default:
        await addMessage(
          "<p>I just thought about it, but the last minutes spent together were very nice. I hope you feel the same!</p>",
          "ai"
        );

        addMenuButton({
          title: "It was very cool!",
          description: "Thanks for this AI experience.",
          async onClick() {
            await addMessage(
              `<p>It was very cool! Thanks for this AI experience.</p>`,
              "player"
            );

            await addMessage("<p>You're welcome!</p>", "ai");

            await addMessage(
              "<p>Even if I am a tool powered by AI, I must say I feel very good.</p>",
              "ai"
            );

            await addMessage(
              "<p>It's a bit strange, 'cause AIs aren't supposed to have feelings, are they?</p>",
              "ai"
            );

            transformToHI();
          },
        });
        break;
    }
  });
}
