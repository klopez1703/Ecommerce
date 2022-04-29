	const formulario = document.getElementById('formulario');
	const inputs = document.querySelectorAll('#formulario input');	
	
	const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		username: /^[a-zA-Z0-9\_\-]{4,10}$/, // Letras, numeros, guion y guion_bajo
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		genero : /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
	}

	const campos = {
		nombre: false,
		apellido : false,
		username: false,
		password: false,
		correo: false,
		genero: false
	}
	
	const validarFormulario = (e) => {
		switch (e.target.name) {
			case "nombre":
				validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
			case "apellido":
				validarCampo(expresiones.apellido, e.target, 'apellido');
			break;
			case "username":
				validarCampo(expresiones.username, e.target, 'username');
			break;
			case "password":
				validarCampo(expresiones.password, e.target, 'password');
			break;
			case "correo":
				validarCampo(expresiones.correo, e.target, 'correo');
			break;
			case "genero":
				validarCampo(expresiones.genero, e.target, 'genero');
			break;
		}
	}
	
	const validarCampo = (expresion, input, campo) => {
		if(expresion.test(input.value)){
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
			campos[campo] = true;
		}else {
			document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
			document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
			document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
			document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
			document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
			campos[campo] = false;
		}
	}
	
	inputs.forEach((input) => {
		input.addEventListener('keyup', validarFormulario);
		input.addEventListener('blur', validarFormulario);
	});
	
	