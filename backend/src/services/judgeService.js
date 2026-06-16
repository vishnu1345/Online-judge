const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { type } = require("os");

// const compileCpp = (filePath, executablePath) => {
//   return new Promise((resolve, reject) => {
//     const compileCommand = `g++ "${filePath}" -o "${executablePath}"`;

//     exec(compileCommand, (error, _, stderr) => {
//       if (error) {
//         return reject(stderr);
//       }

//       resolve();
//     });
//   });
// };

// const executeCpp = (executablePath, inputFilePath) => {
//   return new Promise((resolve, reject) => {
//     const runCommand = `"${executablePath}" < "${inputFilePath}"`;

//     exec(runCommand, { timeout: 2000 }, (error, stdout, stderr) => {
//       if (error) {
//         if (error.killed || error.signal === "SIGTERM") {
//           return reject("TIME_LIMIT_EXCEEDED");
//         }

//         return reject(stderr);
//       }

//       resolve(stdout.trim());
//     });
//   });
// };

const dockerExecute = (submissionDir) => {
  return new Promise((resolve, reject) => {
    const dockerCommand = `
        docker run --rm \
        --network none \
        --memory 256m \
        --cpus 1 \
        --pids-limit 50 \
        -v "${submissionDir}":/app \
        cpp-runner \
        sh -c "g++ main.cpp -o main && timeout 2s ./main < input.txt"
        `;

    exec(dockerCommand, { timeout: 3000 }, (error, stdout, stderr) => {
      if (error) {
        // Compilation error
        if (stderr.includes("error:")) {
          return reject({
            type: "COMPILATION_ERROR",
            message: stderr,
          });
        }

        // Timeout
       if (error.killed || error.code === 124 || error.signal === "SIGTERM") {
         return reject({
           type: "TIME_LIMIT_EXCEEDED",
         });
       }

        return reject({
          type: "RUNTIME_ERROR",
          message: stderr,
        });
      }

      resolve(stdout.trim());
    });
  });
};

const judgeSubmission = async ({ code, testcases }) => {
  // const filePath = path.join(__dirname, "../submissions/temp/main.cpp");

  // const executablePath = path.join(__dirname, "../submissions/temp/main");

  const inputFilePath = path.join(__dirname, "../submissions/temp/input.txt");

  const submissionDir = path.join(__dirname, "../submissions/temp");
  const filePath = path.join(submissionDir, "main.cpp");

  fs.writeFileSync(filePath, code);

  // try {
  //   await compileCpp(filePath, executablePath);
  // } catch (error) {
  //   return {
  //     verdict: "COMPILATION_ERROR",
  //     error,
  //   };
  // }

  for (const testcase of testcases) {
    fs.writeFileSync(inputFilePath, testcase.input);

    try {
      // const actualOutput = await executeCpp(executablePath, inputFilePath);

      const actualOutput = await dockerExecute(submissionDir);

      if (actualOutput.trim() !== testcase.output.trim()) {
        return {
          verdict: "WRONG_ANSWER",
          expected: testcase.output,
          received: actualOutput,
        };
      }
    } catch (error) {
      if (error.type === "TIME_LIMIT_EXCEEDED") {
        return {
          verdict: "TIME_LIMIT_EXCEEDED",
        };
      }

      if (error.type === "COMPILATION_ERROR") {
        return {
          verdict: "COMPILATION_ERROR",
          error: error.message,
        };
      }
      return {
        verdict: "RUNTIME_ERROR",
        error: error.message,
      };
    }
  }

  return {
    verdict: "ACCEPTED",
  };
};

module.exports = { judgeSubmission };
