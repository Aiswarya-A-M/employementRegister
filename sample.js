import readlineSync from "readline-sync";
import addData from "./addDetails.js";
import updateData from "./updateDetails.js";
import deleteDetails from "./deleteDetails.js";
import viewDetails from "./viewDetails.js";
import viewDepartmentDetails from "./viewDepartmentDetails.js";


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
    case "6":
      exitFromSession()

    default:
      performFunctions();
  }
}
function exitFromSession(){
  console.log("Your session duration is 20 minute");
  
}