# JStake: The control is with YOU!

This is a simple web application that interacts with a Staking Contract on the Ethereum blockchain. The application allows users to stake tokens, unstake tokens, claim rewards, and transfer tokens to other accounts.

## Features

- Stake tokens: Users can stake their tokens into the staking contract and earn rewards.
- Unstake tokens: Users can unstake their tokens from the staking contract.
- Claim rewards: Users can claim their earned rewards from the staking contract.
- Transfer tokens: Users can transfer tokens from their account to another account.

## Technologies Used

- React: JavaScript library for building the user interface.
- ethers.js: Library for interacting with the Ethereum blockchain.
- Web3: Library for interacting with the Ethereum provider (e.g., MetaMask).
- Hardhat: Development environment for Ethereum smart contracts.
- Solidity: Programming language for writing smart contracts.
- React Toastify: Library for displaying notifications in the web application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Solidity
- Javascript
- Node.js
- Hardhat
- Git

### Installing

1. Clone the repository to your local machine

```shell
git clone https://github.com/samcms1234/JStake.git
```

2. Install the dependencies

```shell
cd JStake
```
```shell
npm install
```

3. Compile and deploy the contracts

```shell
npx hardhat node
```

```shell
npx hardhat run scripts/deploy.js --network localhost
```

4. Run the tests

```shell
npx hardhat test
```

5. Start the application

```shell
npm run start
```

6. Open the application in your browser

```shell
http://localhost:3000
```

## Frontend Integration

The integration with the Ethereum blockchain is achieved through the use of ethers.js and Web3 libraries. ethers.js allows us to interact with the Ethereum blockchain by providing functionalities such as connecting to a provider, signing transactions, and interacting with smart contracts. Web3 library facilitates communication with the Ethereum provider (e.g., MetaMask) and allows the application to interact with the user's Ethereum account.

The frontend makes use of the Staking Contract's address and ABI (Application Binary Interface) to interact with the deployed contract. The contract address and ABI should be updated in the artifacts/contracts/StakingContract.sol/StakingContract.json file with the correct values for your deployed contract.

The React Toastify library is used for displaying notifications to provide users with feedback on staking, unstaking, rewards claiming, and token transfers. It offers a simple and customizable way to show success or error messages to the users.

By combining these technologies and libraries, the frontend of the Staking Contract Web Application enables users to easily stake tokens, unstake tokens, claim rewards, and transfer tokens, all while providing a smooth and intuitive user experience.

Please note that the frontend integration assumes the presence of an Ethereum provider, such as MetaMask, which should be configured to connect to an Ethereum network (local development or testnet) to interact with the deployed Staking Contract.

Contract address:
 ```shell
 0xc25dA80fE6115A9598Ca8A68DB0B479AE0eAbfAF
 ```
### Built With

- Ethereum - Blockchain platform
- Solidity - Smart contract language
- Hardhat - Development framework for Ethereum

### Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, feature requests, or suggestions.

### License

This project is licensed under the MIT License.
