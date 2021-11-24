// create Constructor
function typeConstructor(id, name) {
    this.id = id;
    this.name = name;
}

var types = [
    new typeConstructor("anime", "Anime keycap"),
    new typeConstructor("artisan", "Artisan keycap"),
    new typeConstructor("pudding", "Pudding keycap"),
    new typeConstructor("other", "Keycap khác"),
    new typeConstructor("all", "Xem tất cả...."),
];

function categoryActive() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    var temp = $$(".category-list--item-link");

    temp.forEach(items => {
        items.onclick = function() {
            $(".category-list--item-link.catagory-Active").classList.remove("catagory-Active")
            this.classList.add('catagory-Active');
        }
    })
}

function CreateSubMenu() {
    var tempArray = "";
    for(var i=0;i<types.length;i++) {
        if(i != types.length - 1) {
            tempArray += `
            <li class="category-list--item js-category-item">
                <a id=${types[i].id} class="category-list--item-link" href="#">${types[i].name}</a>
            </li>
            `;
        }else {
            tempArray += `
            <li class="category-list--item js-category-item">
                <a id=${types[i].id} class="category-list--item-link catagory-Active" href="#">${types[i].name}</a>
            </li>
            `;
        }
    }
    document.querySelector(".category-list").innerHTML = tempArray;
}

CreateSubMenu();
categoryActive();