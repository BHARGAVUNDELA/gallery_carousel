const track = document.querySelector('.carousel__track');
const slide = Array.from(track.children);

const prevButton = document.querySelector('.carousel__button-left');
const nextButton = document.querySelector('.carousel__button-right');

const navIndicator = document.querySelector('.carousel__nav');
const indicator = Array.from(navIndicator.children);

// get width of each slide responsively
const slideWidth = slide[0].getBoundingClientRect().width;
// console.log(slideWidth);

// arrange slide sideways
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slide.forEach(setSlidePosition);

// functions

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateIndicator = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const hideShowArrows = (slide, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slide.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
};

// next slide 
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navIndicator.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slide.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicator(currentDot, nextDot);
    hideShowArrows(slide, prevButton, nextButton, nextIndex);
});

// prev slide
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navIndicator.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slide.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateIndicator(currentDot, prevDot);
    hideShowArrows(slide, prevButton, nextButton, prevIndex);
});

// nav indicators

navIndicator.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = navIndicator.querySelector('.current-slide');
    const targetIndex = indicator.findIndex(dot => dot === targetDot);
    const targetSlide = slide[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateIndicator(currentDot, targetDot);
    hideShowArrows(slide, prevButton, nextButton, targetIndex);
})