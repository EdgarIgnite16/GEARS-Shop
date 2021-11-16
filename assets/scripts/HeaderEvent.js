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
}

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

OpenMenuMobile();
TabHeaderAnimation();