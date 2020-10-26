const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');
console.log(`╔═══╗        ╔╗                      ╔═╗╔═╗                         
    ║╔══╝        ║║                      ║║╚╝║║                         
    ║╚══╗╔╗╔╗╔══╗║║ ╔══╗╔╗ ╔╗╔══╗╔══╗    ║╔╗╔╗║╔══╗ ╔═╗ ╔══╗ ╔══╗╔══╗╔═╗
    ║╔══╝║╚╝║║╔╗║║║ ║╔╗║║║ ║║║╔╗║║╔╗║    ║║║║║║╚ ╗║ ║╔╗╗╚ ╗║ ║╔╗║║╔╗║║╔╝
    ║╚══╗║║║║║╚╝║║╚╗║╚╝║║╚═╝║║║═╣║║═╣    ║║║║║║║╚╝╚╗║║║║║╚╝╚╗║╚╝║║║═╣║║ 
    ╚═══╝╚╩╩╝║╔═╝╚═╝╚══╝╚═╗╔╝╚══╝╚══╝    ╚╝╚╝╚╝╚═══╝╚╝╚╝╚═══╝╚═╗║╚══╝╚╝ 
             ║║         ╔═╝║                                 ╔═╝║       
             ╚╝         ╚══╝                                 ╚══╝       
    `)
const promptUser = () => {
    
 return inquirer.prompt([
    {
        type: 'list',
        name: 'InitialPrompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Quit']
    }
]).then(function(data){
    const userChoice = data.InitialPrompt;
    // console.log(data)
    switch (userChoice) {
        case 'View All Departments':
            getDepartments();
            break;
        case 'View All Roles':
            getRoles();
            // promptUser();
            break;
        case 'View All Employees':
            getEmployees();
            // promptUser();
            break;
        case 'Add a Department':
            addDepartment();
            // promptUser();
            break;
        case 'Add a Role':
            addRole();
            // promptUser();
            break;
        case 'Add an Employee':
            addEmployee();
            // promptUser();
            break;
        case 'Update an Employee':
            updateEmployeeRole();
            break;


        default:
            // Ends the connection to the database
            connection.end();
            // Exits the terminal application
            process.exit();

}
})
}







const getDepartments = () => {
    connection.query(
        'SELECT id AS "Index",dept_name AS "Department" FROM departmentTBL',
        function (err, res) {
            if (err) throw err;
            let table = cTable.getTable(res)
            console.log(table)
            promptUser();
            // Call updateProduct() AFTER the INSERT completes
        }
    );
}

const getRoles = () => {
    connection.query(
        `SELECT role_title AS "Job Title", role_salary AS "Salary", departmentTBL.dept_name AS "Department" FROM roleTBL
         LEFT JOIN departmentTBL ON roleTBL.dept_id = departmentTBL.id`,
        function (err, res) {
            if (err) throw err;
            let table = cTable.getTable(res)
            console.log(table)
            promptUser();
            // Call updateProduct() AFTER the INSERT completes
        }
    );
}

const getEmployees = () => {
    connection.query(
        `SELECT CONCAT(e.first_name," ", e.last_name) AS 'Employee Name', 
                                                r.role_title AS 'Job Title', r.role_salary AS 'Salary', 
                                                CONCAT(e2.first_name," ", e2.last_name) AS 'Manager Name'
                                                FROM employeeTBL AS e
                                                LEFT JOIN roleTBL AS r
                                                ON e.role_id = r.id
                                                LEFT JOIN employeeTBL AS e2
                                                ON e.manager_id = e2.id`,
        function (err, res) {
            if (err) throw err;
            let table = cTable.getTable(res)
            console.log(table)
            promptUser();
            // Call updateProduct() AFTER the INSERT completes
        }
    );
}

const addDepartment = () => {

    inquirer.prompt([
        {
            type: 'Input',
            name: 'deptName',
            message: 'Please enter the name of the department.',
            validate: deptName => {
                if (deptName) {
                    return true;
                } else {
                    console.log('Please enter the department!');
                    return false;
                }
            }
        }
    ]).then(function(data){
        let dName = data.deptName
        const query = connection.query(
            'INSERT INTO departmentTBL SET ?',
            {
                dept_name: dName
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + ' department added!\n');
              promptUser();
            }
          );
          // logs the actual query being run
        //   console.log(query.sql); 
          //
    })

    
}


const addRole = () => {

    inquirer.prompt([
        {
            type: 'Input',
            name: 'roleTitle',
            message: 'Please enter the name of the role.',
            validate: roleTitle => {
                if (roleTitle) {
                    return true;
                } else {
                    console.log('Please enter the role name!');
                    return false;
                }
            }
        },
        {
            type: 'Input',
            name: 'roleSalary',
            message: 'Please enter the salary.',
            validate: roleSalary => {
                if (roleSalary) {
                    return true;
                } else {
                    console.log('Please enter the role name!');
                    return false;
                }
            }
        },
        {
            type: 'Input',
            name: 'roleDepartment',
            message: 'Please enter the department ID.',
            validate: roleDepartment => {
                if (roleDepartment) {
                    return true;
                } else {
                    console.log('Please enter the department ID!');
                    return false;
                }
            }
        }
    ]).then(function(data){
        const query = connection.query(
            'INSERT INTO roleTBL SET ?',
            {
                role_title: data.roleTitle,
                role_salary: data.roleSalary,
                dept_id: data.roleDepartment
            },
            function(err, res) {
              if (err) throw err;
              console.log(res.affectedRows + ' role added!\n');
              promptUser();
            }
          );
          // logs the actual query being run
        //   console.log(query.sql); 
          //
    })

    
}

const addEmployee = () => {
 
    connection.promise().query(
        `SELECT id, role_title FROM roleTBL`
    ).then(function (data) {

        let roleArray = data[0].map(function (el) {
            return {
                name: el.role_title,
                value: el.id
            };
        });

        connection.promise().query(
            `SELECT employeeTBL.id, employeeTBL.first_name, employeeTBL.last_name, roleTBL.role_title
            FROM employeeTBL 
            INNER JOIN roleTBL ON employeeTBL.role_id = roleTBL.id
            WHERE employeeTBL.manager_id IS NULL`
        ).then(function (data) {
            // console.log(data)
            let employeeArray = data[0].map(function (el) {
                return {
                    name: el.first_name + ' ' + el.last_name + ' ' + el.role_title,
                    value: el.id
                };
            });

    inquirer.prompt([
        {
            type: 'Input',
            name: 'firstName',
            message: 'Please enter the first name.',
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter the first name!');
                    return false;
                }
            }
        },
        {
            type: 'Input',
            name: 'lastName',
            message: 'Please enter the last Name.',
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter the role name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleID',
            message: "Please select the employee's role.",
            choices: roleArray
        },
        {
            type: 'confirm',
            name: 'confirmManager',
            message: 'Would you like to add a manager for this employee?',
            default: true
        },
        {
            type: 'list',
            name: 'managerID',
            message: 'Please select the manager.',
            choices: employeeArray, 
            when: ({ confirmManager }) => confirmManager
        }
    ]).then(function(data){
        const query = connection.query(
            'INSERT INTO employeeTBL SET ?',
            {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: data.roleID,
                manager_id: data.managerID
            },
            function(err, res) {
              if (err){
                  console.log("There was an issue with submission please type node index and start again.")
              }
              console.log(res.affectedRows + ' employee added!\n');
              promptUser();
            }
          );
          
    })
});
  
});

}


const updateEmployeeRole = () => {

    connection.promise().query(
        `SELECT id, first_name, last_name FROM employeeTBL`
    ).then(function (data) {

        let employeeArray = data[0].map(function (el) {
            return {
                name: el.first_name + ' ' + el.last_name,
                value: el.id
            };
        });

        connection.promise().query(
            `SELECT id, role_title FROM roleTBL`
        ).then(function (data) {

            let roleArray = data[0].map(function (el) {
                return {
                    name: el.role_title,
                    value: el.id
                };
            });





            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeChoice',
                    message: 'Please select employee to update.',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: 'Please select the new role.',
                    choices: roleArray
                },

            ]).then(function (Newdata) {
                
                    let eID = Newdata.employeeChoice
    
                    const query = connection.query(
                        'UPDATE employeeTBL SET ? WHERE ?',
                        [
                        {
                            role_id: Newdata.roleID
                        },
                        {
                            id: eID
                        }
                        ],
                        function(err, res) {
                          if (err) throw err;
                          console.log(res.affectedRows + ' employee updated!\n');
                          promptUser();
                        }
                      );
                      // logs the actual query being run
                    //   console.log(query.sql); 
            });

        });
    });
}


promptUser();


