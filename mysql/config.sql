DROP TABLE IF EXISTS COMPETITION_PILOT;

DROP TABLE IF EXISTS ADMIN;
DROP TABLE IF EXISTS PILOT;
DROP TABLE IF EXISTS COMPETITION;

CREATE TABLE ADMIN (
  ID_ADMIN INT NOT NULL AUTO_INCREMENT,
  LOGIN CHAR(40) NOT NULL,
  PASSWORD CHAR(60) NOT NULL,

  CONSTRAINT PK_ID_ADMIN PRIMARY KEY(ID_ADMIN)
);

CREATE TABLE PILOT (
  ID_PILOT INT NOT NULL AUTO_INCREMENT,
  REG_NUMBER CHAR(6) NOT NULL,

  CONSTRAINT PK_ID_PILOT PRIMARY KEY(ID_PILOT)
);

CREATE TABLE COMPETITION (
  ID_COMPETITION INT NOT NULL AUTO_INCREMENT,
  NAME CHAR(60) NOT NULL,
  DATE DATETIME NOT NULL,
  TYPE CHAR(3) NOT NULL,

  CONSTRAINT PK_ID_COMPETITION PRIMARY KEY(ID_COMPETITION)
);

CREATE TABLE COMPETITION_PILOT (
  ID_COMPETITION_PILOT INT NOT NULL AUTO_INCREMENT,
  ID_PILOT INT NOT NULL,
  ID_COMPETITION INT NOT NULL,

  CONSTRAINT PK_ID_COMPETITION_PILOT PRIMARY KEY(ID_COMPETITION_PILOT),
  CONSTRAINT FK_ID_PILOT FOREIGN KEY(ID_PILOT) REFERENCES PILOT(ID_PILOT),
  CONSTRAINT FK_ID_COMPETITION FOREIGN KEY(ID_COMPETITION) REFERENCES COMPETITION(ID_COMPETITION)
);

/*DELIMITER |

CREATE TRIGGER before_pilot_insertion BEFORE INSERT
  ON PILOT FOR EACH ROW
  BEGIN
    IF NEW.REG_NUMBER IS
  END |

DELIMITER ;
*/

INSERT INTO ADMIN(LOGIN, PASSWORD) VALUES ("admin", "$2b$15$VdJWBL1ucMzDcOQt43IVHOYNAjAzXvyzBYbSq7xVuTmVswrE.LyAC");

INSERT INTO COMPETITION(NAME, DATE, TYPE) VALUES ("Competition ANR test", "2018-10-28 12:45:02", "ANR");

INSERT INTO PILOT(REG_NUMBER) VALUES ("F-GNDF");
INSERT INTO PILOT(REG_NUMBER) VALUES ("F-LJRD");
INSERT INTO PILOT(REG_NUMBER) VALUES ("F-AFSV");
INSERT INTO PILOT(REG_NUMBER) VALUES ("F-PLEF");

INSERT INTO COMPETITION_PILOT(ID_PILOT, ID_COMPETITION) VALUES (1, 1);
INSERT INTO COMPETITION_PILOT(ID_PILOT, ID_COMPETITION) VALUES (2, 1);
INSERT INTO COMPETITION_PILOT(ID_PILOT, ID_COMPETITION) VALUES (3, 1);
INSERT INTO COMPETITION_PILOT(ID_PILOT, ID_COMPETITION) VALUES (4, 1);