// ---------------------------------------------------------------------------- //
// xử lí công việc đóng form Add Product
function OpenCloseForm() {
    var btnLR = document.querySelector('.js-HandlerAP');
    var AP_wrap = document.querySelector('.AddProduct_Wrap');
    var closeBtn = document.querySelector('.js-close-btn');
    var HeaderMobileBtn = document.querySelector('.js-mobile-bars');
   
    btnLR.addEventListener('click', () => {
        AP_wrap.classList.add('isOpenAP'); 
    });

    closeBtn.addEventListener('click', () => {
        AP_wrap.classList.remove('isOpenAP');
    });
    
    HeaderMobileBtn.addEventListener('click', () => {
        AP_wrap.classList.remove('isOpenAP'); 
    })


    // sử lí việc user bấm ra ngoài form => đóng form
    // LR_wrap.addEventListener('click', () => {
    //     LR_wrap.classList.remove('isOpenLR'); // gỡ bỏ class open của form
    // })
}

OpenCloseForm();