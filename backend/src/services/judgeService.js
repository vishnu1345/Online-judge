const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { type } = require('os');

const compileCpp = (filePath, executablePath) => {
  return new Promise((resolve, reject) => {
    const compileCommand = `g++ "${filePath}" -o "${executablePath}"`;

    exec(compileCommand, (error, _, stderr) => {
      if (error) {
        return reject(stderr);
      }

      resolve();
    });
  });
};

const executeCpp = (executablePath, inputFilePath) => {
  return new Promise((resolve, reject) => {
    const runCommand = `"${executablePath}" < "${inputFilePath}"`;

    exec(runCommand, { timeout: 2000 }, (error, stdout, stderr) => {
      if (error) {
        if (error.killed || error.signal === "SIGTERM") {
          return reject("TIME_LIMIT_EXCEEDED");
        }

        return reject(stderr);
      }

      resolve(stdout.trim());
    });
  });
};


const judgeSubmission = async ({
    code,
    testcases
}) => {
    const filePath = path.join(__dirname, "../submissions/temp/main.cpp");

    const executablePath = path.join(__dirname, "../submissions/temp/main");

    const inputFilePath = path.join(__dirname, "../submissions/temp/input.txt");

    fs.writeFileSync(filePath, code);

    try {
      await compileCpp(filePath, executablePath);
    } catch (error) {
      return {
        verdict: "COMPILATION_ERROR",
        error,
      };
    }

    for (const testcase of testcases) {
      fs.writeFileSync(inputFilePath, testcase.input);

      try {
        const actualOutput = await executeCpp(executablePath, inputFilePath);

        if (actualOutput.trim() !== testcase.output.trim()) {
          return {
            verdict: "WRONG_ANSWER",
            expected: testcase.output,
            received: actualOutput,
          };
        }
      } catch (error) {
        if (error === "TIME_LIMIT_EXCEEDED") {
          return {
            verdict: "TIME_LIMIT_EXCEEDED",
          };
        }

        return {
          verdict: "RUNTIME_ERROR",
          error,
        };
      }
    }

    return {
      verdict: "ACCEPTED",
    };
};

module.exports = {judgeSubmission};