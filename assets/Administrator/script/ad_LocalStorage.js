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

window.onload = () => {
    showUserList();
    deleteuser();
}