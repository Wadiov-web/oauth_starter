console.log('It is working!!!!!');




const login = document.querySelector('#loginBtn');

login.addEventListener('click', async () => {

	console.log('clicked!!!!');      

	const response = await fetch('http://localhost:4005/auth/google');
	const data = await response.json();
	console.log(data);
});
