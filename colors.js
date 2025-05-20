document.addEventListener('DOMContentLoaded', () => {

    const finishes = document.querySelectorAll('.controls > div');
    const colors = document.querySelectorAll('.colors > div');

    finishes.forEach(function (finish) {
        finish.addEventListener('click', function(event) {
            // Trocar seleção do acabamento
            setSelectedAttribute(finishes, finish);

            // Troca dados de texto
            document.getElementById('finish-name').innerText = finish.dataset.finishname;
            document.getElementById('color-name').innerText = finish.dataset.colorname;

            // Trocar seleção da cor
            const color = Array.from(colors).filter(color => finish.dataset.colorvalue === color.style.backgroundColor);
            setSelectedAttribute(colors, color[0]);
        });
    });

    colors.forEach(function (color) {
        color.addEventListener('click', function(event) {
            // Trocar seleção do acabamento
            setSelectedAttribute(colors, color);

            const colorname = color.title;
            const colorvalue = color.style.backgroundColor;

            // Troca dados de texto
            document.getElementById('color-name').innerText = colorname;

            // Trocar datasets do acabamento
            const finish = document.querySelector('.controls > div[selected]');
            finish.setAttribute('data-colorname', colorname);
            finish.setAttribute('data-colorvalue', colorvalue);
        });
    });

});
