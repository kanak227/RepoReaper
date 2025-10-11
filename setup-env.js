import fs from 'fs';
import readline from 'readline';
import { exec } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const envFile = '.env';
const envExampleFile = '.env.example';

// Check if .env already exists
if (fs.existsSync(envFile)) {
  console.log('\x1b[33m%s\x1b[0m', '.env file already exists. Do you want to overwrite it? (y/n)');
  rl.question('', (answer) => {
    if (answer.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
    createEnvFile();
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  // Read the example file
  fs.readFile(envExampleFile, 'utf8', (err, data) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', `Error reading ${envExampleFile}: ${err.message}`);
      rl.close();
      return;
    }

    // Parse the example file to extract variables
    const lines = data.split('\n');
    const envVars = {};
    const comments = {};
    let currentComment = '';

    lines.forEach(line => {
      if (line.trim() === '' || line.trim().startsWith('#')) {
        // Store comments for later use
        if (line.trim().startsWith('#')) {
          currentComment += line + '\n';
        } else {
          currentComment += '\n';
        }
        return;
      }

      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        envVars[key] = value;
        comments[key] = currentComment;
        currentComment = '';
      }
    });

    // Ask for each variable
    askForVariables(envVars, comments, 0, Object.keys(envVars), {});
  });
}

function askForVariables(envVars, comments, index, keys, answers) {
  if (index >= keys.length) {
    // All variables have been asked for
    writeEnvFile(answers, comments);
    return;
  }

  const key = keys[index];
  const defaultValue = envVars[key];
  const comment = comments[key] || '';

  // Display the comment if it exists
  if (comment) {
    console.log(comment);
  }

  rl.question(`${key} (default: ${defaultValue}): `, (answer) => {
    answers[key] = answer.trim() || defaultValue;
    askForVariables(envVars, comments, index + 1, keys, answers);
  });
}

function writeEnvFile(answers, comments) {
  let content = '';
  
  // Write each variable with its comment
  for (const key in answers) {
    if (comments[key]) {
      content += comments[key];
    }
    content += `${key}=${answers[key]}\n`;
  }

  fs.writeFile(envFile, content, (err) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', `Error writing ${envFile}: ${err.message}`);
      rl.close();
      return;
    }

    console.log('\x1b[32m%s\x1b[0m', `.env file created successfully!`);
    console.log('\x1b[36m%s\x1b[0m', 'Do you want to create a GitHub OAuth App now? (y/n)');
    
    rl.question('', (answer) => {
      if (answer.toLowerCase() === 'y') {
        console.log('\x1b[36m%s\x1b[0m', 'Opening GitHub OAuth App creation page...');
        openGitHubOAuthPage();
      } else {
        console.log('\x1b[36m%s\x1b[0m', 'Remember to create a GitHub OAuth App and update your .env file with the credentials.');
      }
      rl.close();
    });
  });
}

function openGitHubOAuthPage() {
  const url = 'https://github.com/settings/applications/new';
  let command;
  
  switch (process.platform) {
    case 'darwin': // macOS
      command = `open "${url}"`;
      break;
    case 'win32': // Windows
      command = `start "" "${url}"`;
      break;
    default: // Linux and others
      command = `xdg-open "${url}"`;
      break;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error('\x1b[31m%s\x1b[0m', `Failed to open browser: ${error.message}`);
      console.log('\x1b[36m%s\x1b[0m', `Please visit ${url} manually to create your GitHub OAuth App.`);
    }
  });
}