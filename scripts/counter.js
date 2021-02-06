var number = 0;
const value = document.querySelector('#value');
const btns = document.querySelectorAll('.btn');

btns.forEach(function (btn) {
    btn.addEventListener('click', function(e){
        let id = e.currentTarget.id;
        if (id === 'increase') {
            number++;
        } else if (id === 'decrease') {
            number--;
        } else if (id === 'reset') {
            number = 0;
        }
        let color = 'black';
        if (number < 0) {
            color = 'red';
        } else if (number > 0) {
            color = 'green';
        }
        value.style.color = color;
        value.textContent = number;
    });
});

// backgroud color
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', function(){changeColor()});

function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}

function changeColor() {
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += hex[getRandomNumber()];
    }
    // console.log(hexColor);
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
}