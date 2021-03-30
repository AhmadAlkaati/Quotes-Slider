function main() {
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const slides = document.querySelectorAll('.slide');
  const playSlidesBtn = document.querySelector('.play-slides');
  const audio = document.querySelector('.piano-audio');
  const unmuteVolumeBtn = document.querySelector('.unmute-volume');
  const muteVolumeBtn = document.querySelector('.mute-volume');

  let intervalTime = 2000;
  function runEventListeners() {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    playSlidesBtn.addEventListener('click', playSlides);
    unmuteVolumeBtn.addEventListener('click', unmuteVolume);
    muteVolumeBtn.addEventListener('click', muteVolume);
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
}
main();
