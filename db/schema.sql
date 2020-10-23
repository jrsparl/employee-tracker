DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE departmentTBL
(
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roleTBL
(
  id INT NOT NULL AUTO_INCREMENT,
  empl_title VARCHAR(100),
  empl_salary DECIMAL,
  is_manager BOOLEAN,
  dept_id INTEGER,
  PRIMARY KEY(id),
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES departmentTBL(id) ON DELETE SET NULL
);


-- CREATE TABLE managerTBL(
--     assignment_id INTEGER PRIMARY KEY,
--     manager_id INTEGER,
--     employee_id INTEGER,
-- )



CREATE TABLE employeeTBL(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    -- manager_id INTEGER,
    PRIMARY KEY(id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roleTBL(id) ON DELETE SET NULL
    -- CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES managerTBL(id) ON DELETE SET NULL
)
