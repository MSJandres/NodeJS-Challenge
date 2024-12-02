// Function call to initialize app
init();
import inquirer from "inquirer";
import colors from "colors";
import fs from "fs";
import generateMarkdown from "./utils/generateMarkdown.js";
import { apacheLicense } from "./utils/license-options/apache.js";
import { mitLicense } from "./utils/license-options/MIT.js";
import { mozillaLicense } from "./utils/license-options/Mozilla.js";

// current year for copyright info in generated LICENSE file.
const currentYear = new Date().getFullYear();

// an array of questions to be asked in the command line.
const questions = [
    {
      type: "input",
        message: colors.violet("What is your name?"),
        name: "name",
    },
    {
      type: "input",
        message: colors.violet("What is the title of your project?"),
        name: "title",
    }, 
    {
        type: "input",
        message: colors.violet("What problem does this project solve? Write a few sentences describing your project."),
        name: "description",
    },
    {
        type: "input",
        message: colors.violet("Add the installation instructions of your project."),
        name: "installation",
    },
    {
        type: "input",
        message: colors.violet("Add the usage information of your project."),
        name: "usage",
    },
    {
        type: "list",
        message: "Pick a license:",
        name: "license",
        choices: ["Apache License 2.0", "IBM Public License Version 1.0", "MIT", "Mozilla Public License 2.0", "None"],
    },
    {
        type: "input",
        message: colors.violet("How can others contribute to your project?"),
        name: "contributing"
    },
    {
        type: "input",
        message: colors.violet("Add the test instructions of your project."),
        name: "tests"
    },
    {
        type: "input",
        message: colors.violet("What is your GitHub username?"),
        name: "username"
    },
    {
        type: "input",
        message: colors.violet("What is your email address?"),
        name: "email"
    }
];

// a function to create a new LICENSE.txt file based on the user's license selection.
function createLicenseFileTest(license, username) {
    switch (license) {
        case "Apache License 2.0":
            fs.writeFile(
                "./output/LICENSE.txt",
                apacheLicense(currentYear, username),
                (err) => err ? console.log(err) : console.log(colors.bgYellow("Created new Apache License 2.0 LICENSE file."))
            );
            break;
        case "MIT":
            fs.writeFile(
                "./output/LICENSE.txt", 
                mitLicense(currentYear, username),
                (err) => err ? console.log(err) : console.log(colors.bgBrightYellow('Created new MIT LICENSE file.'))
            );
            break;
        case "Mozilla Public License 2.0":
            fs.writeFile(
                "./output/LICENSE.txt", 
                mozillaLicense(),
                (err) => err ? console.log(err) : console.log(colors.bgBrightGreen('Created new Mozilla Public License 2.0 LICENSE file.'))
            );
            break;
        default:
            console.log(colors.gray("No license file created."));
    }
}

// a function to write the new README file.
function writeToFile(fileName, data) {
    fs.writeFile(
        fileName, 
        generateMarkdown(data), 
        (err) => err ? console.log(err) : console.log('Success!')
    );
}

// a function to initialize the app, using the Inquirer.js package.
function init() {
    inquirer
    .prompt(questions)
    .then((project) => {
        writeToFile("./output/SAMPLE.md", project);
        createLicenseFileTest(project.license, project.username);
    })
}

// call the function to initialize the app.
init();
