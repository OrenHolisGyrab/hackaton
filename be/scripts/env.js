module.exports = {
	host: process.env.BIND_HOST || "localhost",
	port: process.env.BIND_PORT || 6300,
	url: process.env.URL || `http://${process.env.BIND_HOST || "localhost"}:${process.env.BIND_PORT || 6300}/`,

	datadir: process.env.DATADIR || '.',

	//Postgresql database
	pg: {
		host: process.env.PGSQL_HOST || 'localhost',
		port: Number(process.env.PGSQL_PORT) || 5432,
		pass: process.env.PGSQL_PASSWORD || 'borrowing_administration',
		user: process.env.PGSQL_USER || 'borrowing_administration',
		db: process.env.PGSQL_DB || 'borrowing_administration',
		sslmode: process.env.PG_REQUIRE_SSL || false
	}
}
