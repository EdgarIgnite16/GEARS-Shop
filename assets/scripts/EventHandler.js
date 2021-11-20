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

AnimationHeader();
OpenCloseForm();
