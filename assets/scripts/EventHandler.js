// ---------------------------------------------------------------------------- //
// xử lí chuyển động line trên thanh line
function AnimationHeader() {
    var $ = document.querySelector.bind(document);
    var $$ = document.querySelectorAll.bind(document);

    var header_item = $$('.LR-header--item');
    var container_item = $$('.LR-container--item');
    var tabActive = $('.LR-header--item.isActive');
    var line = $('.LR-header .line');

    line.style.width = tabActive.offsetWidth + 'px';
    line.style.left = tabActive.offsetLeft + 'px';

    header_item.forEach((header_item, index) => {
        var pane = container_item[index];

        header_item.onclick = function () {
            // gỡ class đã có trước khi add vào
            $('.LR-header--item.isActive.isHoverBG').classList.remove('isActive', 'isHoverBG');
            $('.LR-container--item.isActive').classList.remove('isActive');

            line.style.width = this.offsetWidth + 'px';
            line.style.left = this.offsetLeft + 'px';

            //add class vào element
            this.classList.add('isActive', 'isHoverBG');
            pane.classList.add('isActive');
        }

        document.querySelector(".isActive").addEventListener('click', (e) => {
            e.preventDefault();
        })
    })


}

// ---------------------------------------------------------------------------- //
// xử lí công việc đóng form Login / Register
function OpenCloseForm() {
    var btnLR = document.querySelector('.js-HandlerLR');
    var LR_wrap = document.querySelector('.LR-wrap');
    var LR_main = document.querySelector('.LR-main');
    var closeBtn = document.querySelector('.js-close-btn');
    var HeaderMobileBtn = document.querySelector('.js-mobile-bars');

    btnLR.addEventListener('click', () => {
        LR_wrap.classList.add('isOpenLR');
    });

    closeBtn.addEventListener('click', () => {
        LR_wrap.classList.remove('isOpenLR');
    });

    HeaderMobileBtn.addEventListener('click', () => {
        LR_wrap.classList.remove('isOpenLR');
    })

    // sử lí việc user bấm ra ngoài form => đóng form
    // LR_wrap.addEventListener('click', () => {
    //     LR_wrap.classList.remove('isOpenLR'); // gỡ bỏ class open của form
    // })
}

// ---------------------------------------------------------------------------- //
// Sử lí chuyển form trên Web
function TabHeaderAnimation() {
    var $ = document.querySelector.bind(document);
    var $$ = document.querySelectorAll.bind(document);

    var HeaderItem = $$('.js-TabHeader');
    var ContainerItem = $$('.js-Container');

    var tabActive = $('.js-TabHeader.headerActive');
    var line = $('.header-navbar--list .line');

    line.style.width = tabActive.offsetWidth + 'px';
    line.style.left = tabActive.offsetLeft + 'px';

    HeaderItem.forEach((HeaderItem, index) => {
        var pane = ContainerItem[index];

        HeaderItem.onclick = function () {
            // gỡ class đã có trước khi add vào
            $('.js-TabHeader.headerActive').classList.remove('headerActive');
            $('.js-Container.headerActive').classList.remove('headerActive');

            line.style.width = this.offsetWidth + 'px';
            line.style.left = this.offsetLeft + 'px';

            //add class vào element
            this.classList.add('headerActive');
            pane.classList.add('headerActive');
        }
    })

    document.querySelector(".headerActive").addEventListener('click', (e) => {
        e.preventDefault();
    })
}

// ---------------------------------------------------------------------------- //
// Sử lí Responsive thanh header trên Mobile
function OpenMenuMobile() {
    const header = document.querySelector('.js-OpenHeaderForMobile');
    const mobileMenu = document.querySelector('.js-mobile-bars');
    const headerHeight = header.clientHeight;

    // đóng mở mobile menu
    mobileMenu.onclick = function () {
        const is_Closed = header.clientHeight === headerHeight;
        is_Closed ? header.style.height = 'auto' : header.style.height = null;
    }

    // tự đỘng đóng khi chọn phần từ trong menu
    const menuItems = document.querySelectorAll('.header-navbar--item');
    for (var i = 0; i < menuItems.length; i++) {
        var item = menuItems[i];
        item.addEventListener('click', () => {
            header.style.height = null;
        })
    }
}

AnimationHeader();
OpenCloseForm();
TabHeaderAnimation();
OpenMenuMobile();

// ---------------------------------------------------------------------------- //
// Toast Notify 
//show toast function
function toast({
    title = "",
    message = "",
    type = "info",
    duration = 1000
}) {
    const main = document.getElementById('toast')
    var FixDelay = duration + 1000;

    if (toast) {
        const toast = document.createElement('div');
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-angry',
            error: 'fas fa-exclamation-triangle',
        };

        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        // auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, FixDelay);

        // remove toast onclick
        toast.onclick = function (events) {
            if (events.target.closest('.toast_close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }

        // show toast
        toast.classList.add('toast', `toast_${type}`);
        toast.style.animation = `slideInleft ease 0.5s , fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
           <div class="toast_icon">
               <i class="${icon}"></i>
           </div>
           <div class="toast_body">
               <h3 class="toast_title">${title}</h3>
               <p class="toast_msg">${message}</p>
           </div>
           <div class="toast_close">
               <i class="fas fa-times"></i>
           </div>
       `;
        main.appendChild(toast);
    }
}