'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // const tab = document.querySelector('.gallery__navigation-tabs');
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

    // galleryPictures.forEach(picture => {
    //     picture.addEventListener('mouseover', () => {
    //         showSlide(picture, 'content');
    //     });
    //     picture.addEventListener('mouseout', () => {
    //         hideSlide(galleryPictures, 'content');
    //     });
    // });

    function showSlide(element, classes = 'active') {
        element.classList.add(classes);

    }
    function hideSlideDirectElement(element, className) {
        element.classList.remove(className);
    }
    function hideSlide(elements, classes = 'active') {
        elements.forEach(element => {
            element.classList.remove(classes);
        });

    }

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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Cloud not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

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

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', JSON.stringify(json)
                .then(data => {
                    console.log(data);
                    form[5].classList.add('greenBG');
                    form[5].firstElementChild.textContent = message.success;
                }).catch(() => {
                    form[5].firstElementChild.textContent.textContent = message.failure;
                }).finally(() => {
                    setTimeout(() => {
                        form.reset();
                        form[5].classList.remove('greenBG');
                        form[5].firstElementChild.textContent = 'Make an appointment';
                    }, 4000);
                }));
        });
    }

    //? get Data
    //? fetch
    fetch('http://localhost:3000/customersCards')
        .then(data => data.json())
        .then(res => console.log(res));

    fetch('http://localhost:3000/serviceCards')
        .then(data => data.json())
        .then(res => console.log(res));

    fetch('http://localhost:3000/promiseCards')
        .then(data => data.json())
        .then(res => console.log(res));

});

