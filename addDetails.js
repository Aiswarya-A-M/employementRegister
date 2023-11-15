let startTime=new Date();
import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
  try {
    const empDetails = await inquirer.prompt([
      { type: "input", name: "empName", message: "Please enter your name" },
      {
        type: "datepicker",
        name: "empDOB",
        message: "Please enter your date of birth",
      },
      {
        type: "input",
        name: "empDepartment",
        message: "Please enter your department",
      },
    ]);
    let age=findAge(empDetails.empDOB);
    const details = {
      empId: uuidv4(),
      empName: empDetails.empName,
      empDOB: empDetails.empDOB,
      empDepartment: empDetails.empDepartment,
      empAge:age,
    };
    const employeeIndex = info.find((obj) => obj.empName === details.empName);
    if(employeeIndex!==-1){
      console.log("empName Exist")
    }
    info.push(details);
    if (fs.existsSync("details.json")) {
      addDetails(info);
    } else {
      fs.appendFile("details.json", "[]", function (error) {
        if (error) {
          errorWriting("creating file unsuccessful");
          console.log("creating file unsuccessful");
        }
        console.log("file created successfully");
        addDetails(info);
      });
    }
  } catch (error) {
    errorWriting("something went wrong");
    console.log("something went wrong", error);
  }
}

async function addDetails(info) {
  await fs.writeFile("details.json", JSON.stringify(info), function (error) {
    if (error) {
      errorWriting("error writing to the details.json");
      console.log("error writing to the details.json");
    }
    let endTime=new Date()
    timeDifferenceAdd(endTime, startTime)
    console.log("Data added successfully");
  });
}
function errorWriting(errorStr){
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

function timeDifferenceAdd(endTime, startTime) {
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
function findAge(dob){
  const dobArray=dob.split('/');
  const birthDate=new Date(dobArray[2],dobArray[1]-1,dobArray[0]);
  const currentDate=new Date();
  const age=currentDate.getFullYear()-birthDate.getFullYear();
  return age;
}

queryDB(addData);
