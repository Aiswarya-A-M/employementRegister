import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import detailsCheck from "./detailsCheck.js";

export default async function viewDepartmentDetails(info) {
    detailsCheck();
    try {
      const empData = await inquirer.prompt([
       {
          type: "input",
          name: "empDepartment",
          message: "Please Enter department name",
        },
      ]);
      let count=0;
      info.forEach((element) => {
      if (element.empDepartment === empData.empDepartment) {
        console.log(element)
        count++;
      }
      
    });
    console.log("no of employees in this department",count);
    } catch (error) {
      console.log("something went wrong!", error);
    }
  }
  

queryDB(viewDepartmentDetails);