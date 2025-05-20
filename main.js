document.addEventListener('DOMContentLoaded', () => {

    class DinamicElement {
        constructor(container) {
            this.container = container;
            this.movableDiv = null;
            this.isDragging = false;
            this.isResizing = false;
            this.offsetX = null; 
            this.offsetY = null; 
            this.initialWidth = null; 
            this.initialHeight = null; 
            this.startX = null; 
            this.startY = null;
            this.resizeHandleSize = 10;
        }
        init() {
            this.movableDiv = document.createElement('div');
            this.movableDiv.classList.add('movable-div');
            this.container.appendChild(this.movableDiv);
            this.addEventListeners();
        }
        addEventListeners() {
            const div = this.movableDiv;
            const container = this.container;

            div.addEventListener('click', function(event) {
                // Impede que o evento de clique se propague para o document imediatamente
                event.stopPropagation();

                // Remove o atributo de todas as divs do container
                container.querySelectorAll('div').forEach(elem => elem.removeAttribute('selected'));

                // Adiciona o atributo selected à div clicada
                this.setAttribute('selected', true);

                // Adiciona um listener de clique ao documento para remover o atributo
                document.addEventListener('click', function removeAtributo() {
                    // Remove o atributo da div (usando 'this' do contexto do listener da div)
                    div.removeAttribute('selected');

                    // Remove este listener do documento após ser executado uma vez
                    document.removeEventListener('click', removeAtributo);
                });
            });

            div.addEventListener('mousedown', (e) => {
                if (e.target === div) {
                    this.isDragging = true;
                    this.offsetX = e.clientX - div.getBoundingClientRect().left;
                    this.offsetY = e.clientY - div.getBoundingClientRect().top;
                    div.style.cursor = 'grabbing';
                } else if (e.target.classList.contains('resize-handle')) {
                    this.isResizing = true;
                    this.startX = e.clientX;
                    this.startY = e.clientY;
                    this.initialWidth = div.offsetWidth;
                    this.initialHeight = div.offsetHeight;
                }
            });

            document.addEventListener('mousemove', (e) => {
                if (this.isDragging && this.movableDiv) {
                    const newLeft = e.clientX - this.offsetX;
                    const newTop = e.clientY - this.offsetY;

                    this.movableDiv.style.left = newLeft + 'px';
                    this.movableDiv.style.top = newTop + 'px';

                    // Verifica se o elemento está completamente fora do container
                    const containerRect = this.container.getBoundingClientRect();
                    const divRect = this.movableDiv.getBoundingClientRect();

                    if (
                        divRect.right < containerRect.left ||
                        divRect.left > containerRect.right ||
                        divRect.bottom < containerRect.top ||
                        divRect.top > containerRect.bottom
                    ) {
                        this.container.removeChild(this.movableDiv);
                        this.movableDiv = null;
                        this.isDragging = false;
                    }
                } else if (this.isResizing && this.movableDiv) {
                    const deltaX = e.clientX - this.startX;
                    const deltaY = e.clientY - this.startY;
                    this.movableDiv.style.width = this.initialWidth + deltaX + 'px';
                    this.movableDiv.style.height = this.initialHeight + deltaY + 'px';
                }
            });

            document.addEventListener('mouseup', () => {
                this.isDragging = false;
                this.isResizing = false;
                if (this.movableDiv) {
                    this.movableDiv.style.cursor = 'grab';
                }
            });

            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remover';
            removeButton.style.position = 'absolute';
            removeButton.style.top = '-20px';
            removeButton.style.left = '0';
            removeButton.addEventListener('click', () => {
                this.container.removeChild(div);
                this.movableDiv = null;
            });
            div.appendChild(removeButton);

            const resizeHandle = document.createElement('div');
            resizeHandle.classList.add('resize-handle');
            resizeHandle.style.position = 'absolute';
            resizeHandle.style.bottom = '0';
            resizeHandle.style.right = '0';
            resizeHandle.style.width = this.resizeHandleSize + 'px';
            resizeHandle.style.height = this.resizeHandleSize + 'px';
            resizeHandle.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
            resizeHandle.style.cursor = 'nwse-resize';
            div.appendChild(resizeHandle);
        }
    }


    const container = document.querySelector('.container');

    function readImage() {
        const div = new DinamicElement(container);
        div.init();

        if (this.files && this.files[0]) {
            var file = new FileReader();
            file.onload = function(e) {
                div.movableDiv.style.backgroundImage = 'url(' + e.target.result + ')';
                div.movableDiv.style.backgroundSize = 'cover';
            };       
            file.readAsDataURL(this.files[0]);
        }
    }

    document.getElementById("img-input").addEventListener("change", readImage, false);
});
