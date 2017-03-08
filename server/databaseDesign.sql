--jobPostings table to hold job posts with example inserts below
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

--adminLogin table to hold any administrators to login with dummy logins below
CREATE TABLE adminLogin (
admin_id SERIAL PRIMARY KEY NOT NULL,
admin_username VARCHAR(200),
admin_password VARCHAR(200)
);

INSERT INTO adminLogin (admin_username, admin_password) VALUES ('justin.oc03@gmail.com', 'backend');
INSERT INTO adminLogin (admin_username, admin_password) VALUES ('brent.reno@gmail.com', 'frontend');
