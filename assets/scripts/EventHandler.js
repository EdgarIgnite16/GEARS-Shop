var userArray = [];
function createAdmin() {
	if (localStorage.getItem('user') == null) {
		var admin = {
			username: 'admin',
			password: '987',
			gmail: 'admin1704@gmail.com',
			RegisterDay: `1/1/1999`,
			userType: 'admin',
		};
		userArray.push(admin);
		localStorage.setItem('user', JSON.stringify(userArray));
	}
}

function register() {
	var btnRegister = document.querySelector('#js-btn-register');
	btnRegister.addEventListener('click', () => {
		var today = new Date();
		var userArray = JSON.parse(localStorage.getItem('user'));
		var email = document.getElementById("js-RG_email").value;
		var username = document.getElementById("js-RG_account").value;
		var password = document.getElementById("js-RG_password").value;
		var RegisterDay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

		var checkAcc = userArray.some((item) => {
			return item.username == username;
		});

		if(checkAcc) {
			alert("Tên tài khoản đã tồn tại !");
		} else {
			if(username.length == 0) {
				alert("Tên người dùng ko được để trống !");
				username.focus();
				return false;
			}
			if(password.length == 0) {
				alert("Mật khẩu ko được để trống !");
				password.focus();
				return false;
			}
	
			var user = { 
				username: username, 
				password: password, 
				gmail: email,
				RegisterDay: RegisterDay,
				userType: 'user'
			};
	
			userArray.push(user);	
			localStorage.setItem('user',JSON.stringify(userArray));
	
			// đóng form đăng kí 
			document.querySelector(".LR-wrap").classList.remove('isOpenLR');
		}
	});
}

function Handler_LogOut() {
    var isLogin = document.querySelector(".js-isLogin");
	var logout = document.querySelector(".header-navbar-logout");
	var header = document.querySelector(".header");
	var container = document.querySelector(".container");

	isLogin.addEventListener("click", () => {
		logout.classList.add('is-Logout');
		event.stopPropagation();
	})
	
	logout.onclick = () => {
		window.location = "index.html"; // sau khi ấn nút thoát thì load lại trang index
	}

	// click ra ngoài form logout thì ẩn logout
	header.addEventListener("click", () =>{
		logout.classList.remove('is-Logout');
	})

	container.addEventListener("click", () =>{
		logout.classList.remove('is-Logout'); //
	})

}

function login() {
	var btnLogin = document.querySelector('#js-btn-login');
	btnLogin.addEventListener('click', () => {
		var username = document.getElementById("js-LG_account").value;
		var password = document.getElementById("js-LG_password").value;
		var userArray = JSON.parse(localStorage.getItem('user'));
		console.log(typeof username)

		var checkAcc = userArray.some((item) => {
			return item.username == username;
		});

		if(!checkAcc) {
			alert("Tên tài khoản không tồn tại !");
		} else{ 
			for(i=0;i<userArray.length;i++) {
				if(userArray[i].username == username && userArray[i].password == password && userArray[i].userType === 'admin') {
					document.querySelector(".js-HandlerLR").innerHTML = `
							<a href="./assets/Administrator/admin.html" style="color: black; text-decoration: none;">
								<i class="header-user--icon fas fa-user-cog"></i>
							</a> ${userArray[i].username}
							<div class="header-navbar-logout is-absoluted">Đăng xuất</div>
					`;
					document.querySelector(".js-HandlerLR").classList.add('js-isLogin'); // thêm class is_Login
					document.getElementById("LR-form").remove();
					Handler_LogOut();
					break;
				} else {
					if(userArray[i].username == username && userArray[i].password != password) {
						alert('Sai mật khẩu !');
						break;
					}
					if(userArray[i].username == username && userArray[i].password == password) {
						document.querySelector(".js-HandlerLR").innerHTML = `
								<i class="header-user--icon far fa-user"></i>
								${userArray[i].username}
								<div class="header-navbar-logout is-absoluted">Đăng xuất</div>
						`;
						document.querySelector(".js-HandlerLR").classList.add('js-isLogin'); // thêm class is_Login
						document.getElementById("LR-form").remove();
						Handler_LogOut();
						break;
					}
				}
			}
		}
	});
}


window.onload = () => {
	createAdmin();
	login();
	register();
}