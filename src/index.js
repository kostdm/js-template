class Test {
    constructor(name = 'Vasya') {
        this.name = name;
    }
}

let txt = new Test();
console.log(txt.name);

for (let value of ['1','2','3','4','5']) {
    console.log(value);
}

const doc = document.querySelector('body');
doc.style.backgroundColor = "red";