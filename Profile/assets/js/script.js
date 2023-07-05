AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1500, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

// Back to the top
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress-backToTop");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;

  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 500) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#e0f780 ${scrollValue}%, #022a30 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// let words = document.querySelectorAll(".word");
// console.log(words);

// words.forEach((word) => {
//   let letters = word.textContent.split("");
//   words.textContent = "";
//   letters.forEach((letter) => {
//     let span = document.createElement("span");
//     span.textContent = letter;
//     span.className = "letter";
//     word.append(span);
//   });
// });

// let currentWordIndex = 0;
// let maxWordIndex = words.length - 1;
// words[currentWordIndex].style.opacity = "1";

// let changeText = () => {
//   let currentWord = words[currentWordIndex];
//   let nextWord =
//     currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

//   Array.from(currentWord.children).forEach((letter, i) => {
//     setTimeout(() => {
//       letter.className = "letter out";
//     }, i * 80);
//   });

//   nextWord.style.opacity = "1";
//   Array.from(nextWord.children).forEach((letter, i) => {
//     letter.className = "letter behind";
//     setTimeout(() => {
//       letter.className = "letter in";
//     }, 340 + i * 80);
//   });
//   currentWordIndex =
//     currentWordIndex === maxWordIndex ? 0 : currentWordText + 1;
// };

// changeText();
// setInterval(changeText, 3000);

let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.appendChild(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });

  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);
