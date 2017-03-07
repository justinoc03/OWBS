CREATE TABLE jobPostings (
jobPosting_id SERIAL PRIMARY KEY NOT NULL,
jobPosting_name VARCHAR(200),
jobPosting_description TEXT,
jobPosting_open BOOLEAN,
jobPosting_start timestamp(0)
);


INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('Tower Dude', 'Climbs towers and builds them up', TRUE, now());
INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('Machine guy', 'Keeps machines running', FALSE, now());
INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('Rebar Bender', 'Bending rebar, of course!', TRUE, now());
INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('HR Person', 'Makes sure to hire good people', FALSE, now());
INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('Driver', 'Gets everyone to the jobsite safely and on time', TRUE, now());
