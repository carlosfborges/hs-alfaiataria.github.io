document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const submenu = dropdown.querySelector('.submenu');

        link.addEventListener('click', function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            // Fecha outros submenus abertos
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('open')) {
                    otherDropdown.classList.remove('open');
                    const otherSubmenu = otherDropdown.querySelector('.submenu');
                    if (otherSubmenu) {
                        otherSubmenu.style.display = 'none';
                    }
                }
            });

            // Abre ou fecha o submenu atual
            if (submenu.style.display === 'none' || submenu.style.display === '') {
                submenu.style.display = 'flex';
                dropdown.classList.add('open');
            } else {
                submenu.style.display = 'none';
                dropdown.classList.remove('open');
            }
        });
    });

    // Fecha o submenu ao clicar fora
    document.addEventListener('click', function(event) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                const submenu = dropdown.querySelector('.submenu');
                if (submenu && submenu.style.display === 'flex') {
                    submenu.style.display = 'none';
                    dropdown.classList.remove('open');
                }
            }
        });
    });

    // Troca de modelo ao clicar nas imagens dentro do menu
    function getInnerModel(ref) {
        let innerModel = '';
        switch (ref) {
            case 'mod2h':
                innerModel = `
                    <img src="modelos/social_manga_curta-homem-frente.jpeg" alt="Social Manga Curta 1">
                `;
                break;
            case 'mod2m':
                innerModel = `
                    <img src="modelos/social_manga_curta-mulher-frente.jpeg" alt="Social Manga Curta 2">
                `;
                break;
            case 'mod3h':
                innerModel = `
                    <img src="modelos/polo-homem-frente.jpeg" alt="Polo 1">
                `;
                break;
            case 'mod3m':
                innerModel = `
                    <img src="modelos/polo-mulher-frente.jpeg" alt="Polo 2">
                `;
                break;
            case 'mod1m':
                innerModel = `
                    <img src="modelos/social-mulher-frente.jpeg" alt="Camisa Social 2">
                `;
                break;
            case 'mod1h':
            default:
                innerModel = `
                    <img src="modelos/social-homem-frente.jpeg" alt="Camisa Social 1">
                    <img class="mask mask-base" src="modelos/social-homem-frente-mask-base.png" alt="Mascara base" style="filter: url(#color-00)">
                    <img class="mask mask-forro" src="modelos/social-homem-frente-mask-forro.png" alt="Mascara forros" style="filter: url(#color-00)">
                    <img class="mask mask-gola" src="modelos/social-homem-frente-mask-gola.png" alt="Mascara gola" style="filter: url(#color-00)">
                    <img class="mask mask-botoes" src="modelos/social-homem-frente-mask-botoes.png" alt="Mascara botoes" style="filter: url(#color-00)">
                `;
                break;
        }
        return innerModel;
    }

    const models = document.querySelectorAll('.menu img');
    models.forEach(model => {
        model.addEventListener('click', function(event) {
            // Elemento que vai conter o modelo
            const container = document.getElementById('container-model');
            const modelref = event.target.dataset.model;
            const modeltext = event.target.dataset.text;

            // Troca o conteúdo do modelo
            container.innerHTML = getInnerModel(modelref);

            // Troca o texto da camisa
            document.querySelector('.shirt-title h2').innerText = modeltext;

            // Troca o atributo seleção para o modelo clicado
            setSelectedAttribute(
                document.querySelectorAll('.menu li'), // Elementos
                event.target.parentElement  // Elemento selecionado
            );
        });
    });
});
