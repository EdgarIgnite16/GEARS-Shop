var userArray = [];
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
				<td><button class="delete" onClick="deleteuser(\'${userArray[i].username}\')">&times;</button></td>
			</tr>
		`;
	}
	document.querySelector('#userlist').innerHTML=tr;
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
			}
		}
	}
	localStorage.setItem('user',JSON.stringify(userArray));
	showUserList(); // cập nhật lại show user
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
				<th>Delete</th>
			</tr>`;

	for(var i=0; i<ProductArray.length;i++){
		tr += `
			<tr>
				<td>${ProductArray[i].id}</td>
				<td>${ProductArray[i].name}</td>
				<td>${ProductArray[i].type}</td>
				<td>${ProductArray[i].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
				<td><img src="${ProductArray[i].img}" class="container-img"></td>
				<td><button class="delete" onClick="deleteProduct(\'${ProductArray[i].name}\')">&times;</button></td>
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
			}
		}
	}
	localStorage.setItem('product' ,JSON.stringify(ProductArray));
	showProductList(); // cập nhật lại show user
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
            img: '../img/UpdatingProduct.png',
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

        return true;
    })
}

window.onload = () => {
	// user
    showUserList();
    deleteuser();

	// product
	showProductList();
	deleteProduct();

	Add_Product();

}