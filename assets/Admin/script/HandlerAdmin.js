const userArray = [];
const ProductArray = [];
const OrderArray = [];

//----------------------show user----------------------------------
function showUserList() {
	if (localStorage.getItem('user') === null) return false;
	var userArray = JSON.parse(localStorage.getItem('user'));
	var tr = `<tr>
				<th>ID</th>
				<th>Username</th>
				<th>Gmail</th>
				<th>Register Day</th>
				<th>Permission</th>
				<th>Delete</th>
			</tr>`;
	for (var i = 0; i < userArray.length; i++) {
		tr += `
			<tr>
				<td>${i}</td>
				<td>${userArray[i].username}</td>
				<td>${userArray[i].gmail}</td>
				<td>${userArray[i].RegisterDay}</td>
				<td>${userArray[i].userType}</td>
				<td><button class="delete" onClick="deleteuser(\'${userArray[i].username}\')"><i class="fas fa-times-circle"></i></button></td>
			</tr>
		`;
	}
	document.querySelector('#userlist').innerHTML = tr;
}

// su dung: push them phan tu vao cuoi mang, pop: xoa phan tu cuoi mang, 
// unshit: them phan tu vao dau mang, shit: xoa phtu nam dau mang-----
//----------------------delete user-------------------------------
function deleteuser(usernamedelete) {
	var userArray = JSON.parse(localStorage.getItem('user'));
	for (var i = 0; i < userArray.length; i++) {
		if (userArray[i].username == usernamedelete) {
			if (userArray[i].userType === 'admin') {
				alert('Bạn không thể xoá tài khoản này !\nVì đây là tài khoản Quản Trị !');
				break;
			}
			if (confirm('Bạn có muốn xóa tài khoản này?')) {
				userArray.splice(i, 1);
				window.location.reload(); // reset lại web sau khi nhập xong
			}
		}
	}
	localStorage.setItem('user', JSON.stringify(userArray));
}

// ---------------------------------------------------------------------------- //
// xử lí công việc đóng form Add Product
function OpenCloseForm() {
	var btnAdd = document.querySelector('.js-addProduct');
	var btnAddType = document.querySelector('.js-addTypeProduct');
	var AP_wrap = document.querySelector('.AddProduct_Wrap');
	var ATP_wrap = document.querySelector('.AddTypeProduct_Wrap');
	var closeBtn = document.querySelector('.js-close-btn');
	var closeBtn2 = document.querySelector('.js-close-btn2');
	var closeBtn3 = document.querySelector('.js-close-btn3');
	var closeBtn4 = document.querySelector('.js-close-btn4');

	// event mở form
	btnAdd.addEventListener('click', () => {
		AP_wrap.classList.add('isOpenAP');
		RenderOptionType();
	});

	btnAddType.addEventListener('click', () => {
		ATP_wrap.classList.add('isOpenAP');
	})


	// event đóng form
	closeBtn.addEventListener('click', () => {
		AP_wrap.classList.remove('isOpenAP');
	});

	closeBtn2.addEventListener('click', () => {
		document.querySelector(".ChangeProduct_Wrap").classList.remove('isOpenAP')
	})

	closeBtn3.addEventListener('click', () => {
		document.querySelector(".ConfirmListCart_Wrap").classList.remove('isOpenAP')
	})

	closeBtn4.addEventListener('click', () => {
		document.querySelector(".AddTypeProduct_Wrap").classList.remove('isOpenAP')
	})
}

//----------------------show products----------------------------------
function showProductList() {
	if (localStorage.getItem('product') === null) return false;
	var ProductArray = JSON.parse(localStorage.getItem('product'));
	var tr = `<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Type</th>
				<th>Price</th>
				<th>Image</th>
				<th>Change</th>
				<th>Delete</th>
			</tr>`;

	for (var i = 0; i < ProductArray.length; i++) {
		tr += `
			<tr>
				<td>${ProductArray[i].id}</td>
				<td>${ProductArray[i].name}</td>
				<td>${ProductArray[i].type}</td>
				<td>${ProductArray[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
				<td><img src="..${ProductArray[i].img}" class="container-img"></td>
				<td><button id="js-fix" class="fix" onClick="changeProduct(\'${ProductArray[i].name}\'); RenderOptionTypeC();"><i class="fas fa-wrench"></i></button></td>
				<td><button class="delete" onClick="deleteProduct(\'${ProductArray[i].name}\')"><i class="fas fa-times-circle"></i></button></td>
			</tr>
		`;
	}
	document.querySelector('#productlist').innerHTML = tr;
}

function deleteProduct(ProductName) {
	var ProductArray = JSON.parse(localStorage.getItem('product'));
	for (var i = 0; i < ProductArray.length; i++) {
		if (ProductArray[i].name == ProductName) {
			if (confirm('Bạn có muốn xóa sản phẩm này ?')) {
				ProductArray.splice(i, 1);
				window.location.reload(); // reset lại web sau khi nhập xong
			}
		}
	}
	localStorage.setItem('product', JSON.stringify(ProductArray));
}

// hàm in danh sách thể loại lên Form
function RenderOptionType() {
	// in ra danh sách loại sản phẩm
	var typesArray = JSON.parse(localStorage.getItem('types'))
	var tempArr = '';
	for(var i = 0; i<typesArray.length;i++) {
		if(typesArray[i].id != 'All') {
			tempArr += `<option value="${typesArray[i].id}">${typesArray[i].id}</option>`;
		}
	}
	document.querySelector("#AddOption").innerHTML = tempArr;
}

function RenderOptionTypeC() {
	// in ra danh sách loại sản phẩm
	var typesArray = JSON.parse(localStorage.getItem('types'))
	var tempArr = '';
	for(var i = 0; i<typesArray.length;i++) {
		if(typesArray[i].id != 'All') {
			tempArr += `<option value="${typesArray[i].id}">${typesArray[i].id}</option>`;
		}
	}
	document.querySelector("#AddOptionC").innerHTML = tempArr;
}

function Add_Product() {
	var add_btn = document.querySelector("#js-btn-product");
	add_btn.addEventListener('click', () => {
		var itemName = document.getElementById("js-item-name");
		var itemPrice = document.getElementById("js-item-price");
		var productArray = JSON.parse(localStorage.getItem('product'));
		var OptionSelect = document.querySelector("#AddOption");

		if (itemName.value.length === 0) {
			alert("vui lòng nhập tên sản phẩm !");
			itemName.focus();
			return false;
		}

		if (itemPrice.value.length === 0) {
			alert("vui lòng nhập giá tiền !");
			itemPrice.focus();
			return false;
		}
		
		// tìm thể loại của sản phẩm
		var OptionSelect = document.querySelector("#AddOption");
		var valueType = OptionSelect.options[OptionSelect.selectedIndex].text;
		// tìm id lớn nhất của sản phẩm
		var maxID = Math.max(...productArray.map(item => item.id));

		var item = {
			id: maxID + 1,
			type: valueType,
			name: itemName.value,
			img: '/img/UpdatingProduct.png',
			price: Number(itemPrice.value), // đổi chuỗi thành số
		}

		productArray.push(item);
		localStorage.setItem('product', JSON.stringify(productArray));
		alert("Thêm sản phẩm thành công !");

		// đóng form lẫn reset value trong form input
		document.querySelector(".AddProduct_Wrap").classList.remove('isOpenAP');
		itemName.value = "";
		itemPrice.value = "";
		showProductList();
	})
}


function Add_TypeProduct() {
	var add_btn = document.querySelector("#js-btn-product--typpe");
	add_btn.addEventListener('click', () => {
		var itemID = document.getElementById("js-item-Type--id");
		var itemName = document.getElementById("js-item-Type--name");
		var typeArray = JSON.parse(localStorage.getItem('types'));

		if (itemID.value.length === 0) {
			alert("vui lòng nhập id dòng sản phẩn !");
			itemID.focus();
			return false;
		}

		if (itemName.value.length === 0) {
			alert("vui lòng nhập tên dòng sản phẩm !");
			itemName.focus();
			return false;
		}

		var item = {
			id: itemID.value,
			name: itemName.value,
		}
		typeArray.unshift(item);
		localStorage.setItem('types', JSON.stringify(typeArray));
		alert("Thêm dòng sản phẩm thành công !");

		// đóng form lẫn reset value trong form input
		document.querySelector(".AddTypeProduct_Wrap").classList.remove('isOpenAP');
		itemID.value = "";
		itemName.value = "";
	})
}

function changeProduct(ProductName) {
	var ProductArray = JSON.parse(localStorage.getItem('product'));
	for (var i = 0; i < ProductArray.length; i++) {
		if (ProductArray[i].name == ProductName) {
			document.querySelector(".ChangeProduct_Wrap").classList.add("isOpenAP");
			
			document.querySelector("#js-btn-productC").addEventListener('click', () => {
				var productArray = JSON.parse(localStorage.getItem('product'));
				var itemName = document.getElementById("js-item-nameC");
				var itemPrice = document.getElementById("js-item-priceC");
				var OptionSelect = document.querySelector("#AddOptionC");

				if (itemName.value.length === 0) {
					alert("vui lòng nhập tên sản phẩm !");
					itemName.focus();
					return false;
				}

				if (itemPrice.value.length === 0) {
					alert("vui lòng nhập giá tiền !");
					itemPrice.focus();
					return false;
				}

				// tìm thể loại của sản phẩm
				var OptionSelect = document.querySelector("#AddOptionC");
				var valueType = OptionSelect.options[OptionSelect.selectedIndex].text;

				for (var i = 0; i < ProductArray.length; i++) {
					if (ProductArray[i].name == ProductName) {
						productArray[i].name = itemName.value;
						productArray[i].price = Number(itemPrice.value);
						productArray[i].type = valueType;
						productArray[i].img = '/img/UpdatingProduct.png';
					}
				}

				localStorage.setItem('product', JSON.stringify(productArray));
				alert("Sửa sản phẩm thành công !");
				window.location.reload(); // reset lại web sau khi nhập xong
			});
		}
	}
}

function showOrder() {
	// lấy dữ liệu từ localStorage
	// hiện ra danh sách user mua hàng
	var orderArray = JSON.parse(localStorage.getItem('cartList'));
	var tr = `
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Status</th>
		<th>Active</th>
	</tr>`;

	for (var i = 0; i < orderArray.length; i++) {
		var value = "";
		var color = "";
		var form = "";

		if (orderArray[i].status == 'confirmed') {
			value = "Đã xác nhận";
			color = "green";
		}

		if (orderArray[i].status == 'pending') {
			value = "Đang xử lí";
			color = "orange";
			form = `					
			<button class="apply" onClick="showListCartUser(\'${i}\')">
				<i class="fas fa-clipboard-list"></i>
			</button>`;
		} else  {
			form = ``;
		}

		if (orderArray[i].status == 'unconfirmed') {
			value = "Đã huỷ";
			color = "red";
		}

		tr += `
			<tr>
				<td>${i}</td>
				<td>${orderArray[i].username}</td>
				<td id="statusOrder">
					<span style="color: ${color}">${value}</span>
				</td>
				<td>${form}</td>
			</tr>
		`;
	}

	// in lên màn hình
	document.querySelector('#confirm-order').innerHTML = tr;
}

function showListCartUser(id) {
	document.querySelector(".ConfirmListCart_Wrap").classList.add("isOpenAP");
	var orderArray = JSON.parse(localStorage.getItem('cartList'));

	var tr = `<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Type</th>
				<th>Price</th>
				<th>Image</th>
			</tr>`;


	// lấy ra danh sách sản phẩm mà user đã mua
	var ListCart = orderArray[id].products;
	for (var i = 0; i < ListCart.length; i++) {
		tr += `
			<tr>
				<td>${i+1}</td>
				<td>${ListCart[i].name}</td>
				<td>${ListCart[i].type}</td>
				<td>${ListCart[i].price}</td>
				<td>
					<img src="..${ListCart[i].img}" alt="" class="container-img">
				</td>
			</tr>
		`;
	}
	document.querySelector('#product-list').innerHTML = tr;

	if (orderArray[id].status == 'confirmed') {
		value = "Đã xác nhận";
		color = "green";
	}

	if (orderArray[id].status == 'pending') {
		value = "Đang xử lí";
		color = "orange";
	}

	if (orderArray[id].status == 'unconfirmed') {
		value = "Đã huỷ";
		color = "red";
	}

	document.querySelector('#product-list--price').innerHTML = `
		<p style="padding: 12px 0;">Mã đơn hàng: <strong id="product-list--id">${id}</strong></p>
		<p style="padding: 12px 0;">Tên người mua: <strong>${orderArray[id].username}</strong></p>
		<p style="padding: 12px 0;">Tổng tiền: <strong>${orderArray[id].totalMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</strong></p>
		<p style="padding: 12px 0;">Tình trạng đơn hàng: <span style="color: ${color}">${value}</span></p>
	`;
	return id;
}

function unConfirmOrder() {
	if (confirm('Xác nhận huỷ đơn hàng !')) {
		// lấy ra id của đơn hàng được chọn
		var id = document.getElementById("product-list--id").innerText;

		// thay đổi status trong loacalStorage -> đơn hàng xem như đã bị huỷ
		var orderArray = JSON.parse(localStorage.getItem('cartList'));
		orderArray[id].status = 'unconfirmed';
		localStorage.setItem('cartList', JSON.stringify(orderArray));
		window.location.reload();
	}
}

function ConfirmOrder() {
	if (confirm('Xác nhận chấp nhận đơn hàng !')) {
		// lấy ra id của đơn hàng được chọn
		var id = document.getElementById("product-list--id").innerText;

		// thay đổi status trong loacalStorage -> đơn hàng xem như đã bị huỷ
		var orderArray = JSON.parse(localStorage.getItem('cartList'));
		orderArray[id].status = 'confirmed';
		localStorage.setItem('cartList', JSON.stringify(orderArray));
		window.location.reload();
	}
}

window.onload = () => {
	// user
	showUserList();
	deleteuser();

	// product
	showProductList();
	deleteProduct();

	OpenCloseForm();
	Add_Product();
	Add_TypeProduct();

	// Show sản phẩm mà khách hàng đã đặt
	showOrder();
}