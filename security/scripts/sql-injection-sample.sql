create table users (
    id serial,
    username varchar(64) not null,
    password varchar(64) not null,
    fullname varchar(256) not null,
    role integer  -- 0 - user, 1 - admin
);

insert into users (username, password, fullname, role) values ('vasya', 'vyasssa', 'Vasya Yo', 0);
insert into users (username, password, fullname, role) values ('ira', 'popop123', 'Ira Admin', 1);

create table products (
    id serial, 
    title varchar(256) not null, 
    description text
);

insert into products (title, description) values ('Test product 1', 'Some description');
insert into products (title, description) values ('Test product 2', 'Some description');
insert into products (title, description) values ('Test product 3', 'Some description');

GRANT ALL PRIVILEGES ON DATABASE "sql-injection-sample" to "user";

ALTER DEFAULT PRIVILEGES 
    FOR USER "user"   -- Alternatively "FOR USER"
    IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "user";

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "user";