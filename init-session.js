function ss_set(key, value) {
    sessionStorage.setItem(key, value);
}

function ss_reset() {
    const resetColor = 'Branco';

    ['base', 'gola', 'forro', 'botoes'].forEach(function(parte) {
        ss_set(`cor_${parte}`, resetColor);
    });
    
    const selection = document.querySelector('.submenu li[selected=true] img');
    selection.click();

    // Redefinir os dataset dos acabamentos
    const finishes = document.querySelectorAll('.controls > div');
    finishes.forEach(function (finish) {
        const colorvalue = document.querySelector(`.colors > div[title=${resetColor}]`).style.backgroundColor;
        finish.setAttribute('data-colorname', resetColor);
        finish.setAttribute('data-colorvalue', colorvalue);
    });

    // Clicar no seletor de acabamento: Base
    finishes[0].click();
}

document.querySelector('.reset > p').addEventListener('click', ss_reset);

(function(cor_base, cor_gola, cor_forro, cor_botoes) {
    // Descomentar linha abaixo apenas para teste
    // sessionStorage.clear();

    const camisa = { 
        cor_base: sessionStorage.getItem('cor_base') ?? cor_base, 
        cor_gola: sessionStorage.getItem('cor_gola') ?? cor_gola, 
        cor_forro: sessionStorage.getItem('cor_forro') ?? cor_forro, 
        cor_botoes: sessionStorage.getItem('cor_botoes') ?? cor_botoes, 
        artes: sessionStorage.getItem('artes') ?? '',
    };

    // Trocar seleção da cor para a base
    const colors = document.querySelectorAll(`.colors > div`);
    const color_base = document.querySelector(`.colors > div[title=${camisa['cor_base']}]`);
    setSelectedAttribute(colors, color_base);

    // Troca dados de texto para a base
    document.getElementById('color-name').innerText = camisa.cor_base;

    // Seletores de acabamentos
    const finishes = document.querySelectorAll('.controls > div');

    Object.keys(camisa).forEach(function(item, index) {
        const key = item;
        const value = camisa[item];
        ss_set(key, value);

        // Iniciando as cores da camisa
        const parte = item.split('_');
        if ('cor' === parte[0]) {
            // Trocar datasets do acabamento
            const finish = finishes[index];
            const colorvalue = document.querySelector(`.colors > div[title=${value}]`).style.backgroundColor;
            finish.setAttribute('data-colorname', value);
            finish.setAttribute('data-colorvalue', colorvalue);

            // Muda de cor
            document.querySelector(`.mask-${parte[1]}`).style.filter = `url(#${value})`;
        }
    }); 

})(
    'Branco',   // Cor da base
    'Branco',   // Cor da gola
    'Branco',   // Cor do forro
    'Branco'    // Cor dos botões
);
