import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import detailsCheck from "./detailsCheck.js";

export default async function viewDetails(info) {
    detailsCheck();
    try {
      const empData = await inquirer.prompt([
       {
          type: "input",
          name: "empId",
          message: "Please Enter your Id",
        },
      ]);
      info.forEach((element) => {
      if (element.empId === empData.empId) {
        console.log(element)
      }
    });
    } catch (error) {
      console.log("something went wrong!", error);
    }
  }
  

queryDB(viewDetails);