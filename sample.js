import inquirer from "inquirer";
import readlineSync from "readline-sync";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import addData from "./addDetails.js";

const filePath="details.json"
console.log("welcome");
let startTime = new Date();
performFunctions();
function performFunctions() {
  console.log("1. Create new employee");
  console.log("2. Update employee record");
  console.log("3. Delete employee");
  console.log("4.Display employees by department");
  console.log("5.Display employee by employee id");
  console.log("6.exit");
  const option = readlineSync.question("choose option");
  switch (option) {
    case "1":
      addData();
      break;
    default:
      performFunctions();
  }
}
// function addDetails() {
    // addDetails()
//   try {
//     const name = readlineSync.question("Enter employee name: ");
//     const dob = readlineSync.question("Enter date of birth: dd/mm/yyyy ");
//     const department = readlineSync.question("Enter department: ");
//     let age = findAge(dob);
//     const details = {
//       empId: uuidv4(),
//       empName: name,
//       empDOB: dob,
//       empDepartment: department,
//       empAge: age,
//     };
//     const data=dataFromDB();
//     const employeeIndex = data.find((obj) => obj.empName === details.empName);
//     console.log("data",data);
//     if(employeeIndex!==-1){
//         console.log("empName Exist")
//     }else{
//         data.
//     }
//   } catch {}
// }
// function findAge(dob) {
//   const dobArray = dob.split("/");
//   const birthDate = new Date(dobArray[2], dobArray[1] - 1, dobArray[0]);
//   const currentDate = new Date();
//   const age = currentDate.getFullYear() - birthDate.getFullYear();
//   return age;
// }
// function dataFromDB(){
//     try {
//         let details= fs.readFileSync(filePath, "utf8");
//         return JSON.parse(details);
//       } catch (error) {
//         console.log("something went wrong");
//       }
// }