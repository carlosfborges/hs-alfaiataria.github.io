// Funções disponíveis para toda a aplicação

function setSelectedAttribute(list, elem) {
    list.forEach(item => item.removeAttribute('selected'));
    elem.setAttribute('selected', 'true');
}

