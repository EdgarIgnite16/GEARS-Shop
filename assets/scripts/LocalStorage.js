// --------------------------------------------------------------------------- //
// khởi tạo user
function createAccount() {
    var userArray = [];
    if (localStorage.getItem('user') == null) {
        var admin = {
            username: 'admin',
            password: '987',
            gmail: 'admin1704@gmail.com',
            RegisterDay: `1-1-1999`,
            userType: 'admin',
        };
        userArray.push(admin);

        // Tạo thêm 3 tài khoản ảo để test
        for (var i = 1; i <= 3; i++) {
            var temp = {
                username: `user${i}`,
                password: `${124 + i}`,
                gmail: `user${i}@gmail.com`,
                RegisterDay: `${i}-1-1999`,
                userType: 'user',
            };
            userArray.push(temp);
        }
        localStorage.setItem('user', JSON.stringify(userArray)); // đẩy dữ liệu lên Local Storage
    }
}

// --------------------------------------------------------------------------- //
//  khởi tạo dữ liệu sản phẩm
function createProducts() {
    if (localStorage.getItem('product') === null) {
        var productArray = [
            // orther
            { id: 0, type: 'Other', name: 'OSU! keycap', img: '/img/Products/Other/020.jpg', price: 55000 },
            { id: 1, type: 'Other', name: 'Apple logo keycap', img: '/img/Products/Other/021.jpg', price: 55000 },
            { id: 2, type: 'Other', name: 'CS:GO keycap', img: '/img/Products/Other/022.jpg', price: 110000 },
            { id: 3, type: 'Other', name: 'TypeWriter set keycap', img: '/img/Products/Other/023.jpg', price: 270000 },
            // artisan
            { id: 4, type: 'Artisan', name: 'Sun Goddess Shrine keycap', img: '/img/Products/Artisan/001.jpg', price: 823529 },
            { id: 5, type: 'Artisan', name: 'Galaxy Keycap', img: '/img/Products/Artisan/002.jpg', price: 802118 },
            { id: 6, type: 'Artisan', name: 'Koi Fish Keycap', img: '/img/Products/Artisan/003.jpg', price: 543529 },
            { id: 7, type: 'Artisan', name: 'Interstellar Keycap', img: '/img/Products/Artisan/004.jpg', price: 929176 },
            { id: 8, type: 'Artisan', name: 'Cute Cat Keycaps', img: '/img/Products/Artisan/005.jpg', price: 188000 },
            { id: 9, type: 'Artisan', name: 'Mega Charizard Keycap', img: '/img/Products/Artisan/006.jpg', price: 1364471 },
            { id: 10, type: 'Artisan', name: 'Devil Fruit Keycap', img: '/img/Products/Artisan/007.jpg', price: 938824 },
            { id: 11, type: 'Artisan', name: 'Re:Zero Rem Keycap', img: '/img/Products/Artisan/008.jpg', price: 677116 },
            { id: 12, type: 'Artisan', name: 'Totoru Natural Landscape & Waterfall Keycap', img: '/img/Products/Artisan/009.jpg', price: 1247059 },
            { id: 13, type: 'Artisan', name: 'Keycap Doubleshot xuyên led Kim Loại - Spiderman', img: '/img/Products/Artisan/010.jpg', price: 300000 },
            // pudding
            { id: 14, type: 'Pudding', name: 'Keycap PBT Pudding Black', img: '/img/Products/Pudding/011.jpg', price: 350000 },
            { id: 15, type: 'Pudding', name: 'Keycap PBT Pudding White', img: '/img/Products/Pudding/012.jpg', price: 350000 },
            { id: 16, type: 'Pudding', name: 'Keycap PBT Pudding Pink', img: '/img/Products/Pudding/013.jpg', price: 350000 },
            { id: 17, type: 'Pudding', name: 'Keycap PBT Pudding Blue', img: '/img/Products/Pudding/blue.jpg', price: 350000 },
            { id: 18, type: 'Pudding', name: 'Keycap PBT Pudding Purple', img: '/img/Products/Pudding/purple.jpg', price: 350000 },
            { id: 19, type: 'Pudding', name: 'Keycap PBT Pudding Red', img: '/img/Products/Pudding/red.jpg', price: 350000 },
            // anime
            { id: 20, type: 'Anime', name: 'Kimetsu no Yaiba set Keycap', img: '/img/Products/Anime/014.png', price: 745000 },
            { id: 21, type: 'Anime', name: 'Re: Zero set Keycap', img: '/img/Products/Anime/015.png', price: 745000 },
            { id: 22, type: 'Anime', name: 'Pokemon Bulbasaur set keycap', img: '/img/Products/Anime/016.png', price: 790000 },
            { id: 23, type: 'Anime', name: 'Pokemon Charmander set keycap', img: '/img/Products/Anime/017.png', price: 790000 },
            { id: 24, type: 'Anime', name: 'Pokemon Squirtle set keycap', img: '/img/Products/Anime/018.png', price: 790000 },
            { id: 25, type: 'Anime', name: 'Hatsune Miku set keycap', img: '/img/Products/Anime/019.jpeg', price: 690000 },
        ];
        localStorage.setItem('product', JSON.stringify(productArray));
    }
}

// --------------------------------------------------------------------------- //
// khởi tạo cartList rỗng
function createCartListEmpty() {
    if (localStorage.getItem('cartList') === null) {
        var CartEmpty = [];
        localStorage.setItem('cartList', JSON.stringify(CartEmpty));
    }
}

createAccount();
createProducts();
createCartListEmpty();