<!DOCTYPE html>
<html lang="en">
    <h1>Blockchain Voting System</h1>
    <h2>Overview</h2>
    <p>This project is a decentralized voting system built on the Ethereum blockchain using smart contracts. It ensures secure, transparent, and tamper-proof voting.</p>

   <h2>Prerequisites</h2>
    <ul>
        <li>MetaMask extension on your browser</li>
        <li>Connected to the Sepolia test network</li>
        <li>Remix IDE for smart contract deployment</li>
    </ul>

   <h2>Setup Instructions</h2>
    <ol>
        <li>Clone the repository:<br><code>git clone https://github.com/your-username/repository-name.git</code></li>
        <li>Navigate to the project directory:<br><code>cd repository-name</code></li>
        <li>Install dependencies:<br><code>npm install</code></li>
        <li>Start the development server:<br><code>npm start</code></li>
    </ol>

   <h2>Common Issues & Troubleshooting</h2>
    <ul>
        <li><span class="important">Transaction Reverted Without Reason Error:</span> Ensure the timer is active when making donations. If expired, the transaction will fail.</li>
        <li>Check MetaMask is connected to the correct network (Sepolia).</li>
        <li>Ensure sufficient test ETH balance in MetaMask.</li>
        <li>Clear browser cache if MetaMask fails to connect.</li>
    </ul>

   <h2>Prevention Tips</h2>
    <ul>
        <li>Always check the contract timer before initiating transactions.</li>
        <li>Confirm gas fees and adjust gas limits if required.</li>
        <li>Verify the deployed contract address to avoid incorrect transactions.</li>
    </ul>

  <h2>Deployment Guide</h2>
    <ol>
        <li>Deploy the smart contract on Remix IDE connected to Sepolia network.</li>
        <li>Update the frontend with the deployed contract address.</li>
        <li>Push the code to GitHub:<br><code>git add .</code><br><code>git commit -m "Initial Commit"</code><br><code>git push origin main</code></li>
        <li>Enable GitHub Pages under repository settings for frontend hosting.</li>
    </ol>

   <h2>Best Practices</h2>
    <ul>
        <li>Test the contract thoroughly on the Sepolia testnet before mainnet deployment.</li>
        <li>Handle exceptions and errors gracefully in the frontend.</li>
        <li>Regularly update dependencies to avoid security vulnerabilities.</li>
    </ul>

  <h2>Contributing</h2>
    <p>Feel free to fork the repository, make improvements, and create pull requests. Contributions are welcome!</p>

  <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>
</body>
</html>
