const home = document.getElementById("home");
const chat = document.getElementById("chat");

let currentSection = null;

const renderSection = (section) => {
  if (currentSection) {
    const prevSection = currentSection;
    prevSection.classList.remove("in");
  }

  section.classList.add("in");
  currentSection = section;
};

export default function init(onChatStart) {
  for (let link of home.querySelectorAll('a[href="#"]')) {
    link.onclick = (e) => {
      renderSection(chat);
      onChatStart(e.currentTarget.dataset);
    };
  }

  renderSection(home);
}
