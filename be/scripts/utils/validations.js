const {ApiError} = require("./aexpress.js");
const {parseId} = require("./utils");
const {BadRequest} = require("./aexpress");
const SQLBuilder = require('./SQLBuilder');

const db = new SQLBuilder();
const ROLES = {
	STUDENT: 'STUDENT',
	WORKER: 'WORKER',
	ADMIN: 'ADMIN'
}

function validateType(value, type) {
	if (type === 'Array' && Array.isArray(value)) {
		return;
	}

	if (typeof value !== type) {
		throw new ApiError(400, 'Does not match type');
	}
}

function validateStringNotEmpty(text, label) {
	validateType(text, 'string');
	if (text == null || text.length === 0 || text.match(/^\s*$/)) {
		throw new ApiError(400, (label || 'Text') + ' cannot be empty.');
	}
}

function validateObjectNotEmpty(obj, label) {
	validateType(obj, 'object');
	if (obj == null || Object.keys(obj).length === 0) {
		throw new ApiError(400, (label || 'Object') + ' cannot be empty.');
	}
}

function validateArrayNotEmpty(arr, label) {
	validateType(arr, 'Array');
	if (arr == null || arr.length === 0) {
		throw new Error((label || 'Array') + ' cannot be empty.');
	}
}

function validateValuesAreUnique(arr, label) {
	const unique = arr.length === new Set(arr).size;

	if (!unique) {
		throw new Error((label || 'Array') + ' contains duplicate values');
	}
}

function isNotNull(val, label) {
	if (val == null) {
		throw new Error((label || 'Value') + ' cannot be empty.');
	}
}

function isInstanceOf(value, instance, label) {
	if (!(value instanceof instance)) {
		throw new ApiError(400, `${label || 'Value'} does not match type`);
	}
}

function validateStringIfNotNull(val, label) {
	if (val) {
		validateStringNotEmpty(val, label);
	}
}

function validateNumberIfNotNull(val, label) {
	if (val !== null && val !== undefined) {
		validateType(val, 'number', label);
	}
}

const validateValidDate = str => {
	const date = new Date(str);

	if (!(date instanceof Date && !isNaN(date))) {
		throw new BadRequest('Invalid date', 'invalid_date');
	}

	return date;
};

const validateId = async (idStr, table) => {
	const id = parseId(idStr);
	return await db.one(table, id);
}

function validateAjvScheme(validator, data) {
	const res = validator(data);

	if (!res) {
		switch (validator.errors[0].keyword) {
			case "additionalProperties":
				throw new BadRequest();
			case "required":
				throw new BadRequest('Required property is missing', 'missing_property');
			default:
				throw new BadRequest();
		}
	}

	return res;
}

const hasAtLeastRole = (session, role) => {
	const roles = {
		[ROLES.ADMIN]: 2,
		[ROLES.WORKER]: 1,
		[ROLES.STUDENT]: 0
	}

	return roles[session.role] >= roles[role];
}

function validateEmail(email) {
	if (!/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
		throw new BadRequest(`Invalid email ${email}`, 'invalid_email');
	}
}

function validatePhoneNumber(phone) {
	if (!/^[\+]?[0-9]{9,15}$/.test(phone)) {
		throw new BadRequest(`Invalid phone ${phone}`, 'invalid_phone')
	}
}

module.exports = {
	validateValuesAreUnique,
	validateObjectNotEmpty,
	validateStringNotEmpty,
	validateArrayNotEmpty,
	validateType,
	isNotNull,
	validateEmail,
	validateAjvScheme,
	validateId,
	validateValidDate,
	isInstanceOf,
	validateStringIfNotNull,
	validateNumberIfNotNull,
	hasAtLeastRole,
	validatePhoneNumber,
	ROLES
}