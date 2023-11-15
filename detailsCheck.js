import fs from "fs";
import { exit } from "process";

export default async function detailsCheck() {
  if (!fs.existsSync("details.json")) {
    console.log("file does not exists");
    exit(1);
  }
}
// The status code helps indicate to the operating system whether the process completed successfully (status code 0) or encountered an error (non-zero status code).
