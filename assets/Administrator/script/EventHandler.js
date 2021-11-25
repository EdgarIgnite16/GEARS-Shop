// ---------------------------------------------------------------------------- //
// xử lí công việc đóng form Add Product
function OpenCloseForm() {
    var btnLR = document.querySelector('.js-HandlerAP');
    var AP_wrap = document.querySelector('.AddProduct_Wrap');
    var closeBtn = document.querySelector('.js-close-btn');
   
    btnLR.addEventListener('click', () => {
        AP_wrap.classList.add('isOpenAP'); 
    });

    closeBtn.addEventListener('click', () => {
        AP_wrap.classList.remove('isOpenAP');
    });
}
OpenCloseForm();