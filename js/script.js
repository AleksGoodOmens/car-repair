'use strict';
document.addEventListener('DOMContentLoaded', () => {
    console.log('content is loaded');
    // const tab = document.querySelector('.gallery__navigation-tabs');
    // console.log(tabs);
    const tabs = document.querySelectorAll('.gallery__navigation-tab');
    console.log(tabs);
    const slides = document.querySelectorAll('.gallery__slide');
    console.log(slides);
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
        console.log('show');
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
    new Card(
        'I used the services of this vervis and was satisfied! I can recommend these guys for solving the most difficult tasks!',
        "https://source.unsplash.com/random/200x200?sig=16",
        'Aleks Gomeniuk',
        '.reviews-wrapper',

    ).renderNewCard();
    new Card(
        'Я очень рада оставить свой комментарий а данной страничке.',
        "https://source.unsplash.com/random/200x200?sig=44",
        'Valentina Gomeniuk',
        '.reviews-wrapper'
    ).renderNewCard();
    // new Card(
    //     'Мне сказали что я должна оставить свой комментарий и я обязательно его сделаю! Но сначала мне нужно дожарить котлетки',
    //     "https://source.unsplash.com/random/200x200?sig=13",
    //     'Юлия Никитина',
    //     '.reviews-wrapper'
    // ).renderNewCard();

});