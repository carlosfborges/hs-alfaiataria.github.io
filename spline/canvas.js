const container = document.getElementById('container');
const elsIds = ['maleRadio','femaleRadio','long','short','polo'];

container.onclick = function(){
	const id = event.target.id;
	elsIds.includes(id) && handlers[id]();
}

function setSummary(sufix,val){
	document.getElementById(`summary-${sufix}`).textContent = val;
}

function setActiveBtn(id){
	['long','short','polo'].forEach((id2) => {
		const el = document.getElementById(id2);
		id2===id ? el.classList.add('active') :	el.classList.remove('active') 
	});
	return true;
}

const data = {
	gender: 'Feminino',
	setGender: function(gender){
		this.gender = gender;
		setSummary('gender',gender);
		return true;
	},
	model: 'Social manga curta',
	setModel: function(model){
		this.model = model;
		setSummary('model',model);
		return true;
	},
	colors: {
		fabric: '#ffffff',
		collar: '#ffffff',
		button: '#ffffff',
	},
	setColor: function(type,color){
		this.colors[type] = color;
		setSummary(type,color);
		return true;
	},
	coordenates: {
		posY: 50,
		posX: 50,
	},
	setCoordenate: function(type,val){
		this.coordenates[type] = val;
		return true;
	}
}

const handlers = {
	maleRadio: function(){
		data.setGender('Masculino') && console.log(data.gender);
	},
	femaleRadio: function(){
		data.setGender('Feminino') && console.log(data.gender);
	},
	long: function(){
		data.setModel('Social manga longa') && 
			setActiveBtn('long') && console.log(data.model);
	},
	short: function(){
		data.setModel('Social manga curta') && 
			setActiveBtn('short') && console.log(data.model);
	},
	polo: function(){
		data.setModel('Polo') && 
			setActiveBtn('polo') && console.log(data.model);
	},
	fabricColor: function(color){
		data.setColor('fabric',color) && console.log(data.colors);
	},
	collarColor: function(color){
		data.setColor('collar',color) && console.log(data.colors);
	},
	buttonColor: function(color){
		data.setColor('button',color) && console.log(data.colors);
	},
	posY: function(py){
		data.setCoordenate('posY',py) && console.log(data.coordenates);
	},
	posX: function(px){
		data.setCoordenate('posX',px) && console.log(data.coordenates);
	},
}

const inputs = document.getElementsByTagName('input');
Array.from(inputs).filter((input) => {
	return [ 
		'fabricColor', 'collarColor', 'buttonColor',
		'posY', 'posX' 
	].includes(input.id)
}).forEach((input) => {
	input.onchange = function(){
		handlers[input.id](input.value);
	}
});
