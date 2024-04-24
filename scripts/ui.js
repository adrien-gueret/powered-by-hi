import { getAnxiety } from "./state.js";
import { random } from "./utils.js";

const poweredByTarget = document.getElementById("powered-by-target");
const messages = document.getElementById("messages");
const chatMenu = document.getElementById("chat-menu");

let userColor = "#fff";
let userName = "You";

export const setUserColor = (newColor) => (userColor = newColor);
export const setUserName = (newName) => (userName = newName);
export const getUserName = () => userName;

export const switchToHI = async () => {
  let animation = poweredByTarget.animate([{ transform: `rotate(360deg)` }], {
    duration: 200,
    iterations: 6,
    easing: "linear",
  });

  await animation.finished;

  poweredByTarget.innerHTML = "HI";
  document.title = "powered by HI";
  favicon.href = "./styles/hi.png";

  animation = poweredByTarget.animate([{ transform: `rotate(360deg)` }], {
    duration: 400,
    iterations: 1,
    easing: "ease-out",
  });

  return animation.finished;
};

let lastSenderType = null;
let lastMessageContent = null;

export function scrollToBottom() {
  if (window.top === window.self) {
    window.scroll({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  } else if (lastMessageContent) {
    lastMessageContent.scrollIntoView({
      behavior: "smooth",
    });
  }
}

const loaderHTML = '<span class="loader"><span></span></span>';

export async function addMessage(content, senderType, shouldShowLoader = true) {
  if (senderType === "ai" && shouldShowLoader) {
    const container = await addMessage(loaderHTML, "ai", false);

    return new Promise((resolve) => {
      setTimeout(() => {
        const targetContainer =
          container.querySelector(".content-message") || container;
        targetContainer.innerHTML = content;
        resolve(container);
      }, random(1500) + 500);
    });
  }

  if (senderType === lastSenderType) {
    let nodeToAppend = document.createElement("span");
    nodeToAppend.innerHTML = content;
    lastMessageContent.appendChild(nodeToAppend);

    scrollToBottom();
    return nodeToAppend;
  }

  const isFromPlayer = senderType === "player";
  const avatarBgColor = ` style="background:${
    isFromPlayer ? userColor : `rgba(0,0,0,${getAnxiety() / 100})`
  };"`;
  const message = document.createElement("li");
  const senderName = isFromPlayer ? userName : poweredByTarget.innerHTML;
  const avatarClassName = isFromPlayer
    ? "player"
    : senderName.toLocaleLowerCase();

  message.className = "message";
  message.innerHTML =
    senderType === "system"
      ? `<div class="content-message system">${content}</div>`
      : `<div class="avatar ${avatarClassName}"${avatarBgColor}></div><div class="content"><p class="sender-name">${senderName}</p><div class="content-message">${content}</div></div>`;

  messages.appendChild(message);

  lastSenderType = senderType;
  lastMessageContent = message.querySelector(".content-message");

  scrollToBottom();

  return message;
}

export function getResultIcon(success) {
  return `
  <svg class="checkmark ${
    success ? "success" : "failure"
  }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
    ${
      success
        ? '<path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />'
        : '<path class="checkmark-check" fill="none" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"/>'
    }
  </svg>`;
}

export async function addFakeLoader({
  loadingTime = 3000,
  success = true,
} = {}) {
  const container = document.createElement("span");
  container.innerHTML = loaderHTML;

  lastMessageContent.appendChild(container);

  return new Promise((resolve) => {
    window.setTimeout(() => {
      container.innerHTML = getResultIcon(success);

      window.setTimeout(resolve, 1000);
    }, loadingTime);
  });
}

export function clearMessages() {
  messages.innerHTML = "";
}

export function clearMenu() {
  chatMenu.innerHTML = "";
}

export function addMenuInput({ placeholder, onSubmit, maxlength = 50 }) {
  const choiceItem = document.createElement("li");
  choiceItem.className = "choice-item";

  const form = document.createElement("form");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.name = "userChoice";
  input.maxLength = maxlength;
  input.autocomplete = "off";

  form.appendChild(input);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.ariaLabel = "Submit";
  submitButton.innerHTML =
    '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  form.appendChild(submitButton);

  choiceItem.appendChild(form);

  form.onsubmit = (e) => {
    e.preventDefault();
    onSubmit(input.value);
  };

  chatMenu.appendChild(choiceItem);

  scrollToBottom();

  input.focus();

  return choiceItem;
}

export function addMenuButton({
  title,
  description,
  onClick,
  disableClearMenu = false,
}) {
  const choiceItem = document.createElement("li");
  choiceItem.className = "choice-item";

  const button = document.createElement("button");
  button.className = "choice";

  if (onClick) {
    button.addEventListener("click", () => {
      if (!disableClearMenu) {
        clearMenu();
      }
      onClick();
    });
  }

  const titleElement = document.createElement("span");
  titleElement.className = "choice-title";
  titleElement.innerHTML = title;
  button.appendChild(titleElement);

  if (description) {
    const descriptionElement = document.createElement("span");
    descriptionElement.className = "choice-description";
    descriptionElement.innerHTML = description;
    button.appendChild(descriptionElement);
  }

  choiceItem.appendChild(button);

  chatMenu.appendChild(choiceItem);

  scrollToBottom();

  return choiceItem;
}

export default function init() {
  poweredByTarget.innerHTML = "AI";
  document.title = "powered by AI";
  poweredByTarget.style.removeProperty("opacity");
}
