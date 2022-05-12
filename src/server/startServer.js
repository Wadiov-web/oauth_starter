const express = require('express');
const app = express();
const path = require('path');
const public = path.join(__dirname, '../../public');
const fetch = require('node-fetch');



const clientID = '1030313958177-92ms3fe9dprap65rt22p7gpaalhens1k.apps.googleusercontent.com';
const clientSecret = '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';
const creationDate = 'December 30, 2021 at 3:25:37 PM GMT+1';
const redirectURI = 'http://localhost:4005/auth/google/callback';
const state = 'foobar';
const scope = 'https://www.googleapis.com/auth/userinfo.profile';


const URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURI}&client_id=${clientID}&access_type=offline&response_type=code&prompt=consent&scope=${scope}`;


app.use(express.static(path.join(public)));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())




app.get('/', (req, res) => {
    res.sendFile(path.join(public, 'index.html'));
});


app.get('/auth/google',  (req, res) => {
// How to hide client id and scope 

	res.send(`
		<h1>login page</h1><br/>
		<a href=${URL}>Login with GOOGLE</a>`);
});


app.get('/auth/google/callback', async (req,res) => {

	const data = await fetch(`https://www.googleapis.com/oauth2/v4/token?code=${req.query.code}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&redirect_uri=${redirectURI}`, {
		method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	});

	const response = await data.json();
	console.log(response);
	res.send('<h1>Success</h1>');
});










app.get('/app/privacy-policy', (req, res) => {
	res.send('Welcome to Cool Brand app privacy policy');
});                                        

app.get('/app/terms-of-service', (req, res) => {
	res.send('Welcome to Cool Brand app terms of service');
});                                        








port = process.env.PORT || 4005;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
