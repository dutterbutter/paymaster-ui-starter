# Greeter Frontend

This is a frontend application for the Greeter contract, built with [Next.js](https://nextjs.org/) and deployed on the zkSync Testnet.

## Getting Started

To get started with the project, first clone the repository:

```
git clone https://github.com/dutterbutter/nft-paymaster
```

Next, navigate to the `apps/greeter-frontend` directory and install the required dependencies:

```
cd apps/greeter-frontend && yarn install
```

## Running the Application

To run the application, use the following command:

```
yarn dev
```

This will start the Next.js server on `localhost:3000`.

## Updating the Greeting

To change the greeting message, navigate to `localhost:3000` in your web browser. Make sure you have MetaMask set up for the zkSync Testnet.

If you possess one of the six Infinity Stones from the [InfinityStone contract](https://goerli.explorer.zksync.io/address/0x7CDBF2F07F4204Be589888bD480f3761AAE00061), then the transaction fees will be covered by the Stark Industries paymaster.

Enter a new greeting message and submit it by clicking the "Change greeting" button.

Note that the application is currently only deployed on the zkSync Testnet, so you will need to have an account on that network and some testnet funds to use it.

## Contributing

If you would like to contribute to the project, please follow the steps below:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them
4. Push your changes to your fork
5. Submit a pull request to the main repository
