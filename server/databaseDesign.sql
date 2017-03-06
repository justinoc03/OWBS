CREATE TABLE jobPostings (
jobPosting_id SERIAL PRIMARY KEY NOT NULL,
jobPosting_name VARCHAR(200),
jobPosting_description VARCHAR(500),
jobPosting_open BOOLEAN,
jobPosting_start timestamp(0)
);


INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('Tower Dude', 'Climbs towers and builds them up', TRUE, now());
INSERT INTO jobPostings (jobPosting_name, jobPosting_description, jobPosting_open, jobPosting_start) VALUES ('Machine guy', 'Keeps machines running', FALSE, now());
