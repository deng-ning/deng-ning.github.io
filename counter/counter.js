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

function updateCounter(){
    
}