const express = require('express');
const SQLBuilder = require("./utils/SQLBuilder.js");
const {FallThrough} = require("./utils/aexpress.js");
const {hasAtLeastRole, validateAjvScheme, validateValidDate, validateId, validateType} = require("./utils/validations");
const {Unauthorized, BadRequest} = require("./utils/aexpress");
const fs = require("fs");
const multer = require('multer');
const {Item} = require("./schemas");
const {mapCsvToJson, formatTimeTwoDigit} = require("./utils/utils");

const app = express();
const db = new SQLBuilder();

const tempUpload = multer({ dest: `./temp` })

app.get_json('/items', async () => await db.select('items').where('deleted_at IS NULL').getList());
app.get_json('/items/:id([0-9]+)', async req => await validateId(req.params.id, 'items'));

app.post_json('/items', async req => {
	const data = req.body;
	validateAjvScheme(Item, data);
	validateValidDate(data.added);
	return await db.insert('items', data).oneOrNone();
});
app.post_upload('/items/import', tempUpload.array('file', 1), async req => {	const file = req.files[0];
	if (file.mimetype !== 'text/csv') {
		throw new BadRequest('Invalid format of file', 'invalid_file_format');
	}

	try {
		const itemsJson = mapCsvToJson(file.path, {divider: ';', lineEnd: '\r\n'}, {
			cislo: 'code',
			mist: 'room',
			nazev: 'name',
			datzar: 'added',
			mj: 'packing',
			cmnoz: 'count',
			vyrcis: 'serial_number'
		});

		const items = [];
		for (const i of itemsJson) {
			const count = Number(i.count.replace(/,000/, ''));
			validateType(count, 'number');

			for (let idx = 0; idx < count; idx++) {
				const [date, month, year] = i.added.split('.');

				const item = {
					code: i.code,
					room: Number(i.room),
					name: i.name,
					added: validateValidDate(`${year}-${formatTimeTwoDigit(month)}-${formatTimeTwoDigit(date)}`),
					serial_number: i.serial_number,
					description: ''
				}

				validateAjvScheme(Item, item);
				items.push(item);
			}
		}

		const imported = [];
		for (const i of items) {
			imported.push(await db.insert('items', i).oneOrNone());
		}

		fs.unlinkSync(file.path);

		return imported;
	} catch (ex) {
		fs.unlinkSync(file.path);
		throw ex;
	}

});
app.put_json('/items/:id([0-9]+)', async req => {
	const data = req.body;
	validateAjvScheme(Item, data);
	await validateId(req.params.id, 'items');

	validateValidDate(data.added);
	return await db.update('items').set(data).oneOrNone();
});
app.delete_json('/items/:id([0-9]+)', async req => {
	await validateId(req.params.id, 'items');

	await db.update('items')
		.set('deleted_at', new Date())
		.set('code', '')
		.oneOrNone();
});


module.exports = {app};