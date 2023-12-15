const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const env = require('./env');
const {random_bytes} = require("./utils/utils.js");
const SQLBuilder = require("./utils/SQLBuilder.js");

const db = new SQLBuilder();
const app = express();
const client = new OAuth2Client(env.google.clientId, env.google.clientSecret);

app.use(bodyParser.json());

app.get_handle_error('/sessions/oauth/google', async (req, res) => {
	const { code } = req.query;

	const { tokens } = await client.getToken({
		code,
		redirect_uri: `${env.url}api/sessions/oauth/google`,
	});

	const ticket = await client.verifyIdToken({
		idToken: tokens.id_token,
		audience: env.google.clientId,
	});

	const payload = ticket.getPayload();

	let user = await db.select('users')
		.where('email = ?', payload.email)
		.oneOrNone();

	if (!user) {
		user = await db.insert('users', {
			first_name: payload.given_name,
			last_name: payload.family_name,
			email: payload.email,
			role: 'STUDENT'
		}).oneOrNone()
	}

	const sessionId = (await random_bytes(24)).toString('hex');

	await db.insert('sessions', {
		session_id: sessionId,
		user: user.id
	}).run();

	res.cookie('borrowing-session', sessionId, {maxAge: 1000 * 60 * 60 * 24 * 31, httpOnly: true, secure: false, sameSite: 'strict'});
	res.redirect(env.url);
});

module.exports = {app};