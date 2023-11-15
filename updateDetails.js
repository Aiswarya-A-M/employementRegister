let startTime=new Date();
import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import detailsCheck from "./detailsCheck.js";
import { findAge } from "./addDetails.js";

export default async function updateData(info) {
  detailsCheck();

  try {
    const empData = await inquirer.prompt([
      {
        type: "input",
        name: "empId",
        message: "Please Enter your Id",
      },
    ]);
    let employee;
    info.forEach((element) => {
      if (element.empId === empData.empId) {
        employee = element;
        updateDetails(employee, info);
      }
    });
  } catch (error) {
    updatingError("something went wrong")
    console.log("something went wrong!", error);
  }
}

async function updateDetails(employee, info) {
  try {
    const updatedData = await inquirer.prompt([
      {
        type: "input",
        name: "empName",
        default: employee.empName,
        message: "Please enter your name",
      },
      {
        type: "datepicker",
        name: "empDOB",
        default: employee.empDOB,
        message: "Please enter your date of birth",
      },
      {
        type: "input",
        name: "empDepartment",
        default: employee.empDepartment,
        message: "Please enter your department",
      },
    ]);
    let age=findAge(empDetails.empDOB);
    employee.empName = updatedData.empName;
    employee.empDOB = updatedData.empDOB;
    employee.empDepartment = updatedData.empDepartment;
    employee.age=age;

    await fs.writeFile("details.json", JSON.stringify(info), function (error) {
      if (error) {
        updatingError("updating error")
        console.log("updating error");
      }
      let endTime=new Date()
      timeDifference(endTime, startTime)
      console.log("details updated successfully");

      
    });
  } catch (error) {
    updatingError("something went wrong")
    console.log("something went wrong", error);
  }
}

function updatingError(errorStr){
  let today = new Date();
  today.setTime(today.getTime())
  let currentTime=today.toUTCString();
  let errorDetails =`${errorStr},time:${currentTime}`
  fs.appendFile("error.txt", errorDetails, function (error) {
    if (error) {
      console.log("error writing to the error.txt");
    }
  });
}

function timeDifference(endTime, startTime) {
    let difference = endTime.getTime() - startTime.getTime();
    let daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24
    let hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60
    let minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60
    let secondsDifference = Math.floor(difference/1000);
    console.log(`your session duration is,${secondsDifference}S`);
}

// function age(dob){
//   const dobArray=dob.split('/');
//   const birthDate=new Date(dobArray[2],dobArray[1]-1,dobArray[0]);
//   const currentDate=new Date();
//   const age=currentDate.getFullYear()-birthDate.getFullYear();
//   return age;
// }

queryDB(updateData);
