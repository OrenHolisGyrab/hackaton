const express = require('express');
const SQLBuilder = require("./utils/SQLBuilder.js");
const {FallThrough} = require("./utils/aexpress.js");
const {hasAtLeastRole, validateAjvScheme, validateId, validateValidDate} = require("./utils/validations");
const {Unauthorized, Conflict, NotFound, BadRequest} = require("./utils/aexpress");
const {ItemBorrowing, ItemBorrowingUpdate} = require("./schemas");
const {parseId} = require("./utils/utils");

const app = express();
const db = new SQLBuilder();

const lendingListQuery = () => db.select()
	.fields('item_borrowings.*, first_name, last_name, email, i.name AS item_name, i.code AS item_code')
	.from(
		'item_borrowings',
		'INNER JOIN items i ON i.id = item_borrowings.item',
		'INNER JOIN users u ON u.id = item_borrowings."user"',
	);

// Personal
app.get_json('/lending', async req => {
	const query = lendingListQuery().where('"user" = ?', req.session.id);

	if (req.query.mode === 'active') {
		return query.where('returned IS NULL').getList();
	}

	return query.where('returned IS NOT NULL').getList();
});

// administration

app.all_json('/api/*', async req => {
	if (!hasAtLeastRole(req.session, 'WORKER')) {
		throw new Unauthorized('Your role is too low to perform this operation');
	}

	return FallThrough;
})

async function validateItemIsNotBorrowed(id) {
	const borrowed = await db.select('item_borrowings')
		.where('returned IS NULL')
		.where('id = ?', id)
		.oneOrNone();

	if (borrowed) {
		throw new Conflict('Item is already borrowed');
	}
}

app.get_json('/lending/all', async req => await lendingListQuery().getList());
app.get_json('/lending/active', async req => await lendingListQuery().where('returned IS NULL').getList());
app.get_json('/lending/historic', async req => await lendingListQuery().where('returned IS NOT NULL').getList());
app.get_json('/lending/item/:id([0-9]+)/borrowed', async req => {
	const id = parseId(req.params.id);
	return !!(await db.select('item_borrowings').where('item = ?', id).oneOrNone());
});

app.post_json('/lending', async req => {
	const data = req.body;

	validateAjvScheme(ItemBorrowing, req.body);
	data.from = validateValidDate(data.from);
	data.to = validateValidDate(data.to);
	const item = await validateId(data.item, 'items');
	const user = await db.select('users').where('email = ?', data.user).oneOrNone();

	if (user.role !== 'STUDENT') {
		throw new BadRequest('Cannot lend item other user than student');
	}

	if (!data.user) {
		throw new NotFound('User not found');
	}

	await validateItemIsNotBorrowed(item.id);

	return await db.insert('item_borrowings', {
		"user": user.id,
		item: item.id,
		"from": data.from,
		"to": data.to,
		note: data.note,
		confirmed: true,
	}).oneOrNone();
});
app.put_json('/lending/:id([0-9]+)', async req => {
	const borrowing = await validateId(req.params.id, 'item_borrowings')
	validateAjvScheme(ItemBorrowingUpdate, req.body);
	const to = validateValidDate(req.body.to);

	return await db.update('item_borrowings')
		.set({to, note: req.body.note, prolonged: true})
		.whereId(borrowing.id)
		.oneOrNone();
});
app.post_json('/lending/:id([0-9]+)/returned', async req => {
	const borrowing = await validateId(req.params.id, 'item_borrowings')

	return await db.update('item_borrowings')
		.set('returned', new Date())
		.whereId(borrowing.id)
		.oneOrNone();
});

module.exports = {app};