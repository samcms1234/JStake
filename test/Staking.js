const { expect } = require('chai');
const { Contract, Wallet } = require('ethers');
const { ContractFactory, JsonRpcProvider } = require('ethers');
const { ethers } = require('hardhat');

describe("staking", function () {
  let Staking;
  let staking;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Staking = await ethers.getContractFactory("Staking");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    staking = await Staking.deploy(10000);
    await staking.deployed();
  });

  it("Should stake tokens", async function () {
    await staking.stake(100);
    const stakedBalance = await staking.stakedBalance(owner.address);
    expect(stakedBalance).to.equal(100);
  });

  it("Should unstake tokens", async function () {
    await staking.stake(100);
    await staking.unstake(50);
    const stakedBalance = await staking.stakedBalance(owner.address);
    expect(stakedBalance).to.equal(50);
  });
  
  it("Should not unstake tokens if balance is insufficient", async function () {
    await staking.stake(100);
    await expect(staking.unstake(200)).to.be.revertedWith("Insufficient staked balance");
  });
  
  it("Should not unstake tokens if not staked", async function () {
    await expect(staking.unstake(100)).to.be.revertedWith("Insufficient staked balance");
  });
  
  it("Should calculate rewards as zero if no staking duration", async function () {
    await staking.stake(100);
    const rewards = await staking.calculateRewards(owner.address);
    expect(rewards).to.equal(0);
  });
  
  it("Should not claim rewards if no rewards available", async function () {
    await expect(staking.claimRewards()).to.be.revertedWith("No rewards to claim");
  });

});
