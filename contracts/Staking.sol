// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Staking {
    string public name = "Staking Token";
    string public symbol = "STK";
    uint256 public totalSupply;
    uint256 public rewardRate = 100; // Reward rate per second (example value)

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakeTimestamp;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Stake(address indexed from, uint256 value);
    event Unstake(address indexed from, uint256 value);
    event RewardClaimed(address indexed user, uint256 reward);

    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function stake(uint256 _amount) external {
        require(balanceOf[msg.sender] >= _amount, "Insufficient balance");

        balanceOf[msg.sender] -= _amount;
        stakedBalance[msg.sender] += _amount;
        stakeTimestamp[msg.sender] = block.timestamp;
        emit Stake(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external {
        require(stakedBalance[msg.sender] >= _amount, "Insufficient staked balance");

        claimRewards(); // Claim any pending rewards before unstaking

        stakedBalance[msg.sender] -= _amount;
        balanceOf[msg.sender] += _amount;
        emit Unstake(msg.sender, _amount);
    }

    function calculateRewards(address _user) public view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakeTimestamp[_user];
        return stakedBalance[_user] * stakingDuration * rewardRate;
    }

    function claimRewards() public {
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");

        balanceOf[msg.sender] += rewards;
        emit RewardClaimed(msg.sender, rewards);

        stakeTimestamp[msg.sender] = block.timestamp; // Update stake timestamp
    }
}
