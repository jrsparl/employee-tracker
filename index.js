const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');

const promptUser = () => {
 return inquirer.prompt([
    {
        type: 'list',
        name: 'InitialPrompt',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee', 'Quit']
    }
])
}







const getDepartments = () => {
    connection.query(
        'SELECT * FROM departmentTBL',
        function (err, res) {
            if (err) throw err;
            let table = cTable.getTable(res)
            console.log(table)
            return true;
            // Call updateProduct() AFTER the INSERT completes
        }
    );
}

const getRoles = () => {
    connection.query(
        'SELECT * FROM roleTBL',
        function (err, res) {
            if (err) throw err;
            let table = cTable.getTable(res)
            console.log(table)
            return true;
            // Call updateProduct() AFTER the INSERT completes
        }
    );
}

const getEmployees = () => {
    connection.query(
        'SELECT * FROM employeeTBL',
        function (err, res) {
            if (err) throw err;
            let table = cTable.getTable(res)
            console.log(table)
            return true;
            // Call updateProduct() AFTER the INSERT completes
        }
    );
}







promptUser().then(function(data){
    const userChoice = data.InitialPrompt;
    // console.log(data)
    switch (userChoice) {
        case 'View All Departments':
            getDepartments();
            // promptUser();
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
            //addDepartment();
            // promptUser();
            break;
        case 'Add a Role':
            //addRole();
            // promptUser();
            break;
        case 'Add an Employee':
            //addEmployee();
            // promptUser();
            break;
        case 'Update an Employee':
            //updateEmployee();
            // promptUser();
            break;


        default:
            console.log('Thank you!');
            return false
}
})


