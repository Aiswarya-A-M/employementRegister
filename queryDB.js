import { error } from "console";
import fs from "fs";

export default async function queryDB(externalFunction) {
  try {
    let info = [];
    if (fs.existsSync("details.json")) {
      await fs.readFile("details.json", function (error, data) {
        if (error) {
          console.log("Reading File Failed", error);
          return;
        }

        info = JSON.parse(data.toString());
        if (externalFunction && !error) {
          externalFunction(info);
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction(info);
        return; //no file data added
      }
    }
  } catch {
    console.log("something went wrong", error);
  }
}
