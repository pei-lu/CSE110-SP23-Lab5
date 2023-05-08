// expose.js

window.addEventListener('DOMContentLoaded', init);

const hornSelect = document.querySelector("#horn-select");
const image = document.querySelector("img");
const audio = document.querySelector("audio");
const volumeIcon = document.querySelector("#volume-controls img");
const button = document.querySelector("button");
const volume = document.querySelector("#volume");
const confetti = new JSConfetti({
  confettiRadius: 8,
  confettiColors: ['#ff0000', '#00ff00', '#0000ff']
});

const hornSelectAction = (selector, image, audio) =>{
  if (selector.value === "air-horn") {
    image.src = "./assets/images/air-horn.svg";
    audio.src = "./assets/audio/air-horn.mp3";
  } else if (selector.value === "car-horn") {
    image.src = "./assets/images/car-horn.svg";
    audio.src = "./assets/audio/car-horn.mp3";
  } else if (selector.value === "party-horn") {
    image.src = "./assets/images/party-horn.svg";
    audio.src = "./assets/audio/party-horn.mp3";
  }
}

const audioControlAction = (audio, volume)=>{
  audio.volume = volume.value / 100;
    
  if (volume.value == 0) {
    volumeIcon.src = "./assets/icons/volume-level-0.svg";
  } else if (volume.value < 33) {
    volumeIcon.src = "./assets/icons/volume-level-1.svg";
  } else if (volume.value < 67) {
    volumeIcon.src = "./assets/icons/volume-level-2.svg";
  } else {
    volumeIcon.src = "./assets/icons/volume-level-3.svg";
  }
}

const volumeIconControlAction = (volume, volumeIcon, audio) => {
  if (volume.value == 0) {
    volumeIcon.src = "./assets/icons/volume-level-0.svg";
  } else if (volume.value < 33) {
    volumeIcon.src = "./assets/icons/volume-level-1.svg";
  } else if (volume.value < 67) {
    volumeIcon.src = "./assets/icons/volume-level-2.svg";
  } else {
    volumeIcon.src = "./assets/icons/volume-level-3.svg";
  }

  audio.volume = volume.value / 100;
}

const onClickAction = (selector, audio) => {
  audio.currentTime = 0;
  audio.play();

  if (selector.value === "party-horn") {
    confetti.addConfetti({
      initialPosition: { x: 100, y: 100 },
      direction: 'right'
  });
  }
}

function init() {
  hornSelect.addEventListener('change', () => {
    hornSelectAction(hornSelect, image, audio);
    audioControlAction(audio, volume, button);
  });

  volume.addEventListener('input', () => {
    volumeIconControlAction(volume, volumeIcon, audio);
  });

  button.addEventListener('click', () => {
    onClickAction(hornSelect, audio);
  });
}
