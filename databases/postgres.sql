CREATE table users 
(
    id SERIAL,
    username VARCHAR(256) UNIQUE NOT NULL,
    fullname VARCHAR(512) NOT NULL,
    group_id INTEGER
); 

CREATE table groups 
(
    id SERIAL,
    name VARCHAR(256),
    year INTEGER
);

CREATE TABLE tasks 
(
    id SERIAL,
    name VARCHAR(256) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    deadline_time TIMESTAMP,
    is_published BOOLEAN
);

CREATE TABLE commits 
(
    id SERIAL,
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    "timestamp" TIMESTAMP DEFAULT now()
);

INSERT INTO groups (name, year) VALUES ('КП-61', 2016);
INSERT INTO groups (name, year) VALUES ('КП-62', 2016);
INSERT INTO groups (name, year) VALUES ('КП-71', 2017);
INSERT INTO groups (name, year) VALUES ('КП-72', 2017);
INSERT INTO groups (name, year) VALUES ('КП-73', 2017);

INSERT INTO users (username, fullname, group_id) VALUES ('test', 'Test User', 1);
INSERT INTO users (username, fullname, group_id) VALUES ('user1', 'Test User 1', 1);
INSERT INTO users (username, fullname, group_id) VALUES ('user2', 'Test User 2', 2);

INSERT INTO tasks 
    (name, description, deadline_time, is_published)
VALUES
    ('nlp', '**la-la-la**', '2017-11-11'::TIMESTAMP, FALSE);
INSERT INTO tasks 
    (name, description, deadline_time, is_published)
VALUES
    ('git', '**GIT**', '2017-11-11'::TIMESTAMP, TRUE);