
CREATE TABLE IF NOT EXISTS Student (
    studentID INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    inBlackList BOOLEAN
);

CREATE TABLE IF NOT EXISTS Record (
    recordID INTEGER PRIMARY KEY,
    borrowTime DATETIME,
    returnTime DATETIME,
    returnDDL DATETIME,
    comment TEXT,
    copyID INTEGER,
    studentID INTEGER,
    adminID INTEGER,
    FOREIGN KEY (copyID) REFERENCES Copy(copyID),
    FOREIGN KEY (studentID) REFERENCES Student(studentID),
    FOREIGN KEY (adminID) REFERENCES Admin(adminID)
);

CREATE TABLE IF NOT EXISTS Admin (
    adminID INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    schedule TEXT
);

CREATE TABLE IF NOT EXISTS Copy (
    copyID INTEGER PRIMARY KEY,
    location TEXT,
    isCheckedOut BOOLEAN,
    titleID INTEGER,
    FOREIGN KEY (titleID) REFERENCES Title(titleID)
);

CREATE TABLE IF NOT EXISTS Title (
    titleID INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    genre TEXT
);
