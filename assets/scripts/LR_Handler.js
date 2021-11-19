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
	})
}

function login(){
	var btnLogin = document.querySelector('#js-btn-login');
	btnLogin.addEventListener('click', () => {
		var username = document.getElementById("js-LG_account").value;
		var password = document.getElementById("js-LG_password").value;
		var userArray = JSON.parse(localStorage.getItem('user'));
		for(i=0;i<userArray.length;i++) {
			if(userArray[i].username == username && userArray[i].password == password && userArray[i].userType === 'admin') {
				alert('Chào mừng quản trị viên đã đăng nhập');
			} else {
				if(userArray[i].username == username && userArray[i].password == password) {
					document.querySelector(".js-HandlerLR").innerHTML = `
							<i class="header-user--icon far fa-user"></i>
							${userArray[i].username}`;
					document.querySelector(".js-HandlerLR").classList.add('js-isLogin'); // thêm class is_Login
					document.getElementById("LR-form").remove();
					break;
				}
				
				if(userArray[i].username == username && userArray[i].password != password) {
					alert('Sai mật khẩu !');
					break;
				}
			}
		}
	})
}


		// for (i = 0; i < userArray.length; i++) {
		// 	if (userArray[i].username == inputUsername && userArray[i].password == inputPassword && userArray[i].userType === 'admin') {
		// 		alert('Chào mừng quản trị viên đã đăng nhập');
		// 		break;
		// 	}
		// 	if (userArray[i].username == inputUsername && userArray[i].password == inputPassword) {

		// 		break;
		// 	}
		// }

window.onload = () => {
	createAdmin();
	login();
	register();
}