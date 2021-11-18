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
    var btnLR = document.querySelector('.jsHandlerLR');
    var LR_wrap = document.querySelector('.LR-wrap');
    var LR_main = document.querySelector('.LR-main');
    var closeBtn = document.querySelector('.js-close-btn');

    // thực thi khi ấn vào button gỡ modal
    btnLR.addEventListener('click', () => {
        LR_wrap.classList.add('isOpenLR'); // gỡ bỏ class open của modal
    });

    // thực thi khi ấn vào button gỡ modal
    closeBtn.addEventListener('click', () => {
        LR_wrap.classList.remove('isOpenLR'); // gỡ bỏ class open của modal
    });

    // sử lí việc user bấm ra ngoài modal => đóng modal form
    // LR_wrap.addEventListener('click', () => {
    //     LR_wrap.classList.remove('isOpenLR'); // gỡ bỏ class open của modal
    // })
}

// --------------------------------------------------------------------------- //
// xử lí form register
function PushValueForm() {
    document.querySelector("#register").onsubmit = () => {
        var password = document.querySelector('#js-RG_password');
        var REpassword = document.querySelector('#js-RG_RePassword');
        var RadioOption = document.querySelector("#js-RG_radio");

        if (REpassword.value != password.value) {
            alert("Mật khẩu và mật khẩu xác nhận phải giống nhau !");
            REpassword.focus();
            return false;
        }

        if (!RadioOption.checked) {
            alert("Bạn phải xác nhận chấp nhận điều khoảng của chúng tôi !");
            return false;
        }
        return true;
    };
}

AnimationHeader();
OpenCloseForm();
PushValueForm();