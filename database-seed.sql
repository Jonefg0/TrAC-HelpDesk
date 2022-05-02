CREATE TABLE "UserTable" (
	"UserID" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"cohortID" int NOT NULL,
	"usertypeID" int NOT NULL,
	CONSTRAINT "UserTable_pk" PRIMARY KEY ("UserID")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "TicketTable" (
	"TicketID" serial NOT NULL UNIQUE,
	"UserID" int NOT NULL,
	"CategoryID" int NOT NULL,
	"ProblemStatement" TEXT,
	"ExpectedBehavior" TEXT,
	"TriedSolution" TEXT,
	"SuspectedIssue" TEXT,
	"ZoomLink" TEXT,
	"status" TEXT DEFAULT 'Open',
	"response" TEXT,
	"responderID" int,
	"created_at" TIMESTAMP WITH TIME ZONE,
	"resolved_at" TIMESTAMP WITH TIME ZONE,
	"image_links" TEXT NOT NULL,
	CONSTRAINT "TicketTable_pk" PRIMARY KEY ("TicketID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Categories" (
	"CategoryID" serial NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "Categories_pk" PRIMARY KEY ("CategoryID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "UserType" (
	"UserTypeID" serial NOT NULL UNIQUE,
	"role" varchar(255) NOT NULL,
	CONSTRAINT "UserType_pk" PRIMARY KEY ("UserTypeID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "CohortTable" (
	"CohortID" serial NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "CohortTable_pk" PRIMARY KEY ("CohortID")
) WITH (
  OIDS=FALSE
);
