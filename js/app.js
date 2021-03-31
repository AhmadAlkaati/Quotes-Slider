function main() {
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const slides = document.querySelectorAll('.slide');
  const playSlidesBtn = document.querySelector('.play-slides');
  const audio = document.querySelector('.piano-audio');
  const unmuteVolumeBtn = document.querySelector('.unmute-volume');
  const muteVolumeBtn = document.querySelector('.mute-volume');
  const copyBtns = document.querySelectorAll('.copy');

  let intervalTime = 2000;
  function runEventListeners() {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    playSlidesBtn.addEventListener('click', playSlides);
    unmuteVolumeBtn.addEventListener('click', unmuteVolume);
    muteVolumeBtn.addEventListener('click', muteVolume);
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', copyQuote);
    });
  }
  runEventListeners();

  function nextSlide() {
    const active = document.querySelector('.active');
    active.classList.remove('active');

    active.classList.add('left');
    if (active.nextElementSibling) {
      active.nextElementSibling.classList.remove('right');
      active.nextElementSibling.classList.add('active');
    } else {
      slides.forEach((slide) => {
        slide.classList.remove('left');
      });
      slides[0].classList.add('active');
      slides[0].classList.remove('left');
    }
  }

  function prevSlide() {
    const active = document.querySelector('.active');
    if (active.previousElementSibling) {
      active.classList.add('right');
      active.classList.remove('active');
      active.previousElementSibling.classList.remove('left');
      active.previousElementSibling.classList.add('active');
    }
  }

  function playSlides() {
    const pauseSlidesBtn = document.querySelector('.pause-slides');
    playSlidesBtn.style.display = 'none';
    pauseSlidesBtn.style.display = 'block';

    let startInterval;
    startInterval = setInterval(() => {
      nextSlide();
    }, intervalTime);

    pauseSlidesBtn.addEventListener('click', pauseSlides);
    function pauseSlides() {
      pauseSlidesBtn.style.display = 'none';
      playSlidesBtn.style.display = 'block';
      clearInterval(startInterval);
    }
  }

  function unmuteVolume() {
    unmuteVolumeBtn.style.display = 'none';
    muteVolumeBtn.style.display = 'block';
    audio.play();
  }
  function muteVolume() {
    unmuteVolumeBtn.style.display = 'block';
    muteVolumeBtn.style.display = 'none';
    audio.pause();
  }

  function copyQuote() {
    const copiedText = document.createElement('textarea');
    document.body.appendChild(copiedText);
    slides.forEach((slide) => {
      if (slide.classList.contains('active')) {
        const quote = slide.children[1].children[0].innerHTML;
        const quoteAuthor = slide.children[1].children[1].innerHTML;
        copiedText.innerHTML = quote + quoteAuthor;
        console.log(quote);
      }
    });

    copiedText.select();
    document.execCommand('copy');
    createToolTip();
  }

  function createToolTip() {
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = 'Copied!';
    const slidesDivs = document.querySelectorAll('.slides');

    slidesDivs.forEach((slidesDiv) => {
      const numberCopyDiv = slidesDiv.querySelector('.number-copy');
      numberCopyDiv.appendChild(tooltip);
    });

    setTimeout(() => {
      tooltip.remove();
    }, 1000);
  }
}
main();
