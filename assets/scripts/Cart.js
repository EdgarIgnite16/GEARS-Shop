var tempArray = [];
var totalPayment = [];
var productList = JSON.parse(localStorage.getItem('product'));
var userList = JSON.parse(localStorage.getItem('user'));

function addCart(nameProduct) {
    // kiểm tra người dùng có đăng nhập hay chưa
    var check = document.querySelector(".js-HandlerLR").classList.contains("js-isLogin");
    if (!check) {
        alert("Hãy đăng nhập để có thể mua sắm\nNếu bạn chưa có tài khoản thì hãy nhanh tay tạo cho mình một tài khoản đi nào.");
    } else {
        // nếu đã đăng nhập rồi thì
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].name == nameProduct) {
                // lấy username mua sản phẩm
                var nameUser = document.getElementById("js-Username").innerText;
                // đẩy danh sách sản phẩm của người dùng đã mua vào một Obj riêng
                var tempUser = {
                    id: productList[i].id,
                    type: productList[i].type, 
                    name: productList[i].name, 
                    img: productList[i].img, 
                    price: productList[i].price,
                    username: nameUser,
                    status: false,
                }
                tempArray.push(tempUser);


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
                </div>
                <div class="container__cart-title">Đơn Hàng hiện tại</div>
                <ul class="container__Mycart-listItem">
                    <div class="container_Mycart-Temp">
                        Hiện tại bạn chưa đặt đơn hàng nào cả :(
                    </div>
                </ul>
                `;

    pushCarttoLocalStorage();
}

function formPayment() {
    document.querySelector('.cartPayment').innerHTML = `
    <div class="container__cart-title">Đơn Hàng hiện tại</div>
    <ul class="container__Mycart-listItem">
        <div class="container_Mycart-Temp">
            Hiện tại bạn chưa đặt đơn hàng nào cả :(
        </div>
    </ul>`;
}

function pushCarttoLocalStorage() {
    var btnCart = document.querySelector(".btn-Product");
    btnCart.addEventListener('click', () => {
        if(tempArray.length == 0) {
            alert('Giỏ hàng đang trống !\nVui lòng thêm sản phẩm vào giỏ hàng trước khi ấn nút Thanh toán');
        } else {
            localStorage.setItem('cart', JSON.stringify(tempArray)); // đẩy dữ liệu lên Local Storage
            //tempArray = []; // sau khi gửi data lên local Storage thì reset tempArray
            // gửi thông điệp cảm ơn
            document.querySelector('.container__cart-listItem').innerHTML = `
                <div class="container_Mycart-Temp">
                    Cảm ơn vì đã mua sắm :)<br><br>
                    Bạn có thể đặt thêm sản phẩm mà bạn yêu thích
                </div>
            `;
            var totalProduct = tempArray.map(item => {
                return item.name;
            })

            var totalMoney = tempArray.reduce((total, item) => {
                return total + item.price;
            }, 0)

            tempArray = [];
            
            var tempTemp = {
                totalProduct: totalProduct, 
                totalMoney: totalMoney, 
            }

            totalPayment.push(tempTemp);
            
            var temp = '';
            for (var j = 0; j < totalPayment.length; j++) {
                temp += `
                <tr>
                    <td style="width: 5%">${j+1}</td>
                    <td style="width: 55%">${totalPayment[j].totalProduct.join(', ')}</td>
                    <td style="width: 20%">${totalPayment[j].totalMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                    <td id="js-cart-status" style="width: 20%">Đang xử lí</td>
                </tr>
                `;
            }

            document.querySelector('.container__Mycart-listItem').innerHTML = `
                <table id="listProduct">
                <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                </tr>
                ${temp}
                </table>
            `;

        }
    })
}

formPayment();