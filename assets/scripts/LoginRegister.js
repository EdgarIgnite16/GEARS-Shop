// --------------------------------------------------------------------------- //
var userArray = [];
function createAccount() {
	if (localStorage.getItem('user') == null) {
		var admin = {
			username: 'admin',
			password: '987',
			gmail: 'admin1704@gmail.com',
			RegisterDay: `1/1/1999`,
			userType: 'admin',
		};
		userArray.push(admin);

		// Tạo thêm 3 tài khoản ảo để test
		for(var i=1;i<=3;i++) {
			var temp = {	
				username: `user${i}`, 
				password: `${124 + i}`, 
				gmail: `user${i}@gmail.com`,
				RegisterDay: `1/1/1999`,
				userType: 'user',
			};
		userArray.push(temp);
		}
		localStorage.setItem('user', JSON.stringify(userArray)); // đẩy dữ liệu lên Local Storage
	}
}


// --------------------------------------------------------------------------- //
// Xử lí form đăng kí
function register() {
	var btnRegister = document.querySelector('#js-btn-register');
	btnRegister.addEventListener('click', () => {
		var today = new Date();
		var userArray = JSON.parse(localStorage.getItem('user'));
		var gmail = document.getElementById("js-RG_gmail");
		var username = document.getElementById("js-RG_account");
		var password = document.getElementById("js-RG_password");
        var REpassword = document.querySelector('#js-RG_RePassword');
        var RadioOption = document.querySelector("#js-RG_radio");
		var RegisterDay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

		var checkAcc = userArray.some((item) => {
			return item.username == username.value;
		});

		var checkGmail = userArray.some((item) => {
			return item.gmail == gmail.value;
		});

		if( checkGmail) {
			alert("Đã có có người sử dụng gmail này để đăng kí !\n Vui lòng sử dụng gmail khác !");
		} else if(checkAcc) {
			alert("Đã có người sử dụng tên đăng nhập này rồi !");
		} else {
			if(gmail.value.length == 0) {
				alert("gmail ko được để trống !");
				gmail.focus();
				return false;
			}

			if(username.value.length == 0) {
				alert("Tên người dùng ko được để trống !");
				username.focus();
				return false;
			}

			if(password.value.length == 0) {
				alert("Mật khẩu ko được để trống !");
				password.focus();
				return false;
			}

			if (REpassword.value != password.value) {
				alert("Mật khẩu và mật khẩu xác nhận phải giống nhau !");
				REpassword.focus();
				return false;
			}

			if (!RadioOption.checked) {
				alert("Bạn phải xác nhận chấp nhận điều khoảng của chúng tôi !");
				return false;
			}
	
			var user = { 
				username: username.value, 
				password: password.value, 
				gmail: gmail.value,
				RegisterDay: RegisterDay,
				userType: 'user'
			};
			userArray.push(user);
			localStorage.setItem('user',JSON.stringify(userArray));
			alert("Đăng kí tài khoản thành công !\n Chúc bạn mua sắm vui vẻ");
			// đóng form đăng kí 
			document.querySelector(".LR-wrap").classList.remove('isOpenLR');

			// Xoá hết value trong form input
			gmail.value = "";
			username.value = "";
			password.value = "";
			REpassword.value = "";
			RadioOption.checked = false;
		}
	});
}

// xử lí sự kiện logout
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

	// click ra ngoài form logout thì ẩn button logout
	header.addEventListener("click", () =>{
		logout.classList.remove('is-Logout');
	})

	container.addEventListener("click", () =>{
		logout.classList.remove('is-Logout'); //
	})

}

// --------------------------------------------------------------------------- //
// xử lí form login
function login() {
	var btnLogin = document.querySelector('#js-btn-login');
	btnLogin.addEventListener('click', () => {
		var username = document.getElementById("js-LG_account");
		var password = document.getElementById("js-LG_password");
		var userArray = JSON.parse(localStorage.getItem('user'));

		if(username.value.length === 0) {
			alert("vui lòng nhập tên tài khoản !");
			account.focus();
			return false;
		}

		if(password.value.length === 0) {
			alert("vui lòng nhập mật khẩu !");
			password.focus();
			return false;
		}

		// kiểm tra tài khoản có tồn tại trong Local Storage hay không
		var checkAcc = userArray.some((item) => {
			return item.username == username.value;
		});

		if(!checkAcc) {
			alert("Tên tài khoản không tồn tại !");
		} else{
			for(i=0;i<userArray.length;i++) {
				// nếu người đăng nhập là Admin
				if(userArray[i].username == username.value && userArray[i].password == password.value && userArray[i].userType === 'admin') {
					document.querySelector(".js-HandlerLR").innerHTML = `
							<a href="./assets/Administrator/index.html" style="color: black; text-decoration: none;" target="_blank">
								<i class="header-user--icon fas fa-user-cog"></i> ${userArray[i].username}
							</a>
							<div class="header-navbar-logout is-absoluted">Đăng xuất</div>
					`;
					document.querySelector(".js-HandlerLR").classList.add('js-isLogin'); // thêm class is_Login
					document.getElementById("LR-form").remove();
					Handler_LogOut();
					break;
				} 
				else { // nếu người đăng nhập là user 
					// kiểm tra mật khẩu đăng nhập
					if(userArray[i].username == username.value && userArray[i].password != password.value) {
						alert('Sai mật khẩu !');
						break;
					}

					if(userArray[i].username == username.value && userArray[i].password == password.value) {
						document.querySelector(".js-HandlerLR").innerHTML = `
								<i class="header-user--icon far fa-user"></i>
								${userArray[i].username}
								<div class="header-navbar-logout is-absoluted">Đăng xuất</div>
						`;
						document.querySelector(".js-HandlerLR").classList.add('js-isLogin'); // thêm class is_Login
						document.getElementById("LR-form").remove(); // xoá form Login/Register sau khi đăng nhập thành công
						Handler_LogOut(); // gọi lại hàm xử lý sự kiện logout
						break;
					}
				}
			}
		}
	});
}

window.onload = () => {
	createAccount();
	login();
	register();
}