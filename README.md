# Web3 Client Application for Celo Blockchain Integration

A client-server JavaScript web application developed to simulate the login action, generate signed signatures, and test the integration of Payment Provider API and cryptocurrency exchange API. The application is built on the Celo blockchain using ethersjs and siwe dependecies, and implements [Sign-In with Ethereum (SIWE)](https://docs.login.xyz/general-information/siwe-overview).

## Features

- Simulate user login action.
- Generate a signed signature for secure interactions.
- Test integration with Payment Provider API for on/off ramp.
- Integrate with a local cryptocurrency exchange API for local market coverage.

## Prerequisites

- Node.js and npm installed.
- Familiarity with Web3 and blockchain concepts.
- Local cryptocurrency exchange API credentials.

## Getting Started

1. **Clone this repository:**

```bash
git clone https://github.com/Lillian26/fiat-connect_client.git
```
   
2. **Install dependencies:** (both in the frontend and backend folders)

```bash
cd fiat-connect_client/frontend
npm start
```

3. **Configure the application:**

Set up your API credentials in .env using the .envexample.

4. **Run both the backend and frontend applications:**

```bash
cd fiat-connect_client/frontend
npm start
```
```bash
cd fiat-connect_client/backend
node src/index.js
```

## Usage

Open the frontend link in the browser connect to metamask(or any other web3 wallet) to login.
Copy the generated signed signature to be used to secure other transactions in tools like postman.

## Contributing
Contributions are welcome! Please feel free to fork and submit pull requests.

## License
This project is licensed under the MIT License - see the [![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[License File](./LICENSE) file for details.
