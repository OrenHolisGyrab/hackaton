--------------------------------------------------
-- USERS
--------------------------------------------------

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email VARCHAR(128) NOT NULL UNIQUE,
	created TIMESTAMP(3) NOT NULL DEFAULT now(),
	active BOOLEAN DEFAULT TRUE,
	role TEXT NOT NULL CHECK ( role IN ('STUDENT', 'WORKER', 'ADMIN') ) DEFAULT 'STUDENT'
);

CREATE INDEX users_username_idx ON users(email);

--------------------------------------------------
-- SESSIONS
--------------------------------------------------

CREATE TABLE sessions (
    session_id TEXT PRIMARY KEY,
	"user" INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
	accessed TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE INDEX sessions_user_idx ON sessions("user");
CREATE INDEX sessions_accessed_idx ON sessions(accessed);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    code TEXT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    room INTEGER NOT NULL,
    created TIMESTAMP(3) NOT NULL DEFAULT now(),
    added TIMESTAMP(3) NOT NULL,
    deleted_at TIMESTAMP(3),
    serial_number TEXT
);

CREATE TABLE item_borrowings (
    id SERIAL PRIMARY KEY,
    "user" INTEGER REFERENCES users ON DELETE CASCADE,
    item INTEGER REFERENCES items ON DELETE CASCADE,
    prolonged BOOLEAN NOT NULL DEFAULT FALSE,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    note TEXT,
    confirmed BOOLEAN DEFAULT TRUE,
    returned TIMESTAMP(3)
);
