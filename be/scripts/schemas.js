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
		email: {
			type: 'string',
		},
		item: {
			type: 'string',
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
	required: ['email', 'item', 'to', 'from'],
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
			enum: ['STUDENT', 'WORKER', 'ADMIN']
		}
	},
	required: ['role'],
	additionalProperties: false
}

module.exports = {
	UserRole: ajv.compile(UserRole),
	ItemBorrowingUpdate: ajv.compile(ItemBorrowingUpdate),
	ItemBorrowing: ajv.compile(ItemBorrowing),
	Item: ajv.compile(Item)
}