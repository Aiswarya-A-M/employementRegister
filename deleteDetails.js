import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import detailsCheck from "./detailsCheck.js";

export default async function deleteDetails(info) {
  detailsCheck();
  try {
    const empData = await inquirer.prompt([
      {
        type: "input",
        name: "empId",
        message: "Please Enter your Id",
      },
    ]);
    let remainingDetails = [];
    info.forEach((element) => {
      if (element.empId !== empData.empId) {
        remainingDetails.push(element);
      }
    });
    await fs.writeFile(
      "details.json",
      JSON.stringify(remainingDetails),
      function (error) {
        if (error) {
          console.log("error while updating details");
        }
        console.log("record delete successfully");
      }
    );
  } catch (error) {
    console.log("something went wrong", error);
  }
}
queryDB(deleteDetails);
