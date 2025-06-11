// Deployment script for Firebase
const { execSync } = require('child_process');

// Function to execute commands and log output
function runCommand(command) {
  console.log(`\n> ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// Main deployment process
console.log('🔥 Starting deployment process for DMCC Community App...');

try {
  // 1. Build the Next.js project
  console.log('\n📦 Building Next.js application...');
  runCommand('npm run build');

  // 2. Deploy to Firebase
  console.log('\n🚀 Deploying to Firebase...');
  runCommand('firebase deploy');

  console.log('\n✅ Deployment completed successfully!');
  console.log('🌐 Your site is now live at: https://dmcc-community.web.app');
} catch (error) {
  console.error('\n❌ Deployment failed:', error);
  process.exit(1);
}
