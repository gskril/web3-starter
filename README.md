# Web3 Project Template

This is an opinionated monorepo template for web3 projects. It uses Foundry for smart contracts and Vite for the web app.

---

## Contracts

[Foundry](https://book.getfoundry.sh/) is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.

### Usage

Build

```shell
$ forge build
```

Test

```shell
$ forge test
```

Format

```shell
$ forge fmt
```

---

## Web App

A lightweight web app built with Vite and React, using [wagmi](https://wagmi.sh/) for EVM integration.

### Usage

Start the development server

```shell
$ pnpm dev
```

Build the web app for production

```shell
$ pnpm build
```
