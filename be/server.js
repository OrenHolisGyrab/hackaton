const {ApiError, express, FallThrough} = require('./scripts/utils/aexpress.js');
const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
const sessions = require('./scripts/sessions.js');
const env = require('./scripts/env.js');
const users = require('./scripts/users.js');
const items = require('./scripts/items.js');
const lending = require('./scripts/lendings.js');
const Google = require('./scripts/Google.js');
const {hasAtLeastRole} = require("./scripts/utils/validations");

const app = express();
const server = http.createServer(app);

server.listen(env.port, env.host, () => console.log(`Listening on ${env.url}`));

app.use(cookieParser());
app.use(express.json());

app.use('/api', sessions.app);
app.use('/api', Google.app);

/* ALL OTHER MODULES NEED SESSION */

app.all_json('/api/*', async req => {
	req.session = await sessions.getSessionUser(req.cookies['borrowing-session']);

	if (!req.session.active) {
		throw new ApiError(401, 'Your account must be active')
	}

	if (!req.session) {
		throw new ApiError(401, 'You must be authenticated to perform this operation');
	}

	return FallThrough;
});

app.use('/api', lending.app);

app.all_json('/api/*', async req => {
	if (!hasAtLeastRole(req.session, 'WORKER')) {
		throw new ApiError(401, 'Your role is too low to perform this operation');
	}

	return FallThrough;
})

app.use('/api', items.app);

app.all_json('/api/*', async req => {
	if (!hasAtLeastRole(req.session, 'ADMIN')) {
		throw new ApiError(401, 'Your role is too low to perform this operation');
	}

	return FallThrough;
})

app.use('/api', users.app);

const options = {
	lastModified: true,
	redirect: '/'
}

app.use(express.static(path.join(path.resolve(), 'gen/fe'), options))
app.use(express.static(path.join(path.resolve(), 'fe'), options));

/*app.get('*', (req, res) => {
	res.set('Content-Type', 'text/html;charset=utf-8');
	res.set('Cache-Control', 'private, must-revalidate, max-age=60');
	res.send(`<!DOCTYPE html>
	<head>
		<meta charset=utf-8>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel="stylesheet" type="text/css" href="./main.css">
	
		<script src="./main.build.js"></script>
	
		<title>Zápůjčkový systém</title>
	</head>
	<body></body>
`);
});*/

app.get('*', express.static('./dist'));