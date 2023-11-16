import readlineSync from "readline-sync";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

const detailsStorePath = "./detailsStore.json";
const errorFilePath = "./error.txt";
const empInfo = getDetails();
console.log("welcome");
const startTime = new Date().getMinutes();
showOptions();

function showOptions() {
  console.log("1. Create new employee ");
  console.log("2. Update employee record ");
  console.log("3. Delete employee ");
  console.log("4. Display employees by department ");
  console.log("5. Display employee by employee id ");
  console.log("6. exit ");
  const option = readlineSync.question("choose option ");
  chooseOption(option);
}

function chooseOption(option) {
  switch (option) {
    case "1":
      addEmployeeDetails();
      break;
    case "2":
      updateEmployeeDetails();
      break;
    case "3":
      deleteEmployeeDetails();
      break;
    case "4":
      viewDepartmentDetails();
      break;
    case "5":
      viewEmployeeDetails();
      break;
    case "6":
      exitFromSession();
      break;
    default:
      showOptions();
  }
}

function addEmployeeDetails() {
  try {
    const empName = readlineSync.question("Please enter your name");
    const empDOB = readlineSync.question(
      "Please enter your date of birth dd/mm/yyyy"
    );
    const empDepartment = readlineSync.question("Please enter your department");
    const age = getAge(empDOB);
    const details = {
      empId: uuidv4(),
      empName: empName,
      empDOB: empDOB,
      empDepartment: empDepartment,
      empAge: age,
    };
    const employeeIndex = empInfo.findIndex(
      (obj) => obj.empName === details.empName
    );
    if (employeeIndex !== -1) {
      console.log("empName Exist");
      return;
    }
    empInfo.push(details);
    addDetails(empInfo);
    console.log("Employee details added successfully");
  } catch (error) {
    console.log(`something went wrong taking details ${error.message}`);
    errorWriting(error);
  }
}

function getAge(dob) {
  const dobArray = dob.split("/");
  const birthDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

function getDetails() {
  try {
    const data = fs.readFileSync(detailsStorePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`something went wrong taking details from DB ${error.message}`);
    errorWriting(error);
  }
}

function addDetails(empInfo) {
  try {
    fs.writeFileSync(detailsStorePath, JSON.stringify(empInfo));
  } catch {
    errorWriting(error);
    console.log(`error occurred while adding details to DB-${error.message}`);
  }
}

function errorWriting(error) {
  const today = new Date();
  today.setTime(today.getTime());
  const currentTime = today.toUTCString();
  const errorDetails = `${error.message}----time:${currentTime}\n`;
  fs.appendFileSync(errorFilePath, errorDetails);
}

function updateEmployeeDetails() {
  try {
    const empId = readlineSync.question("Please enter the employee id");
    const updatedEmployee = empInfo.find(
      (employee) => employee.empId === empId
    );
    if (updatedEmployee) {
      const updatedName = readlineSync.question(
        `please enter name  ${updatedEmployee.empName}: `
      );
      const updatedDOB = readlineSync.question(
        ` please enter DOB (dd/mm/yyyy) ${updatedEmployee.empDOB}: `
      );
      const updatedDepartment = readlineSync.question(
        ` please enter department ${updatedEmployee.empDepartment}: `
      );
      const age = getAge(updatedDOB);
      updatedEmployee.empAge = age;
      updatedEmployee.empName = updatedName;
      updatedEmployee.empDOB = updatedDOB;
      updatedEmployee.empDepartment = updatedDepartment;
      addDetails(empInfo);
      console.log("Employee details updated successfully");
      return;
    }
    console.log("no employee exist");
  } catch (error) {
    console.log(`something went wrong updating details ${error.message}`);
    errorWriting(error);
  }
}

function deleteEmployeeDetails() {
  try {
    const empId = readlineSync.question("Please enter employee id");
    const employeeIndex = empInfo.findIndex(
      (employee) => employee.empId === empId
    );
    if (employeeIndex !== -1) {
      empInfo.splice(employeeIndex, 1);
      addDetails(empInfo);
      console.log("delete employee successfully");
      return;
    }
    console.log("no employee exist");
  } catch (error) {
    console.log(`something went wrong deleting details ${error.message}`);
    errorWriting(error);
  }
}

function viewEmployeeDetails() {
  try {
    const empId = readlineSync.question("Please enter employee id");
    const employee = empInfo.find((employee) => employee.empId === empId);
    if (!employee) {
      console.log("No employee exist");
      return;
    }
    console.log(employee);
  } catch (error) {
    console.log(`something went wrong view details ${error.message}`);
    errorWriting(error);
  }
}

function viewDepartmentDetails() {
  try {
    const empDepartment = readlineSync.question(
      "Please enter employee department"
    );
    let count = 0;
    empInfo.forEach((employee) => {
      if (employee.empDepartment === empDepartment) {
        console.log(employee);
        count++;
      }
    });

    if (count) {
      console.log(
        `number of employees in ${empDepartment} department" , ${count}`
      );
    }
    console.log(`No employees under ${empDepartment} department`);
  } catch (error) {
    console.log(
      `something went wrong view department details ${error.message}`
    );
    errorWriting(error);
  }
}

function exitFromSession() {
  const endTime = new Date().getMinutes();
  const totalTime = Math.floor(endTime - startTime);
  console.log(`Your session duration: ${totalTime} minutes.`);
  showOptions();
}
