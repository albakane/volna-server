DROP TABLE IF EXISTS ADMIN;

CREATE TABLE ADMIN (
  ID_ADMIN INT NOT NULL AUTO_INCREMENT,
  LOGIN CHAR(40) NOT NULL,
  PASSWORD CHAR(60) NOT NULL,

  CONSTRAINT PK_ID_ADMIN PRIMARY KEY(ID_ADMIN)
);

INSERT INTO ADMIN(LOGIN, PASSWORD) VALUES ("admin", "$2b$15$VdJWBL1ucMzDcOQt43IVHOYNAjAzXvyzBYbSq7xVuTmVswrE.LyAC");