// create Constructor
function typeConstructor(id, name) {
    this.id = id;
    this.name = name;
}

var types = [
    new typeConstructor("anime", "Anime"),
    new typeConstructor("artisan", "Artisan"),
    new typeConstructor("pudding", "Pudding"),
    new typeConstructor("other", "Other"),
];
