var userArray = [];
function createAdmin(){
	if(localStorage.getItem('user') == null){		
		var admin = {	
			username: 'admin', 
			password: '987', 
			gmail: 'admin1704@gmail.com',
			RegisterDay: `1/1/1999`,
			userType: 'admin',
		};
		userArray.push(admin);
		localStorage.setItem('user',JSON.stringify(userArray));
	}
}

//----------------------show user----------------------------------
function showUserList(){
	if(localStorage.getItem('user') === null) return false;
	var userArray = JSON.parse(localStorage.getItem('user'));
	var tr = `<tr>
				<th>STT</th>
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

function register(){
	var btnRegister = document.querySelector('#js-btn-register');
	btnRegister.addEventListener('click', () => {
		var today = new Date();
		var userArray = JSON.parse(localStorage.getItem('user'));
		var email = document.getElementById("js-RG_email").value;
		var username = document.getElementById("js-RG_account").value;
		var password = document.getElementById("js-RG_password").value;
		var RegisterDay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
	
		var user = { 
			username: username, 
			password: password, 
			gmail: email,
			RegisterDay: RegisterDay,
			userType: 'user'
		};

		userArray.push(user);	
		localStorage.setItem('user',JSON.stringify(userArray));
	})
	showUserList();
}

function login(){
	var btnLogin = document.querySelector('#js-btn-login');
	btnLogin.addEventListener('click', () => {
		var username = document.getElementById("js-LG_account").value;
		var password = document.getElementById("js-LG_password").value;
		var userArray = JSON.parse(localStorage.getItem('user'));
		for(i=0;i<userArray.length;i++) {
			if(userArray[i].username==username && userArray[i].password==password && userArray[i].userType === 'admin') {
				alert('Chào mừng quản trị viên đã đăng nhập');
			} else {
				if(userArray[i].username==username && userArray[i].password==password) {
					alert('Chào mừng người dùng đã đăng nhập');
				}
			}
	
		}
	})
}

window.onload = () => {
	createAdmin();
	showUserList();
	login();
	register();
}