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

    // Adicionando o container que armazenará os filtros SVG color matrix
    /*
    const container = document.createElement('div');
    container.setAttribute('id', 'color-matrix');
    document.querySelector('body').appendChild(container);

    class FilterSVG {
        constructor(name, red, green, blue) {
            this.name = name;
            this.red = parseFloat(red) / 255;
            this.green = parseFloat(green) / 255;
            this.blue = parseFloat(blue) / 255;
        }
        create(container) {
            const svg = document.createElement('svg');
            container.appendChild(svg);

            const filter = document.createElement('filter');
            filter.id = this.name;
            svg.appendChild(filter);

            const colormatrix = document.createElement('feColorMatrix');
            colormatrix.setAttribute('values', `${this.red} 0 0 0 0
                                       0 ${this.green} 0 0 0
                                       0 0 ${this.blue} 0 0
                                       0 0 0 1 0`);
            filter.appendChild(colormatrix);
        }
    }*/

    colors.forEach(function (color) {
        /*
        const valoresRGB = color.style.backgroundColor
            .replace('rgb(', '').replace(')', '').split(',').map(Number);

        const filter = new FilterSVG(
            color.title,
            valoresRGB[0],
            valoresRGB[1],
            valoresRGB[2]
        );
        filter.create(container);
        */

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

            // Trocar o filtro da imagem
            const finishname = document.querySelector('.controls > div[selected]')
                .dataset.finishvalue;
            document.querySelector(`.mask-${finishname}`).style.filter = `url(#${color.title})`;

            // Muda o valor na sessão
            ss_set(`cor_${finishname}`, color.title);

        });
    });
});
