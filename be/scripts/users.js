const express = require('express');
const {validateType} = require("./utils/validations.js");
const {ApiError} = require("./utils/aexpress.js");
const sessions = require("./sessions.js");
const {parseId} = require("./utils/utils.js");
const SQLBuilder = require("./utils/SQLBuilder.js");
const {validateId, validateAjvScheme} = require("./utils/validations");
const {UserRole} = require("./schemas");

const app = express();
const db = new SQLBuilder();

async function checkUserExistence(id) {
	const user = await sessions.getUserInternal(id);

	if (!user) {
		throw new ApiError(404, 'User not found');
	}

	return user
}

app.post_json('/users/:id([0-9]+)/role', async req => {
	validateAjvScheme(UserRole, req.body);
	const user = await validateId(req.params.id, 'users');

	await db.update('users')
		.set('role', req.body.role)
		.whereId(user.id)
		.run();

	return await db.select('users')
		.fields('first_name, last_name, role, id')
		.whereId(user.id)
		.oneOrNone();
})

app.post_json('/users/:id([0-9]+)/activate', async req => {
	const id = parseId(req.params.id);
	const {active} = req.body;

	validateType(active, 'boolean');
	const user = await checkUserExistence(id)

	if (user.active === active) {
		throw new ApiError(400, 'Cannot change user activity to same state')
	}

	await db.update('users')
		.set('active', active)
		.where('id = ?', id)
		.run();

	if (!active) {
		await db.delete('sessions')
			.where('"user" = ?', id)
			.run();
	}

	return await db.select('users')
		.fields('first_name, last_name, role, id')
		.whereId(user.id)
		.oneOrNone();
});

app.get_json('/users/list', async req =>
	await db.select('users')
		.fields('id, first_name, last_name, active, role')
		.getList()
);

module.exports = {app}