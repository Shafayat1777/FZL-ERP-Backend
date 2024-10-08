import { decimal, integer, pgSchema, text, uuid } from 'drizzle-orm/pg-core';
import { DateTime, defaultUUID, uuid_primary } from '../variables.js';

import * as hrSchema from '../hr/schema.js';
import * as materialSchema from '../material/schema.js';

const purchase = pgSchema('purchase');

export const vendor = purchase.table('vendor', {
	uuid: uuid_primary,
	name: text('name').notNull(),
	contact_name: text('contact_name').notNull(),
	email: text('email').notNull(),
	office_address: text('office_address').notNull(),
	contact_number: text('contact_number').default(null),
	remarks: text('remarks').default(null),
});

export const defPurchaseVendor = {
	type: 'object',
	required: ['uuid', 'name', 'email', 'office_address'],
	properties: {
		uuid: {
			type: 'string',
		},
		name: {
			type: 'string',
		},
		contact_name: {
			type: 'string',
		},
		email: {
			type: 'string',
		},
		office_address: {
			type: 'string',
		},
		contact_number: {
			type: 'string',
		},
		remarks: {
			type: 'string',
		},
	},
	xml: {
		name: 'Purchase/Vendor',
	},
};

export const description = purchase.table('description', {
	uuid: uuid_primary,
	vendor_uuid: defaultUUID('vendor_uuid'),
	is_local: integer('is_local').notNull(),
	lc_number: text('lc_number').default(null),
	created_by: defaultUUID('created_by'),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const defPurchaseDescription = {
	type: 'object',
	required: ['uuid', 'vendor_uuid', 'created_by', 'created_at', 'is_local'],
	properties: {
		uuid: {
			type: 'string',
		},
		vendor_uuid: {
			type: 'string',
		},
		is_local: {
			type: 'integer',
		},
		lc_number: {
			type: 'string',
		},
		created_by: {
			type: 'string',
		},
		created_at: {
			type: 'string',
			format: 'date-time',
			example: '2024-01-01 00:00:00',
		},
		updated_at: {
			type: 'string',
			format: 'date-time',
			example: '2024-01-01 00:00:00',
		},
		remarks: {
			type: 'string',
		},
	},
	xml: {
		name: 'Purchase/Description',
	},
};

export const entry = purchase.table('entry', {
	uuid: uuid_primary,
	purchase_description_uuid: defaultUUID('purchase_description_uuid'),
	material_info_uuid: defaultUUID('material_info_uuid'),
	quantity: decimal('quantity', {
		precision: 20,
		scale: 4,
	}).notNull(),
	price: decimal('price', {
		precision: 20,
		scale: 4,
	}).default(null),
	created_by: defaultUUID('created_by'),
	created_at: DateTime('created_at').notNull(),
	updated_at: DateTime('updated_at').default(null),
	remarks: text('remarks').default(null),
});

export const defPurchaseEntry = {
	type: 'object',
	required: [
		'uuid',
		'purchase_description_uuid',
		'material_info_uuid',
		'quantity',
		'created_by',
		'created_at',
	],
	properties: {
		uuid: {
			type: 'string',
		},
		purchase_description_uuid: {
			type: 'string',
		},
		material_info_uuid: {
			type: 'string',
		},
		quantity: {
			type: 'number',
		},
		price: {
			type: 'number',
		},
		created_by: {
			type: 'string',
		},
		created_at: {
			type: 'string',
			format: 'date-time',
			example: '2024-01-01 00:00:00',
		},
		updated_at: {
			type: 'string',
			format: 'date-time',
			example: '2024-01-01 00:00:00',
		},
		remarks: {
			type: 'string',
		},
	},
	xml: {
		name: 'Purchase/Entry',
	},
};

//.....................FOR TESTING.....................

export const defPurchase = {
	vendor: defPurchaseVendor,
	description: defPurchaseDescription,
	entry: defPurchaseEntry,
};

export const tagPurchase = [
	{
		'purchase.vendor': {
			name: 'Vendor',
			description: 'Vendor',
		},
	},
	{
		'purchase.description': {
			name: 'Description',
			description: 'Description',
		},
	},
	{
		'purchase.entry': {
			name: 'Entry',
			description: 'Entry',
		},
	},
];

export default purchase;
