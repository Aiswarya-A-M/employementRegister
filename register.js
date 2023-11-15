import readlineSync from "readline-sync";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

const DBPath = "./DB.json";
const errorFilePath = "./error.txt";

console.log("welcome");
let startTime = new Date().getMinutes();
showOptions();

function showOptions() {
  console.log("1. Create new employee");
  console.log("2. Update employee record");
  console.log("3. Delete employee");
  console.log("4.Display employees by department");
  console.log("5.Display employee by employee id");
  console.log("6.exit");
  const option = readlineSync.question("choose option");
  performFunctions(option);
}

function performFunctions(option) {
  switch (option) {
    case "1":
      addData();
      break;
    case "2":
      updateData();
      break;
    case "3":
      deleteDetails();
      break;
    case "4":
      viewDetails();
      break;
    case "5":
      viewDepartmentDetails();
      break;
    case "6":
      exitFromSession();
      break;

    default:
      showOptions();
  }
}

function addData() {
  try {
    const empName = readlineSync.question("Please enter your name");
    const empDOB = readlineSync.question(
      "Please enter your date of birth dd/mm/yyyy"
    );
    const empDepartment = readlineSync.question("Please enter your department");
    const age = findAge(empDOB);
    const details = {
      empId: uuidv4(),
      empName: empName,
      empDOB: empDOB,
      empDepartment: empDepartment,
      empAge: age,
    };
    const empInfo = takeDetails();
    const employeeIndex = empInfo.findIndex(
      (obj) => obj.empName === details.empName
    );

    if (employeeIndex !== -1) {
      console.log("empName Exist");
    } else {
      empInfo.push(details);
      addToDB(empInfo);
      console.log("Employee details added successfully");
    }
  } catch (error) {
    console.log(`something went wrong taking details from DB ${error.message}`);
    errorWriting(error);
  }
}

function findAge(dob) {
  const dobArray = dob.split("/");
  const birthDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
}

function takeDetails() {
  try {
    const data = fs.readFileSync(DBPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`something went wrong taking details from DB ${error.message}`);
    errorWriting(error);
  }
}

function addToDB(empInfo) {
  try {
    fs.writeFileSync(DBPath, JSON.stringify(empInfo));
  } catch {
    errorWriting(error);
    console.log(`error occurred while adding details to DB-${error.message}`);
  }
}

function errorWriting(error) {
  let today = new Date();
  today.setTime(today.getTime());
  let currentTime = today.toUTCString();
  let errorDetails = `${error.message}----time:${currentTime}\n`;
  fs.appendFileSync(errorFilePath, errorDetails);
}

function updateData() {
  try {
    const empId = readlineSync.question("Please enter employee id");
    const empInfo = takeDetails();
    const updatedEmployee = empInfo.find(
      (employee) => employee.empId === empId
    );

    if (updatedEmployee) {
      const updatedName = readlineSync.question(
        `please enter name  ${updatedEmployee.empName}: `
      );
      const updatedDOB = readlineSync.question(
        ` please enter DOB in dd/mm/yyyy format ${updatedEmployee.empDOB}: `
      );
      const updatedDepartment = readlineSync.question(
        ` please enter department ${updatedEmployee.empDepartment}: `
      );
      const age = findAge(updatedDOB);
      updatedEmployee.empAge = age;
      updatedEmployee.empName = updatedName;
      updatedEmployee.empDOB = updatedDOB;
      updatedEmployee.empDepartment = updatedDepartment;
      addToDB(empInfo);
      console.log("Employee details updated successfully");
    }
  } catch (error) {
    console.log(`something went wrong updating details ${error.message}`);
    errorWriting(error);
  }
}

function deleteDetails() {
  try {
    const empId = readlineSync.question("Please enter employee id");
    const empInfo = takeDetails();
    const employeeIndex = empInfo.findIndex(
      (employee) => employee.empId === empId
    );
    empInfo.splice(employeeIndex, 1);
    addToDB(empInfo);
    console.log("delete employee successfully");
  } catch (error) {
    console.log(`something went wrong deleting details ${error.message}`);
    errorWriting(error);
  }
}

function viewDetails() {
  try {
    const empId = readlineSync.question("Please enter employee id");
    const empInfo = takeDetails();
    const employee = empInfo.find((employee) => employee.empId === empId);
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
    const empInfo = takeDetails();
    let count = 0;
    empInfo.forEach((employee) => {
      if (employee.empDepartment === empDepartment) {
        console.log(employee);
        count++;
      }
    });
    console.log("no of employees in this department", count);
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
