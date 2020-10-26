INSERT INTO departmentTBL(dept_name)
VALUES
    ('Product'),
    ('Distribution'),
    ('Sales'),
    ('HR');

INSERT INTO roleTBL(role_title,role_salary, dept_id)
VALUES
    ('Distribution Manager', 50000, 2),
    ('Warehouse Associate', 20000, 2),
    ('Buyer', 60000, 1),
    ('Assistant Buyer', 30000, 1),
    ('Retail Manager', 40000, 3),
    ('Retail Associate', 20000, 3),
    ('VP HR', 100000, 4),
    ('Administrative Assistant', 25000, 4);


INSERT INTO employeeTBL (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, NULL),
  ('Katherine', 'Mansfield', 4, 4),
  ('Dora', 'Carrington', 4, 4),
  ('Edward', 'Bellamy', 5, NULL),
  ('Montague', 'Summers', 6, 7),
  ('Octavia', 'Butler', 7, NULL),
  ('Unica', 'Zurn', 8, 9);