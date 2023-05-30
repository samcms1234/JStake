// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const path = require('path');
const { readJsonSync } = require('fs-extra');
const fs = require("fs");
const fse = require("fs-extra");
require('dotenv').config();

async function main() {
  
  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(100000000);

  staking.deployed();

  console.log(`Contract deployed at address: ${staking.address}`);
  console.log(`Contract deployed at: ${hre.network.name}`);

  if (fs.existsSync("./src")) {
    fs.rmSync("./src/artifacts", { recursive: true, force: true });
    fse.copySync("./artifacts/contracts/Staking.sol/", "./src/artifacts");
    fs.writeFileSync(
      "./src/utils/contracts-config.js",
      `
      export const contractAddress = "${staking.address}"
      export const ownerAddress = "${staking.signer.address}"
      export const networkDeployedTo = "${hre.network.config.chainId}"
    `
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });