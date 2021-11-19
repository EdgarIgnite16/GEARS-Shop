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
		var inputEmail = document.getElementById("js-RG_email").value;
		var inputUsername = document.getElementById("js-RG_account").value;
		var inputPassword = document.getElementById("js-RG_password").value;
		var inputRegisterDay = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

        if(inputUsername.length == 0) {
            alert("Tên người dùng ko được để trống !");
            inputUsername.focus();
            return false;
        }
        if(inputPassword.length == 0) {
            alert("Mật khẩu ko được để trống !");
            inputPassword.focus();
            return false;
        }

		var user = { 
			username: inputUsername, 
			password: inputPassword, 
			gmail: inputEmail,
			RegisterDay: inputRegisterDay,
			userType: 'user'
		};
		userArray.push(user);	
		localStorage.setItem('user',JSON.stringify(userArray));

		// đóng form đăng kí 
		var LoginBtn = document.querySelector(".LR-wrap");
		LoginBtn.classList.remove('isOpenLR');
	})
}



function innerLogin(name) {
	// var isLogin = document.querySelector(".js-isLogin");

}

function login() {
	var btnLogin = document.querySelector('#js-btn-login');
	btnLogin.addEventListener('click', () => {
		var inputUsername = document.getElementById("js-RG_account").value;
		var inputPassword = document.getElementById("js-RG_password").value;
		var userArray = JSON.parse(localStorage.getItem('user'));
		for (i = 0; i < userArray.length; i++) {
			if (userArray[i].username == inputUsername && userArray[i].password == inputPassword && userArray[i].userType === 'admin') {
				alert('Chào mừng quản trị viên đã đăng nhập');
			} else {

				// if (userArray[i].username == inputUsername || userArray[i].password != inputPassword) {
				// 	alert("Thông tin đăng nhập không chính xác !\nVui lòng kiểm tra lại");
				// 	break;
				// }

				if (userArray[i].username == inputUsername && userArray[i].password == inputPassword) {
					var LoginSide = document.querySelector(".js-HandlerLR");
					var LoginBtn = document.querySelector(".LR-wrap");

					LoginSide.innerHTML = `
						<i class="header-user--icon far fa-user"></i>
						${userArray[i].inputUsername}
					`
					LoginBtn.classList.remove('isOpenLR');
					LoginSide.classList.add('js-isLogin');
				}
			}
		}
	})
}



window.onload = () => {
	createAdmin();
	login();
	register();
}