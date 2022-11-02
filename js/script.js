'use strict';
document.addEventListener('DOMContentLoaded', () => {
    class Card {
        constructor(comment, src, name, parentSelector, ...classes) {
            this.comment = comment;
            this.src = src;
            this.name = name;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }
        renderNewCard() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                element.classList.add('reviews__card');
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className);
                });
            }
            element.innerHTML = `
            <div class="reviews__comment">${this.comment}</div>
            <div class="reviews__author"><img class="reviews__photo" src=${this.src} alt="avatar - ${this.name}"> <span>${this.name}</span></div>`;
            this.parent.append(element);
        }
    }

    class AutoCardRender {
        constructor(parentSelector, cardClass, imgBoxClass, imgClass, imgSrc, imgAlt, textBoxClass, titleClass, title, textClass, comment) {
            this.parentSelector = parentSelector;
            this.cardClass = cardClass;
            this.imgBoxClass = imgBoxClass;
            this.imgClass = imgClass;
            this.imgSrc = imgSrc;
            this.imgAlt = imgAlt;
            this.textBoxClass = textBoxClass;
            this.titleClass = titleClass;
            this.title = title;
            this.textClass = textClass;
            this.comment = comment;
            this.parent = document.querySelector(parentSelector);
        }

        renderCard() {
            const div = document.createElement('div');
            div.classList.add(this.cardClass);
            div.innerHTML = ` <div class=${this.imgBoxClass}><img class=${this.imgClass} src=${this.imgSrc} alt=${this.imgAlt} ></div>
            <div class=${this.textBoxClass}>
                <div ${this.titleClass}>${this.title}</div>
                <div class=${this.textClass}>${this.comment}</div>
            </div>`;
            this.parent.append(div);
        }
    }
    class GallerySlider {
        constructor(description, sources, subtitle, thumb, title, navTitle) {
            this.discr = description;
            this.source = sources;
            this.title = title;
            this.subtitle = subtitle;
            this.thumbs = thumb;
            this.navTitle = navTitle;
            this.navTab = document.querySelector('.gallery__navigation-tabs');
            this.parent = document.querySelector('.gallery__body');
        }

        renderNewVideoSlide() {
            let newNavTab = document.createElement('li');
            newNavTab.className = 'gallery__navigation-tab';
            newNavTab.innerText = this.navTitle;
            this.navTab.append((newNavTab));
            let newSlide = document.createElement('div');
            newSlide.className = 'gallery__slide';
            // newSlide.classList.add('active');
            newSlide.innerHTML = `<figure class="gallery__slide-content video">
                <video class="video__video" src=${this.source} poster=${this.thumbs} preload="none"></video>
                <div class="video__controls">
                    <div class="video__progress" id="progress">
                        <div class="progress-bar" id="progress-bar"></div>
                    </div>
                    <div class="video__buttons">
                        <button class="video__button video__button-playPause" id="playpause" type="button" data-state="play"></button>
                    </div>
                </div>
                </figure>`;
            this.parent.append(newSlide);
        }
        updateNav() {
            const tabs = document.querySelectorAll('.gallery__navigation-tab');
            const slides = document.querySelectorAll('.gallery__slide');
            const galleryPictures = document.querySelectorAll('.gallery-pictures__item');
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    hideSlide(tabs);
                    showSlide(tab);
                    hideSlide(slides);
                    showSlide(slides[index]);
                });

            });
            let showSlide = function showSlide(element, classes = 'active') {
                element.classList.add(classes);
            };

            let hideSlide = function hideSlide(elements, classes = 'active') {
                elements.forEach(element => {
                    element.classList.remove(classes);
                });
            };
        }


    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Cloud not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };
    getResource('http://localhost:3000/videos')
        .then(data => {
            data.forEach(({ description, sources, subtitle, thumb, title, navTitle }) => {
                new GallerySlider(description, sources, subtitle, thumb, title, navTitle).renderNewVideoSlide();
                new GallerySlider().updateNav();
            });
            playerInit();
        });

    getResource('http://localhost:3000/customersCards')
        .then(data => {
            data.forEach(({ comment, img, name, parentClass }) => {
                new Card(comment, img, name, parentClass).renderNewCard();
            });
        });

    getResource('http://localhost:3000/promiseCards')
        .then(data => {
            data.forEach(({ parentSelector, cardClass, imgBoxClass, imgClass, imgSrc, imgAlt, textBoxClass, titleClass, title, textClass, comment }) => {
                new AutoCardRender(parentSelector, cardClass, imgBoxClass, imgClass, imgSrc, imgAlt, textBoxClass, titleClass, title, textClass, comment).renderCard();
            });
        });

    getResource('http://localhost:3000/serviceCards')
        .then(data => {
            data.forEach(({ parentSelector, cardClass, imgBoxClass, imgClass, imgSrc, imgAlt, textBoxClass, titleClass, title, textClass, comment }) => {
                new AutoCardRender(parentSelector, cardClass, imgBoxClass, imgClass, imgSrc, imgAlt, textBoxClass, titleClass, title, textClass, comment).renderCard();
            });
        });

    //! send
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading',
        success: 'Thank you!',
        failure: 'Error'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form[5].firstElementChild.textContent = message.loading;

            const formData = new FormData(form);
            console.log(formData);
            let fromEntries = formData.entries();
            console.log(fromEntries);
            let objectFormEnt = Object.fromEntries(fromEntries);
            console.log(objectFormEnt);
            const json = JSON.stringify(objectFormEnt);
            console.log(json);

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    form[5].classList.add('greenBG');
                    form[5].firstElementChild.textContent = message.success;
                }).catch(() => {
                    form[5].firstElementChild.textContent = message.failure;
                }).finally(() => {
                    setTimeout(() => {
                        form.reset();
                        form[5].classList.remove('greenBG');
                        form[5].firstElementChild.textContent = 'Make an appointment';
                    }, 4000);
                })
                ;
        });
    }



    function playerInit() {
        console.log('player Init');
        const playPauseBtns = document.querySelectorAll('.video__button-playPause');
        const videos = document.querySelectorAll('.video__video');
        const progressBars = document.querySelectorAll('.progress-bar');
        playPauseBtns.forEach((playPauseBtn, btnIndex) => {
            playPauseBtn.addEventListener('click', () => {
                console.log('clicked');
                if (videos[btnIndex].paused) {
                    playPauseBtn.dataset.state = 'pause';
                    videos[btnIndex].play();
                    videos[btnIndex].addEventListener('timeupdate', () => {
                        let progressBarPos = videos[btnIndex].currentTime / videos[btnIndex].duration;
                        progressBars[btnIndex].style.width = progressBarPos * 100 + '%';
                    });
                } else if (videos[btnIndex].ended) {
                    playPauseBtn.dataset.state = 'play';
                } else {
                    playPauseBtn.dataset.state = 'play';
                    videos[btnIndex].pause();
                }
            });
        });
    }
    // let VideoControlsUpdate = setTimeout(playerInit, 1000);


    function backgroundVideo() {
        const sectionVideo = document.querySelector('.section-video__video'),
            playBtn = document.querySelector('.section-video__button');
        playBtn.addEventListener('click', () => {
            sectionVideo.play();
            sectionVideo.loop = true;
            playBtn.classList.add('hidePlayButton');
        });
    }
    backgroundVideo();

    //! burger menu
    const burger = document.querySelector('.burger'),
        headerBottom = document.querySelector('.header-bottom');
    function addClass(className, button, element) {
        button.addEventListener('click', () => {
            element.classList.toggle(className);
            if (button.style.color === 'rgb(2, 19, 60)') {
                button.style.color = 'rgb(196, 11, 11)';
            } else button.style.color = 'rgb(2, 19, 60)';
        });
    }
    addClass('active-burger', burger, headerBottom);

    //! get Data

    //? fetch
    fetch('http://localhost:3000/customersCards')
        .then(data => data.json())
        .then(res => console.log('customersCards'));

    fetch('http://localhost:3000/serviceCards')
        .then(data => data.json())
        .then(res => console.log('serviceCards'));

    fetch('http://localhost:3000/promiseCards')
        .then(data => data.json())
        .then(res => console.log('promiseCards'));
    fetch('http://localhost:3000/videos')
        .then(data => data.json())
        .then(res => console.log('videos'));
});