var tempArray = [];
var productList = [];
productList = JSON.parse(localStorage.getItem('product'));

function addCart(nameProduct) {
    // kiểm tra người dùng có đăng nhập hay chưa
    var check = document.querySelector(".js-HandlerLR").classList.contains("js-isLogin");
    if (!check) {
        alert("Hãy đăng nhập để có thể mua sắm\nNếu bạn chưa có tài khoản thì hãy nhanh tay tạo cho mình một tài khoản đi nào.");
    } else {
        // nếu đã đăng nhập rồi thì
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].name == nameProduct) {
                // đẩy danh sách sản phẩm của người dùng vào một Obj riêng
                tempArray.push(productList[i]);

                var temp = '';
                for (var j = 0; j < tempArray.length; j++) {
                    temp += `
                    <li class="container__cart-Item">
                        <img img src="./assets/${tempArray[j].img}" class="container__cart-img">
                        <div class="container__cart-Item-Info">
                            <div class="container__cart-Item-head">
                                <h5 class="container__cart-Item-name">${tempArray[j].name}</h5>
                                <span class="container__cart-Item-price">${tempArray[j].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                            </div>
                            <div class="container__cart-Item-body">
                                <div class="container__cart-Item-desciption">Phân Loại: ${tempArray[j].type}</div>
                                <span class="container__cart-Item-remove" onclick="deleteCart(\'${tempArray[j].name}\')">Xóa</span>
                            </div>
                        </div>
                    </li>`;
                }

                document.querySelector(".cart").innerHTML = `
                            <div class="container__cart-title">Giỏ hàng của tôi</div>
                            <ul class="container__cart-listItem">${temp}</ul>
                            <div class="btn-cart">
                                <div class="btn-Product">Thanh toán</div>
                            </div>`;
                pushCarttoLocalStorage();
            }
        }
    }
}

function deleteCart(nameProduct) {
    for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].name == nameProduct) {
            if (confirm('Bạn có muốn xóa sản phẩm này ?')) {
                tempArray.splice(i, 1);
            }
            break;
        }
    }

    // in lại tempArray
    var temp = '';
    for (var j = 0; j < tempArray.length; j++) {
        temp += `
        <li class="container__cart-Item">
            <img img src="./assets/${tempArray[j].img}" class="container__cart-img">
            <div class="container__cart-Item-Info">
                <div class="container__cart-Item-head">
                    <h5 class="container__cart-Item-name">${tempArray[j].name}</h5>
                    <span class="container__cart-Item-price">${tempArray[j].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                </div>
                <div class="container__cart-Item-body">
                    <div class="container__cart-Item-desciption">Phân Loại: ${tempArray[j].type}</div>
                    <span class="container__cart-Item-remove" onclick="deleteCart(\'${tempArray[j].name}\')">Xóa</span>
                </div>
            </div>
        </li>`;
    }

    document.querySelector(".cart").innerHTML = `
                <div class="container__cart-title">Giỏ hàng của tôi</div>
                <ul class="container__cart-listItem">${temp}</ul>
                <div class="btn-cart">
                    <div class="btn-Product">Thanh toán</div>
                </div>`;

    pushCarttoLocalStorage();
}

function pushCarttoLocalStorage() {
    var btnCart = document.querySelector(".btn-Product");
    btnCart.addEventListener('click', item => {
        console.log(tempArray)
    })
}
