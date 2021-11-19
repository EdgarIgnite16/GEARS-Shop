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
    var isLogin = document.querySelector(".js-isLogin");
   
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

// --------------------------------------------------------------------------- //
// xử lí form register
function checkRegister() {
    document.querySelector("#register").onsubmit = () => {
        var email = document.getElementById("js-RG_email").value;
		var username = document.getElementById("js-RG_account").value;
        var password = document.querySelector('#js-RG_password').value;
        var REpassword = document.querySelector('#js-RG_RePassword').value;
        var RadioOption = document.querySelector("#js-RG_radio");
        if(username.length > 24) {
            alert("Độ dài account không được lớn hơn 24 kí tự !");
            username.focus();
            return false;
        }
        if(password.length > 12) {
            alert("Độ dài password không được lớn hơn 24 kí tự !");
            password.focus();
            return false;
        }

        if (REpassword != password) {
            alert("Mật khẩu và mật khẩu xác nhận phải giống nhau !");
            REpassword.focus();
            return false;
        }

        if (!RadioOption.checked) {
            alert("Bạn phải xác nhận chấp nhận điều khoảng của chúng tôi !");
            return false;
        }
        return false;
    };
}

// --------------------------------------------------------------------------- //
// xử lí form login
function checkLogin() {
    document.querySelector("#login").onsubmit = () => {
        var account = document.querySelector('#js-LG_account').value;
        var password = document.querySelector('#js-LG_password').value;

        if(account.length === 0) {
            alert("vui lòng nhập tên tài khoản !");
            account.focus();
            return false;
        }

        if(password.length === 0) {
            alert("vui lòng nhập mật khẩu !");
            password.focus();
            return false;
        }
        return false;
    };
}

AnimationHeader();
OpenCloseForm();
checkRegister();
checkLogin();