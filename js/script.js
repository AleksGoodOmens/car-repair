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

    class AutoCardRender {
        constructor(parentSelector, cardClass, imgBoxClass, imgClass, imgSrc, imgAlt, textBoxClass, titleClass, title, textClass, comment, ...moreClasses) {
            this.parentSelector = parentSelector;
            this.parent = document.querySelector(parentSelector);
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
            this.moreClasses = moreClasses;
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
            console.log(`<div class=${this.titleClass + ' ' + this.moreClasses}>${this.title}</div>`);
        }
    }

    new AutoCardRender(
        '.promise__cards',
        'promise__card',
        'promise__img-box',
        'promise__img',
        './imgs/section-promise/1.png',
        'icon promise',
        'promise__text-box',
        'class="promise__card-title text-darkBlue"',
        'Quality service. Everytime.',
        'promise__text',
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium corrupti quos dolores et quas.',
        ''
    ).renderCard();

    new AutoCardRender(
        '.promise__cards',
        'promise__card',
        'promise__img-box',
        'promise__img',
        './imgs/section-promise/2.png',
        'icon promise',
        'promise__text-box',
        'class="promise__card-title text-darkBlue"',
        'Services by certified pros',
        'promise__text',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, in! Sequi dolorem sit consequatur a!',
        'text-darkBlue',
    ).renderCard();

    new AutoCardRender(
        '.promise__cards',
        'promise__card',
        'promise__img-box',
        'promise__img',
        './imgs/section-promise/3.png',
        'icon promise',
        'promise__text-box',
        'class="promise__card-title text-darkBlue"',
        'Real people. Honest work.',  //!
        'promise__text',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi atque ut quas maiores vero tempore similique quo praesentium itaque eius dolor animi incidunt, possimus ipsam perferendis amet, facere hic quidem?',
        'text-darkBlue',
    ).renderCard();


    //service
    new AutoCardRender(
        '.service__cards',
        'service__card',
        'service__img-box',
        'service__img',
        `'./imgs/section-service/1.png'`, //!
        'service Icon',
        'service__text-box',
        'class="service__title"',
        'Multi Point Inspections', //!
        'service__description',
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia delectus officia eius minima temporibus, blanditiis esse fuga debitis.',  //!

    ).renderCard();

    new AutoCardRender(
        '.service__cards',
        'service__card',
        'service__img-box',
        'service__img',
        `'./imgs/section-service/2.png'`, //!
        'service Icon',
        'service__text-box',
        'class="service__title"',
        'Auto Repair', //!
        'service__description',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad hic sapiente quaerat deleniti in ipsa pariatur explicabo accusantium fugit! Totam?',  //!

    ).renderCard();

    new AutoCardRender(
        '.service__cards',
        'service__card',
        'service__img-box',
        'service__img',
        `'./imgs/section-service/3.png'`, //!
        'service Icon',
        'service__text-box',
        'class="service__title"',
        'Auto Maintenance', //!
        'service__description',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nam voluptates odit nostrum, aspernatur est.',  //!

    ).renderCard();

    new AutoCardRender(
        '.service__cards',
        'service__card',
        'service__img-box',
        'service__img',
        `'./imgs/section-service/4.png'`, //!
        'service Icon',
        'service__text-box',
        'class="service__title"',
        'Tires', //!
        'service__description',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nam voluptates odit nostrum, aspernatur est.',  //!

    ).renderCard();

    new AutoCardRender(
        '.service__cards',
        'service__card',
        'service__img-box',
        'service__img',
        `'./imgs/section-service/5.png'`, //!
        'service Icon',
        'service__text-box',
        'class="service__title"',
        'Service Warranty', //!
        'service__description',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, possimus?', //!

    ).renderCard();

    new AutoCardRender(
        '.service__cards',
        'service__card',
        'service__img-box',
        'service__img',
        `'./imgs/section-service/6.png'`, //!
        'service Icon',
        'service__text-box',
        'class="service__title"',
        'Shop Online', //!
        'service__description',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ad dolor repudiandae? Mollitia, quas unde? Ducimus dolor nihil distinctio maxime.',  //!

    ).renderCard();


});

