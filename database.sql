--create a database named weekend-to-do-app

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(500) NOT NULL,
	"completed" boolean NOT NULL
);
