module.exports = {
	host: process.env.BIND_HOST || "localhost",
	port: process.env.BIND_PORT || 6300,
	url: process.env.URL || `http://${process.env.BIND_HOST || "localhost"}:${process.env.BIND_PORT || 6300}/`,

	datadir: process.env.DATADIR || '.',

	google: {
		clientId: '633541672315-ikm1u1f07uaajdqdbv6rebim0qkptkek.apps.googleusercontent.com',
		clientSecret: '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'
	},

	//Postgresql database
	pg: {
		host: process.env.PGSQL_HOST || 'db-postgresql-fra1-00896-jun-27-backup-do-user-12887787-0.b.db.ondigitalocean.com' || 'localhost',
		port: Number(process.env.PGSQL_PORT) || 25060 || 5432,
		pass: process.env.PGSQL_PASSWORD || 'AVNS_lCpEKdI9iPvjbZnxtPk' || 'borrowing_administration',
		user: process.env.PGSQL_USER || 'borrowing_administration',
		db: process.env.PGSQL_DB || 'borrowing_administration',
		sslmode: process.env.PG_REQUIRE_SSL || 'require' || false
	}
}


