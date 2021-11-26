// create Constructor
function typeConstructor(id, name) {
    this.id = id;
    this.name = name;
}

var types = [
    new typeConstructor("Anime", "Anime keycap"),
    new typeConstructor("Artisan", "Artisan keycap"),
    new typeConstructor("Pudding", "Pudding keycap"),
    new typeConstructor("Other", "Keycap khác"),
    new typeConstructor("All", "Xem tất cả...."),
];

// -------------------------------------------------- // 
// js animation
function categoryActive() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    var temp = $$(".category-list--item-link");

    temp.forEach(items => {
        items.onclick = function () {
            $(".category-list--item-link.catagory-Active").classList.remove("catagory-Active")
            this.classList.add('catagory-Active');
        }
    })
}

function paginationActive() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    var temp = $$(".pagination-item--link");

    temp.forEach(item => {
        item.onclick = function () {
            $('.pagination-item--link.paginationActive').classList.remove('paginationActive');

            this.classList.add('paginationActive');
        }
    })
}
// -------------------------------------------------- // 
function CreateSubMenu() {
    var tempArray = "";
    for (var i = 0; i < types.length; i++) {
        if (i != types.length - 1) {
            tempArray += `
            <li class="category-list--item js-category-item">
                <a id=${types[i].id} class="category-list--item-link" href="#">${types[i].name}</a>
            </li>
            `;
        } else {
            tempArray += `
            <li class="category-list--item js-category-item">
                <a id=${types[i].id} class="category-list--item-link catagory-Active" href="#">${types[i].name}</a>
            </li>
            `;
        }
    }
    document.querySelector(".category-list").innerHTML = tempArray;
}

function CreateSubMenu_Mobile() {
    var tempArray = "";
    for (var i = 0; i < types.length; i++) {
        if (i != types.length - 1) {
            tempArray += `
            <li class="mobile-category__item js-category-item">
                <a id=${types[i].id} href="#" class="mobile-category__link">${types[i].name}</a>
            </li>
            `;
        } else {
            tempArray += `
            <li class="mobile-category__item js-category-item">
                <a id=${types[i].id} href="#" class="mobile-category__link">${types[i].name}</a>
            </li>
            `;
        }
    }
    document.querySelector(".mobile-category-list").innerHTML = tempArray;
}

// -------------------------------------------------- // 
var productList = [];
productList = JSON.parse(localStorage.getItem('product'));
var ShowProduct = document.querySelector('#js-product-list');
const NumOfItem = 8; // số lượng sản phẩm trên 1 trang

function InnerProductions(name) {
    var tempArray = '';
    var emptyArray = '';

    // lọc ra các phần tử thoả mãn điều khiện -> trả về một obj chứa các phần tử thoả mãn
    var emptyObject = productList.filter((item) => {
        return item.type == name;
    })

    // --------------------------------------- // 
    // in ra số trang
    for (var i = 0; i < emptyObject.length / NumOfItem; i++) {
        if (i == 0) {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link paginationActive">${i+1}</a>
            </li>
            `
        } else {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link">${i+1}</a>
            </li>
            `
        }
    }
    document.querySelector('#page-num').innerHTML = tempArray;

    // --------------------------------------- // 
    const numItemPage = emptyObject.length > NumOfItem ? NumOfItem : emptyObject.length; // kiểm tra số lượng phần tử mảng đã lọc
    // nếu bé hơn 8 thì lấy luôn chiều dài của obj còn không thì mặc định max là 8 sản phẩm 1 trang

    // --------------------------------------- // 
    // in ra trang đầu tiên khi ấn vào danh mục
    for (var i = 0; i < numItemPage; i++) {
        emptyArray += `
        <div class="col l-3 m-3 c-6">
            <div class="product-item">
                <h2>id: ${emptyObject[i].id}</h2>
                <h3>name: ${emptyObject[i].name}</h3>
                <h4>price: ${emptyObject[i].price}</h4>
            </div>
        </div>
        `
    }
    ShowProduct.innerHTML = emptyArray;

    // --------------------------------------- // 
    // in ra sản phẩm khi ấn vào số trang bất kì
    document.querySelectorAll(".pagination-item--link").forEach(items => {
        items.addEventListener('click', (item) => {
            var emptyArray = '';
            var values = item.target.id;
            var begin = parseInt(values) * numItemPage;
            var end = (parseInt(values) + 1) * numItemPage;
            for (var i = begin; i < end; i++) {
                if (i == parseInt(emptyObject.length)) break;
                emptyArray += `
                    <div class="col l-3 m-3 c-6">
                        <div class="product-item">
                            <h2>id: ${emptyObject[i].id}</h2>
                            <h3>name: ${emptyObject[i].name}</h3>
                            <h4>price: ${emptyObject[i].price}</h4>
                        </div>
                    </div>
                `
            }
            ShowProduct.innerHTML = emptyArray;
        })
    })
}

function InnerAllProductions() {
    var tempArray = '';
    var emptyArray = '';

    // --------------------------------------- // 
    // in ra số trang
    for (var i = 0; i <= productList.length / NumOfItem; i++) {
        if (i == 0) {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link paginationActive">${i+1}</a>
            </li>
            `
        } else {
            tempArray += `
            <li class="pagination-item">
                <a id="${i}" href="#" class="pagination-item--link">${i+1}</a>
            </li>
            `
        }
    }
    document.querySelector('#page-num').innerHTML = tempArray;

    // --------------------------------------- // 
    const numItemPage = productList.length > NumOfItem ? NumOfItem : productList.length; // kiểm tra số lượng phần tử mảng đã lọc
    // nếu bé hơn 8 thì lấy luôn chiều dài của obj còn không thì mặc định max là 8 sản phẩm 1 trang

    // --------------------------------------- // 
    // in ra trang đầu tiên khi ấn vào danh mục
    for (var i = 0; i < numItemPage; i++) {
        emptyArray += `
        <div class="col l-3 m-3 c-6">
            <div class="product-item">
                <h2>id: ${productList[i].id}</h2>
                <h3>name: ${productList[i].name}</h3>
                <h4>price: ${productList[i].price}</h4>
                <button type="button" class="js-product" style="padding: 20px; font-size: 1.4rem" onClick="addCart(\'${productList[i].name}\')">Mua Hàng</button>
            </div>
        </div>
        `
    }
    ShowProduct.innerHTML = emptyArray;

    // --------------------------------------- // 
    // in ra tất cả sản phẩm
    document.querySelectorAll(".pagination-item--link").forEach(items => {
        items.addEventListener('click', (item) => {
            var emptyArray = '';
            var values = item.target.id;
            var begin = parseInt(values) * numItemPage;
            var end = (parseInt(values) + 1) * numItemPage;
            for (var i = begin; i < end; i++) {
                if (i == parseInt(productList.length)) break;
                emptyArray += `
                    <div class="col l-3 m-3 c-6">
                        <div class="product-item">
                            <h2>id: ${productList[i].id}</h2>
                            <h3>name: ${productList[i].name}</h3>
                            <h4>price: ${productList[i].price}</h4>
                            <button type="button" class="js-product" style="padding: 20px; font-size: 1.4rem" onClick="addCart(\'${productList[i].name}\')">Mua Hàng</button>
                        </div>
                    </div>
                `
            }
            ShowProduct.innerHTML = emptyArray;
        })
    })
}

function ShowProductItem() {
    var ListOPT = document.querySelectorAll(".js-category-item");
    ListOPT.forEach(items => {
        items.addEventListener('click', (item) => {
            var innerID = item.target.id;
            // console.log(innerID);
            switch (innerID) {
                case 'Anime':
                    InnerProductions(innerID);
                    paginationActive();
                    break;

                case 'Artisan':
                    InnerProductions(innerID);
                    paginationActive();
                    break;

                case 'Pudding':
                    InnerProductions(innerID);
                    paginationActive();
                    break;

                case 'Other':
                    InnerProductions(innerID);
                    paginationActive();
                    break;

                case 'All':
                    InnerAllProductions();
                    paginationActive();
                    break;
            }
        })
    })
}


CreateSubMenu();
CreateSubMenu_Mobile();
ShowProductItem();
InnerAllProductions();
paginationActive();
categoryActive();