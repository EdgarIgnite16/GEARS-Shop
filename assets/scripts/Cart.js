var productList = JSON.parse(localStorage.getItem('product'));
var userList = JSON.parse(localStorage.getItem('user'));

var tempArray = [];
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
                var tempCart = {
                    id: productList[i].id,
                    type: productList[i].type,
                    name: productList[i].name,
                    img: productList[i].img,
                    price: productList[i].price,
                    username: nameUser,
                    status: 'pending',
                }
                tempArray.push(tempCart);


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
        if (tempArray.length == 0) {
            alert('Giỏ hàng đang trống !\nVui lòng thêm sản phẩm vào giỏ hàng trước khi ấn nút Thanh toán');
        } else {
            // gửi thông điệp cảm ơn
            document.querySelector('.container__cart-listItem').innerHTML = `
                <div class="container_Mycart-Temp">
                    <p>Cảm ơn vì đã mua sắm :)</p>
                    <p>Bạn có thể mua thêm sản phẩm mà bạn yêu thích</p>
                </div>
            `;

            // gửi Toast Message yêu cầu đặt hàng cho admin
            sendRequire(tempArray);

            // trả về những sản phẩm đã mua
            var totalProduct = tempArray.map(item => {
                return item.name;
            })

            //trả về tổng tiền của sản phẩm
            var totalMoney = tempArray.reduce((total, item) => {
                return total + item.price;
            }, 0)

            // lấy tên người dùng mua sản phẩm
            var nameUser = document.getElementById("js-Username").innerText;

            // lấy ra trạng thái hiện tại của đơn hàng
            var status = tempArray.map(item => {
                return item.status;
            });

            // loại bỏ những giá trị trùng trong mảng
            status = status.find((item, index) => {
                return status.indexOf(item) === index;
            });

            tempArray = [];
            var tempTemp = {
                username: nameUser,
                totalProduct: totalProduct,
                totalMoney: totalMoney,
                status: status,
            }

            // đẩy đơn hàng lên localStorage
            var totalPayment = JSON.parse(localStorage.getItem('cartList'));
            totalPayment.push(tempTemp);
            localStorage.setItem('cartList', JSON.stringify(totalPayment));

            // lấy dữ liệu từ local để show lên màn hình
            var showPayment = JSON.parse(localStorage.getItem('cartList'));
            var temp = '';
            for (var i = 0; i < showPayment.length; i++) {
                if (showPayment[i].username == nameUser) {
                    if(showPayment[i].status == 'confirmed') {
                        value = "Đã xác nhận";
                        color = "green";
                    } 

                    if(showPayment[i].status == 'pending') {
                        value = "Đang xử lí";
                        color = "orange";
                    }

                    if(showPayment[i].status == 'unconfirmed') {
                        value = "Đã huỷ";
                        color = "red";
                    }

                    temp += `
                    <tr>
                        <td style="width: 5%">${i+1}</td>
                        <td style="width: 55%">${showPayment[i].totalProduct.join(', ')}</td>
                        <td style="width: 20%">${showPayment[i].totalMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        <td id="js-cart-status" style="width: 20%; color: ${color}">${value}</td>
                    </tr>
                    `;
                }
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


// mặc định khi vào trang chủ thì hiển thị giỏ hàng thì sẽ hiển thị ra giỏ hàng trống
formPayment();

// ----------------------------------------------------------------------------------------------------------
// Toast Notify Form 
function addCartSuccess() {
    var check = document.querySelector(".js-HandlerLR").classList.contains("js-isLogin");
    if (!check) return false;
    else {
        toast({
            type: 'success',
            title: 'Giỏ hàng',
            message: 'Đã thêm sản phẩm vào giỏ hàng !',
            duration: 1000
        });
    }
}

function sendRequire(arr) {
    if (arr.length == 0) return false;
    else {
        toast({
            type: 'success',
            title: 'Đơn hàng',
            message: 'Đã gửi yêu cầu đơn hàng cho người bán\nVui lòng đợi phản hồi từ người bán !',
            duration: 3000
        });
    }
}