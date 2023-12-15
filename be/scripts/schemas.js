const Ajv = require("ajv");
const ajv = new Ajv()

ajv.addFormat('date', function(dateTimeString) {
	if (typeof dateTimeString === 'object') {
		dateTimeString = dateTimeString.toISOString();
	}

	return !isNaN(Date.parse(dateTimeString));
});

const Item = {
	$id: 'Item',
	type: 'object',
	properties: {
		code: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		description: {
			type: 'string'
		},
		room: {
			type: 'number',
			minimum: 0,
			multipleOf: 1
		},
		added: {
			type: ['string', 'object'],
			format: 'date',
		},
		serial_number: {
			type: 'string'
		}
	},
	required: ['name', 'description', 'code', 'room', 'added', 'serial_number'],
	additionalProperties: false
}

const ItemBorrowing = {
	$id: 'ItemBorrowing',
	type: 'object',
	properties: {
		user: {
			type: 'string',
		},
		item: {
			type: 'number',
			minimum: 0,
			multipleOf: 1
		},
		from: {
			type: 'string',
			format: 'date',
		},
		to: {
			type: 'string',
			format: 'date',
		},
		note: {
			type: 'string'
		}
	},
	required: ['user', 'item', 'note', 'to', 'from'],
	additionalProperties: false
}

const ItemBorrowingUpdate = {
	$id: 'ItemBorrowingUpdate',
	type: 'object',
	properties: {
		to: {
			type: 'string',
			format: 'date',
		},
		note: {
			type: 'string'
		}
	},
	required: ['note', 'to'],
	additionalProperties: false
}

const UserRole = {
	$id: 'UserRole',
	type: 'object',
	properties: {
		role: {
			type: 'string',
			enum: ['USER', 'WORKER', 'ADMIN']
		}
	},
	required: ['roles'],
	additionalProperties: false
}

module.exports = {
	UserRole: ajv.compile(UserRole)
}