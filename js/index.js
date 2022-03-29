// выбор языков
let langBtn = document.querySelector('.arrow-down-icon')
let langChangeBtn = document.querySelector('.language__dropdown-sub')
let langInputValue = document.querySelector('.dropdown__input-hidden')

langBtn.addEventListener('click', function() {
    langChangeBtn.classList.toggle('language__visible')
})

let languageDropdown = document.querySelectorAll('.dropdown__sub')
languageDropdown.forEach(function(listItem){
    listItem.addEventListener('click', function(e){
        e.stopPropagation()
        langBtn.innerText = this.innerText
        langInputValue.value = this.dataset.value
        langChangeBtn.classList.remove('language__visible')
    })
})
document.addEventListener('click', function(e){
    if(e.target !== langBtn){
        langChangeBtn.classList.remove('language__visible')
    }
})

// задизейбленая кнопка в модалке
btnStepDisable = document.getElementById('price_btn')
btnStepDisable.setAttribute('disabled', true);
stepValidateCheckbox = document.querySelectorAll('.form__input')
for (node of stepValidateCheckbox){
    node.addEventListener('input', ()=>{
        let activatedButton = false;
        for(checkboxValid of stepValidateCheckbox){
            if(checkboxValid.checked) {
                activatedButton = true;
            }
        }
        if(activatedButton) {
            btnStepDisable.removeAttribute('disabled');
        }else{
            btnStepDisable.setAttribute('disabled', true);
        }
    })
}

// 
function numberFunc() {
    let numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        let input = number.querySelector('.number__input'),
            btnUp = number.querySelector('.number__btn.number__btn--up'),
            btnDown = number.querySelector('.number__btn.number__btn--down'),
            min = input.getAttribute('min'),
            max = input.getAttribute('max'),
            step = input.getAttribute('step');

        if (input) {
            input.addEventListener('input', () => {
                handleInput(input, max, min)
            })
        }

        if (btnUp) {
            btnUp.addEventListener('click', () => {
                handleUp(input, max, step)
            });
        }
        if (btnDown) {
            btnDown.addEventListener('click', () => {
                handleDown(input, min, step)
            });
        }
    })

    function handleInput(input, max, min) {
        let value = +input.value.replace(/[^0-9]/g, '');
        if (value < +min) {
            input.value = +min;
        } else if (value > +max) {
            input.value = max;
        } else {
            input.value = value;
        }

    }

    function handleUp(input, max, step) {
        let oldValue = parseFloat(input.value), newValue;
        oldValue >= max ? newValue = oldValue : newValue = oldValue + parseFloat(step);
        input.value = newValue;
    }

    function handleDown(input, min, step) {
        let oldValue = parseFloat(input.value), newValue;
        oldValue <= min ? newValue = oldValue : newValue = oldValue - parseFloat(step);
        input.value = newValue;
    }
}

numberFunc();

function footerFilter() {
    let filters = document.querySelectorAll('.search-filter-footer');
    let footer = document.querySelector('footer.footer');
    filters.forEach(filter => {
        filter
            ? filter.classList.toggle('hide', footer.getBoundingClientRect().top - window.innerHeight <= 10)
            : '';

        window.addEventListener('scroll', () => {
            console.log('click');
            filter.classList.toggle('hide', footer.getBoundingClientRect().top - window.innerHeight <= 10)

        })
    })
}

footerFilter()

function onlyOneCheckBox() {
    let deliveryBlocks = document.querySelectorAll('.onlyCheckBlock');
    deliveryBlocks.forEach(deliveryBlock => {
        let checkboxes = deliveryBlock.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(item => {
            item.addEventListener('change', () => {
                item.parentElement.classList.add('uk-active');
                onlyOne(item, checkboxes)
            })
        })
    })

    function onlyOne(checkbox, checkboxes) {
        checkboxes.forEach((item) => {
            if (item !== checkbox) {
                item.checked = false;
                item.parentElement.classList.remove('uk-active');
            }
        })
    }
}

onlyOneCheckBox();

function hoverEffect() {
    let hoverEffect = document.querySelectorAll('.hoverEffect');

    hoverEffect.forEach(item => {
        item.addEventListener('mousemove', (event) => {
            handleMouseMove(item, event)
        })

        item.addEventListener('mouseleave', handleMouseLeave);
    })

    function handleMouseMove(el, event) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
        el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }

    function handleMouseLeave() {
        this.style.setProperty('--x', 0);
        this.style.setProperty('--y', 0);
    }

}

hoverEffect();

function mainSliderParallax() {
    let sliderMain = document.querySelector('.main-banner');
    if (sliderMain) {
        window.addEventListener('scroll', () => {
            sliderMain.style.top = `-${window.pageYOffset / 20}px`;
            sliderMain.firstElementChild.style.top = `${window.pageYOffset / 3}px`;
        })
    }
}

mainSliderParallax()

function croppingText() {
    let store = {
        state: {
            block: '',
            btn: '',
            text: '',
            croppingText: '',
        },
        _getBtn() {
            return this.state.btn;
        },
        _getBlock() {
            return this.state.block;
        },
        _getText() {
            return this.state.text;
        },
        _getCroppingText() {
            return this.state.croppingText;
        },
        _setBtn(props) {
            this.state.btn = props;
        },
        _setBlock(props) {
            this.state.block = props;
        },
        _setText(props) {
            this.state.text = props;
        },
        _setCroppingText(props) {
            this.state.croppingText = props;
        },
    }

    function initialState() {
        let block = document.querySelector('.cropping-text-js');
        if (block) {
            store._setBlock(block);
            let text = block.querySelector('.spoiler-text'),
                btn = block.querySelector('.btn'),
                span = document.createElement('span');
            store._setBtn(btn);
            store._setText(text);
            store._setCroppingText(span);
            lengthText();
            store._getBtn().addEventListener('click', handleClick)
        }
    }

    function lengthText() {
        let text = store._getText().innerText;
        let btn = store._getBtn();
        text.length < 319
            ? btn["hidden"] = true
            : btn["hidden"] = false;
        text.length > 320
            ? textF() : '';
    }

    function textF() {
        let text = store._getText();
        let textContent = text.innerText;
        let span = store._getCroppingText();
        span["className"] = 'sp-text';
        for (let i = 0; i < 320; i++) {
            span["textContent"] += textContent[i];
        }
        span["textContent"] += '...'
        store._getBlock().prepend(span)
        text.remove();
    }

    function handleClick() {
        let btn = store._getBtn();
        let text = store._getText();
        let block = store._getBlock();
        let crp_text = store._getCroppingText();
        if (btn.dataset.isOpen === 'false') {
            btn.dataset.isOpen = 'true';
            btn.classList.add('up')
            btn["textContent"] = "свернуть описание";
            block.prepend(text);
            crp_text.remove();
        } else {
            btn.dataset.isOpen = 'false';
            btn["textContent"] = "развернуть описание";
            block.prepend(crp_text);
            btn.classList.remove('up')
            text.remove();
        }
    }

    initialState();
}

croppingText();

function customSelect() {
    let selects = document.querySelectorAll('.select');
    if (selects) {
        selects.forEach(select => {
            let value = select.querySelector('.select__value'),
                options = select.querySelectorAll('.select__option');

            if ((value) && (options.length)) {
                value.addEventListener('click', (event) => {
                    handleSelect(event)
                });
                options.forEach(option => option.addEventListener('click', handleOption))
            }

            function handleSelect(event) {
                event.preventDefault();
                if (!event.target.closest('.select__content')) {
                    select.classList.toggle('open');
                }
            }

            function handleOption() {
                select.classList.remove('open');
                this.classList.add('active');
                options.forEach((item) => {
                    if (item !== this) {
                        item.classList.remove('active');
                    }
                })
            }
        })
    }
}

customSelect()

function step() {
    let elems = document.querySelectorAll('.section-cart__table-tr');

    if (elems) {
        elems.forEach(elem => {
            let myReq;

            let btnRight = document.createElement('div'),
                btnLeft = document.createElement('div');

            btnRight.className = 'scroll scroll--right';
            btnLeft.className = 'scroll scroll--left hide';

            elem.append(btnRight);
            elem.append(btnLeft);

            btnRight.style.top = `${elem.offsetTop + (elem.getBoundingClientRect().height / 2)}px`;
            btnLeft.style.top = `${elem.offsetTop + (elem.getBoundingClientRect().height / 2)}px`;

            function animRight() {
                let from = elem.scrollLeft,
                    to = elem.scrollWidth - elem.offsetWidth;
                if (from < to - 1) {
                    btnRight.classList.add('hide');
                    from += to / 30;
                    elem.scrollLeft = from;
                    myReq = requestAnimationFrame(animRight);
                } else {
                    btnLeft.classList.remove('hide');
                    cancelAnimationFrame(myReq);
                }
            }

            function animLeft() {
                let from = elem.scrollLeft,
                    to = elem.scrollWidth - elem.offsetWidth;
                if (from > 0) {
                    btnLeft.classList.add('hide');
                    from -= to / 30;
                    elem.scrollLeft = from;
                    myReq = requestAnimationFrame(animLeft)
                } else {
                    btnRight.classList.remove('hide');
                    cancelAnimationFrame(myReq);
                }
            }

            function handleScroll() {
                if (this.scrollLeft > 0) {
                    btnRight.classList.add('hide');
                }
                if ((elem.scrollLeft + 1) < (elem.scrollWidth - elem.offsetWidth)) {
                    btnLeft.classList.add('hide');
                }
                if ((elem.scrollLeft + 1) >= (elem.scrollWidth - elem.offsetWidth)) {
                    btnLeft.classList.remove('hide');
                }
                if (this.scrollLeft === 0) {
                    btnRight.classList.remove('hide');
                    btnLeft.classList.add('hide');
                }
            }

            btnRight.addEventListener('click', animRight);
            btnLeft.addEventListener('click', animLeft);

            elem.addEventListener('scroll', handleScroll)
        })
    }
}

step()

var swiper = new Swiper(".main-product-card_tabs", {
    direction: "vertical",
    spaceBetween: 25,
    slidesPerView: 6,
    mousewheel: true,
    speed: 700,
    navigation: {
        nextEl: ".main-product-card_arrow-next",
        prevEl: ".main-product-card_arrow-prev",
    },
});
var swiper2 = new Swiper(".main-product-card_slider", {
    slidesPerView: 1,
    speed: 700,
    spaceBetween: 0,
    pagination: {
        el: ".main-product-card_dotnav",
        clickable: true,
    },
    thumbs: {
        swiper: swiper,
    },
});


Fancybox.bind('[data-fancybox="product_gallery"]', {
    animated: false,
    showClass: false,
    hideClass: false,

    click: false,

    dragToClose: false,

    Image: {
        zoom: false,
    },

    Toolbar: {
        display: [{id: "counter", position: "center"}, "close"],
    },
});

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

const startDescription = () => {

    let windowWidth = 0, widthMd = 900, container, tabs, content;

    const createDexTopVersion = (_tabs, _content) => {

        const createTabsBar = (item) => {
            return `<li><a href="#">${item.textContent}</a></li>`
        }
        const createContentContainer = (item) => {
            return `${item.innerHTML}`
        }

        let tabsComponent = '', contentComponent = '';
        _tabs.forEach(i => tabsComponent += createTabsBar(i))
        _content.forEach(i => contentComponent += createContentContainer(i))
        return (
            `<ul class="section-product-card__dop-description__subnav" uk-switcher="animation: uk-animation-fade">
                                ${tabsComponent}
                            </ul>
             <div class="section-product-card__dop-description-switcher uk-switcher uk-margin-top">
                                ${contentComponent}
                            </div>`
        )
    };
    const createMobileVersion = (_tabs, _content) => {
        let component = '';
        _tabs.forEach((item, index) => {
            component += `
                                    <li>
                                      <a class="uk-accordion-title" href="#">${item.textContent}</a>
                                      <div class="uk-accordion-content">
                                         ${_content[index].innerHTML}
                                      </div>
                                    </li>`
        })
        return (
            `
                                <ul class="description-accordion uk-accordion" uk-accordion="duration: 500">
                                    ${component}
                                </ul>
                            `
        )
    };
    const createDescription = () => {
        windowWidth = document.documentElement.clientWidth;
        if (tabs.length !== content.length) return ('<div></div>')

        if (windowWidth > widthMd) {
            return createDexTopVersion(tabs, content)
        } else {
            return createMobileVersion(tabs, content);
        }
    }

    const data = document.querySelector('.product-description');
    const idContainer = document.getElementById(`root`);

    if (data && idContainer) {
        container = data.cloneNode(true);
        tabs = container.querySelectorAll('.tab');
        content = container.querySelectorAll('.content');
        idContainer.insertAdjacentHTML('beforeEnd', createDescription());
    }
    data.remove()
}
startDescription()


$(".tel-mask").click(function () {
    $(this).setCursorPosition(3);
}).mask("+7(999) 999-9999");
