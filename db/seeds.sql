INSERT INTO departmentTBL(dept_name)
VALUES
    ('Product'),
    ('Distribution'),
    ('Sales'),
    ('HR');

INSERT INTO roleTBL(empl_title,empl_salary,is_manager, dept_id)
VALUES
    ('Distribution Manager', 50000, 1, 2),
    ('Warehouse Associate', 20000, 0, 2),
    ('Buyer', 60000, 1, 1),
    ('Assistant Buyer', 30000, 0, 1),
    ('Retail Manager', 40000, 1, 3),
    ('Retail Associate', 20000, 0, 3),
    ('VP HR', 100000, 1, 4),
    ('Administrative Assistant', 25000, 0, 4);


INSERT INTO employeeTBL (first_name, last_name, role_id)
VALUES
  ('Ronald', 'Firbank', 1),
  ('Virginia', 'Woolf', 1),
  ('Piers', 'Gaveston', 1),
  ('Charles', 'LeRoi', 2),
  ('Katherine', 'Mansfield', 2),
  ('Dora', 'Carrington', 3),
  ('Edward', 'Bellamy', 3),
  ('Montague', 'Summers', 3),
  ('Octavia', 'Butler', 3),
  ('Unica', 'Zurn', NULL);