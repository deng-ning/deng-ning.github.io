const colors = ["green", "red", "blue", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', function(){
    const getANumber = Math.floor(Math.random() * colors.length);
    color.textContent = colors[getANumber];
    document.body.style.backgroundColor = colors[getANumber];
});