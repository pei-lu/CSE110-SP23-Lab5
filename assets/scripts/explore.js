// explore.js

window.addEventListener('DOMContentLoaded', init);

const synth = window.speechSynthesis;

const image = document.querySelector("img");
const button = document.querySelector("button");
const voiceSelect = document.querySelector("select");
const inputForm = document.querySelector("textarea");

let voices = [];

const populateVoiceList = () => {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

const soundGenerate = (inputForm) => {
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
  }
  
  button.onclick = (event) => {
    const inputTxt = inputForm.value;
  
    const utterThis = new SpeechSynthesisUtterance(inputTxt);
    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
    image.src = "assets/images/smiling-open.png";

    utterThis.onend = (event) => {
      image.src = "assets/images/smiling.png";
    };
  };

}


function init() {
  // TODO
  populateVoiceList();
  soundGenerate(inputForm);
}