window.onload = function() {	
	// Create an XMLHttpRequest object
	const xhttp = new XMLHttpRequest();
	const html = document.querySelector('html');
	const div = document.querySelector('header > div');	
	const divsColor = document.querySelectorAll('#circle-colors > div');
	const color1 = document.querySelector('#color1');
	const color2 = document.querySelector('#color2');
	const color3 = document.querySelector('#color3');
	const male = document.querySelector('#male image');
	const female = document.querySelector('#female image');

	let logoFile, logoWidth; 	
	let c1, c2, c3;
	let animaScroll, posScroll, stepScroll;
	let animaColor, timeColor;

	logoFile = 'svg-logo-mobile.html';
	logoWidth = '180px';

	c1 = '/humbertosouza/branch2/img/profit/manteiga.png';
	c2 = '/humbertosouza/branch2/img/tricoline/grisaceo.png';
	c3 = '/humbertosouza/branch2/img/fusili/royal.png';

	color1.style.backgroundImage = "url(" + c1 + ")";
	color2.style.backgroundImage = "url(" + c2 + ")";
	color3.style.backgroundImage = "url(" + c3 + ")";

	animaScroll = null;
	posScroll = 0;
	stepScroll = 10;

	animaColor = null;
	timeColor = 0;

	if (screen.width > 600) {
		const simulador = document.querySelector('#simulador iframe');
		const msg = document.querySelector('#message');
		const btn = document.querySelector('button');
		logoFile = 'svg-logo-desktop.html';
		logoWidth = '420px';
		simulador.src = '/humbertosouza/branch2/index.html';
		btn.style.display = 'block';
		msg.style.display = 'none';
	}		

	// Define a callback function
	xhttp.onload = function() {
	  // Here you can use the Data
	  div.style.width = logoWidth;
	  div.innerHTML = this.response;
	}
	
	// Send a request
	xhttp.open("GET", logoFile);
	xhttp.send();

	animaColor = setInterval(function() {
		if (timeColor == 60) clearInterval(animaColor);
		else timeColor++;

		let color;
		for (divColor of divsColor) divColor.setAttribute('class', '');

		if (timeColor <= 20) {
			color1.setAttribute('class', 'color-select');
			color = c1;
		} else if (timeColor <= 40) {
			color2.setAttribute('class', 'color-select');
			color = c2;
		} else if (timeColor < 60) {
			color3.setAttribute('class', 'color-select');
			color = c3;
		} else {			
			color1.setAttribute('class', 'color-select');
			color = c1;
			timeColor = 0;
		}

		male.setAttribute('href', color);
		female.setAttribute('href', color);
	}, 100);

	document.body.onscroll = function() {
		posScroll = Math.floor(this.scrollY);
		if (posScroll >= html.scrollHeight) clearInterval(animaScroll);
	}

	function smoothScroll2(posj) {
		if (posj > posScroll)	posScroll ++;
		else posScroll --;
		document.querySelector('html').scrollTop = posScroll;
		if (posj == posScroll) clearInterval(animaScroll);
	}

	function smoothScroll(posj) {
		if (posj == posScroll) clearInterval(animaScroll);
		else {
			if (posj > posScroll && posj > 1.5 * (posScroll + stepScroll)) posScroll += stepScroll;
			else smoothScroll2(posj);

			if (posj < posScroll && posj < 1.5 * (posScroll - stepScroll)) posScroll -= stepScroll;
			else smoothScroll2(posj);
			
			document.querySelector('html').scrollTop = posScroll;
		}
	}

	document.querySelector('#uniforme button').onclick = function() {
		const ref = document.querySelector(this.getAttribute('target'));		
		let posj = Math.floor(ref.offsetTop);
		clearInterval(animaScroll);		
		animaScroll = setInterval(smoothScroll, 5, posj);
	}
}	