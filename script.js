const video = document.querySelector("#video");
const playBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#stop");
const container = document.querySelector("#container");
const fullscreen = document.querySelector("#fullscreen");
const minFullscreen = document.querySelector("#miniFullscreen");
const highVolume = document.querySelector("#highVolume");
const mediumVolume = document.querySelector("#mediumVolume");
const mute = document.querySelector("#mute");
const range = document.querySelector("#range");
const inputRange = document.querySelector("#inputRange");
const inputTime = document.querySelector("#inputTime");
const controller = document.querySelector("#controller");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");

let showController = false;

video.volume = 0.3;

document.addEventListener("keydown", (e) => {
  if (!showController) {
    enableContoller();
  }
  if (e.key === " ") {
    if (video.paused) {
      video.play();
      return;
    } else {
      video.pause();
      return;
    }
  } else if (e.key === "f") {
    if (
      !document.fullscreenElement && // Standard
      !document.mozFullScreenElement && // Firefox
      !document.webkitFullscreenElement && // Chrome, Safari, Opera
      !document.msFullscreenElement
    ) {
      fullscreen.classList.add("hiddenBtn");
      minFullscreen.classList.remove("hiddenBtn");
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.mozRequestFullScreen) {
        // Firefox
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        // IE/Edge
        container.msRequestFullscreen();
      }
    } else {
      fullscreen.classList.remove("hiddenBtn");
      minFullscreen.classList.add("hiddenBtn");
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
  } else if (e.key === "m") {
    if (video.volume == 0) {
      video.volume = 1;
      inputRange.style.setProperty("--p", "100%");
      inputRange.value = 100;
      if (video.volume > 0.6) {
        highVolume.classList.remove("hiddenBtn");
        mediumVolume.classList.add("hiddenBtn");
      } else {
        highVolume.classList.add("hiddenBtn");
        mediumVolume.classList.remove("hiddenBtn");
      }
      mute.classList.add("hiddenBtn");
    } else {
      video.volume = 0;
      inputRange.style.setProperty("--p", "0%");
      inputRange.value = 0;
      highVolume.classList.add("hiddenBtn");
      mediumVolume.classList.add("hiddenBtn");
      mute.classList.remove("hiddenBtn");
    }
  }
});

playBtn.addEventListener("click", () => {
  video.play();
});

stopBtn.addEventListener("click", () => {
  video.pause();
});

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener("playing", () => {
  stopBtn.classList.remove("hiddenBtn");
  playBtn.classList.add("hiddenBtn");
});

video.addEventListener("pause", () => {
  stopBtn.classList.add("hiddenBtn");
  playBtn.classList.remove("hiddenBtn");
});

fullscreen.addEventListener("click", () => {
  fullscreen.classList.add("hiddenBtn");
  minFullscreen.classList.remove("hiddenBtn");
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.mozRequestFullScreen) {
    // Firefox
    container.mozRequestFullScreen();
  } else if (container.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    container.webkitRequestFullscreen();
  } else if (container.msRequestFullscreen) {
    // IE/Edge
    container.msRequestFullscreen();
  }
});

minFullscreen.addEventListener("click", () => {
  fullscreen.classList.remove("hiddenBtn");
  minFullscreen.classList.add("hiddenBtn");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // Chrome, Safari, Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // IE/Edge
    document.msExitFullscreen();
  }
});

highVolume.addEventListener("click", () => {
  inputRange.style.setProperty("--p", "0%");
  video.volume = 0;
  inputRange.value = 0;
  highVolume.classList.add("hiddenBtn");
  mediumVolume.classList.add("hiddenBtn");
  mute.classList.remove("hiddenBtn");
});

mediumVolume.addEventListener("click", () => {
  inputRange.style.setProperty("--p", "0%");
  inputRange.value = 0;
  video.volume = 0;
  highVolume.classList.add("hiddenBtn");
  mediumVolume.classList.add("hiddenBtn");
  mute.classList.remove("hiddenBtn");
});

mute.addEventListener("click", () => {
  inputRange.style.setProperty("--p", "100%");
  inputRange.value = 100;
  video.volume = 1;
  highVolume.classList.remove("hiddenBtn");
  mute.classList.add("hiddenBtn");
});

forward.addEventListener("click", () => {
  if (!showController) {
    enableContoller();
  }
  video.currentTime = video.currentTime + 5;
});

backward.addEventListener("click", () => {
  if (!showController) {
    enableContoller();
  }
  video.currentTime = video.currentTime - 5;
});

range.addEventListener("mouseenter", () => {
  inputRange.classList.remove("rangehidden");
});
range.addEventListener("mouseleave", () => {
  inputRange.classList.add("rangehidden");
});

const setRangeBg = (el) => {
  const min = +el.min || 0,
    max = +el.max || 100,
    val = +el.value || 0;
  const p = ((val - min) / (max - min)) * 100;
  el.style.setProperty("--p", p + "%");
  inputRange.value = p;
};

document.querySelectorAll(".yt-range").forEach((el) => {
  setRangeBg(el);
  el.addEventListener("input", () => {
    setRangeBg(el);
    video.volume = el.value / 100;
    if (video.volume > 0.6) {
      mute.classList.add("hiddenBtn");
      mediumVolume.classList.add("hiddenBtn");
      highVolume.classList.remove("hiddenBtn");
    } else if (video.volume < 0.6 && video.volume > 0) {
      highVolume.classList.add("hiddenBtn");
      mute.classList.add("hiddenBtn");
      mediumVolume.classList.remove("hiddenBtn");
    } else if (video.volume === 0) {
      mediumVolume.classList.add("hiddenBtn");
      highVolume.classList.add("hiddenBtn");
      mute.classList.remove("hiddenBtn");
    }
  });
  el.addEventListener("change", () => setRangeBg(el));
});

video.addEventListener("timeupdate", () => {
  const currentSeconds = video.currentTime;
  const totallSeconds = video.duration;
  // You can format and display currentSeconds as needed (e.g., minutes:seconds)
  inputTime.style.setProperty("--t", ((currentSeconds + 0.5) / totallSeconds).toFixed(2) * 100 + "%");
  inputTime.value = (currentSeconds / totallSeconds).toFixed(2) * 100;
});

inputTime.addEventListener("input", (e) => {
  video.currentTime = (e.target.value * video.duration) / 100;
});

container.addEventListener("mouseenter", () => {
  if (!showController) {
    enableContoller();
  }
});

container.addEventListener("mousemove", () => {
  if (!showController) {
    enableContoller();
  }
});

const enableContoller = () => {
  controller.classList.remove("contollerhidden");
  showController = true;
  setTimeout(() => {
    controller.classList.add("contollerhidden");
    showController = false;
  }, 5000);
};
