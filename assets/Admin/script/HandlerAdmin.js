const userArray = [];
const ProductArray = [];
const OrderArray = [];

//----------------------show user----------------------------------
function showUserList(){
	if(localStorage.getItem('user') === null) return false;
	var userArray = JSON.parse(localStorage.getItem('user'));
	var tr = `<tr>
				<th>ID</th>
				<th>Username</th>
				<th>Gmail</th>
				<th>Register Day</th>
				<th>Permission</th>
				<th>Delete</th>
			</tr>`;
	for(var i=0; i<userArray.length;i++){
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
function deleteuser(usernamedelete){
	var userArray = JSON.parse(localStorage.getItem('user'));
	for(var i=0;i<userArray.length;i++){
		if(userArray[i].username == usernamedelete){
			if(userArray[i].userType === 'admin') {
				alert('Bạn không thể xoá tài khoản này !\nVì đây là tài khoản Quản Trị !');
				break;
			}
			if(confirm('Bạn có muốn xóa tài khoản này?')){
				userArray.splice(i, 1);
				window.location.reload(); // reset lại web sau khi nhập xong
			}
		}
	}
	localStorage.setItem('user',JSON.stringify(userArray));
}

// ---------------------------------------------------------------------------- //
// xử lí công việc đóng form Add Product
function OpenCloseForm() {
    var btnAdd = document.querySelector('.js-HandlerAP');
    var AP_wrap = document.querySelector('.AddProduct_Wrap');
    var closeBtn = document.querySelector('.js-close-btn');
    var closeBtn2 = document.querySelector('.js-close-btn2');
   
    btnAdd.addEventListener('click', () => {
        AP_wrap.classList.add('isOpenAP'); 
    });

    btnAdd.addEventListener('click', () => {
        AP_wrap.classList.add('isOpenAP'); 
    });

    closeBtn.addEventListener('click', () => {
        AP_wrap.classList.remove('isOpenAP');
    });

	closeBtn2.addEventListener('click', () => {
		document.querySelector(".ChangeProduct_Wrap").classList.remove('isOpenAP')
	})
}

//----------------------show products----------------------------------
function showProductList(){
	if(localStorage.getItem('product') === null) return false;
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

	for(var i=0; i<ProductArray.length;i++){
		tr += `
			<tr>
				<td>${ProductArray[i].id}</td>
				<td>${ProductArray[i].name}</td>
				<td>${ProductArray[i].type}</td>
				<td>${ProductArray[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
				<td><img src="..${ProductArray[i].img}" class="container-img"></td>
				<td><button id="js-fix" class="fix" onClick="changeProduct(\'${ProductArray[i].name}\')"><i class="fas fa-wrench"></i></button></td>
				<td><button class="delete" onClick="deleteProduct(\'${ProductArray[i].name}\')"><i class="fas fa-times-circle"></i></button></td>
			</tr>
		`;
	}
	document.querySelector('#productlist').innerHTML=tr;
}

function deleteProduct(ProductName){
	var ProductArray = JSON.parse(localStorage.getItem('product'));
	for(var i=0;i<ProductArray.length;i++){
		if(ProductArray[i].name == ProductName){
			if(confirm('Bạn có muốn xóa sản phẩm này ?')){
				ProductArray.splice(i, 1);
				window.location.reload(); // reset lại web sau khi nhập xong
			}
		}
	}
	localStorage.setItem('product' ,JSON.stringify(ProductArray));
}

function Add_Product() {
    var add_btn = document.querySelector("#js-btn-product");
    add_btn.addEventListener('click', () => {
        var itemName = document.getElementById("js-item-name");
		var itemPrice = document.getElementById("js-item-price");
		var productArray = JSON.parse(localStorage.getItem('product'));
        var OptionSelect = document.querySelector("#AddOption");
        
        if(itemName.value.length === 0) {
			alert("vui lòng nhập tên sản phẩm !");
			itemName.focus();
			return false;
		}

		if(itemPrice.value.length === 0) {
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
            id: maxID+1,
            type: valueType,
            name: itemName.value,
            img: '/img/UpdatingProduct.png',
            price: Number(itemPrice.value), // đổi chuỗi thành số
        }

        productArray.push(item);
		localStorage.setItem('product',JSON.stringify(productArray));
        alert("Thêm sản phẩm thành công !");

        // đóng form lẫn reset value trong form input
		document.querySelector(".AddProduct_Wrap").classList.remove('isOpenAP');
        itemName.value = "";
        itemPrice.value = "";
		showProductList();
    })
}

function changeProduct(ProductName){
	var ProductArray = JSON.parse(localStorage.getItem('product'));
	for(var i=0;i<ProductArray.length;i++){
		if(ProductArray[i].name == ProductName){
			document.querySelector(".ChangeProduct_Wrap").classList.add("isOpenAP"); 		

			document.querySelector("#js-btn-productC").addEventListener('click', () => {
				var productArray = JSON.parse(localStorage.getItem('product'));
				var itemName = document.getElementById("js-item-nameC");
				var itemPrice = document.getElementById("js-item-priceC");
				var OptionSelect = document.querySelector("#AddOptionC");
				
				if(itemName.value.length === 0) {
					alert("vui lòng nhập tên sản phẩm !");
					itemName.focus();
					return false;
				}
		
				if(itemPrice.value.length === 0) {
					alert("vui lòng nhập giá tiền !");
					itemPrice.focus();
					return false;
				}
		
				// tìm thể loại của sản phẩm
				var OptionSelect = document.querySelector("#AddOption");
				var valueType = OptionSelect.options[OptionSelect.selectedIndex].text;
		
				for(var i=0;i<ProductArray.length;i++){
					if(ProductArray[i].name == ProductName){
						productArray[i].name = itemName.value;
						productArray[i].price = Number(itemPrice.value);
						productArray[i].type = valueType;
						productArray[i].img = '/img/UpdatingProduct.png';
					}
				}

				localStorage.setItem('product',JSON.stringify(productArray));
				alert("Sửa sản phẩm thành công !");
				window.location.reload(); // reset lại web sau khi nhập xong
			});
		}
	}
}



function showOrder() {
	var orderArray = JSON.parse(localStorage.getItem('cart'));
	//lọc ra tên username từ orderArray
	var listUserOrder = [];
	
	for(var i=0;i<orderArray.length;i++){
		var temp = {
			username: orderArray[i].username,
			status: orderArray[i].status,
		}
		listUserOrder.push(temp);
	}

	// lọc ra những phần tử trùng nhau
	listUserOrder = Array.from(new Set(listUserOrder.map(a => a.username))).map(id => {
   		return listUserOrder.find(a => a.username === id)
	});
	// console.log(listUserOrder);

	var tr = `
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Status</th>
		<th>Confirm</th>
	</tr>`;

	for(var i=0;i<listUserOrder.length;i++){
		var value = "";
		var color = "";

		if(listUserOrder[i].status == 'false') {
			value = "Chưa xác nhận";
			color = "red";
		}else {
			value = "Đã xác nhận";
			color = "green";
		}
		
		tr += `
		<tr>
			<td>${i+1}</td>
			<td>${listUserOrder[i].username}</td>
			<td id="statusOrder">
				<span style="color: ${color}">${value}</span>
			</td>
			<td> 
				<button class="apply">
				<i class="fas fa-check-circle"></i>
				</button>
			</td>
		</tr>
		`;
	}

	// in lên màn hình
	document.querySelector('#confirm-order').innerHTML = tr;
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

	// orther
	showOrder();
}