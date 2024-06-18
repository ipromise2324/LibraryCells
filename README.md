# How to Use Library Cell on TON
We used the Jetton Wallet Code as a demonstration for this Library Cell Repo.

## How to Use

### Build

Run the following command to build the project:

```bash
yarn dev
```

### Deploy Library

To deploy the library, run the `deployLibrary.ts` script:

```bash
yarn start deployLibrary
```

I have already deployed the [Library](kf-hW2frZJ4tbeI6PfPQ5Fs4bXPsio2eiZVXLjq6DaqUWirA) for the Jetton Wallet Code in this repository, so you might not need to deploy the Library yourself. However, if you want to try deploying it, you can make slight adjustments to `jetton-wallet.fc` or `librarian.func`.

### Deploy Jetton Master with Jetton Code in Library

To deploy the Jetton Master with the Jetton Code in the Library, run the `deployJettonWithLibrary.ts` script:

```bash
yarn start deployJettonWithLibrary
```

Fill in the relevant fields for the Jetton Master, and the deployment will be completed. After deployment, you can mint jettons for yourself by running the `mint.ts` script:

```bash
yarn start mint
```

Once minted, you can check the related transactions on tonviewer.

### Deploy Jetton Master without Jetton Code in Library

To deploy the Jetton Master without the Jetton Code in the Library, run the `deployJettonWithoutLibrary.ts` script:

```bash
yarn start deployJettonWithoutLibrary
```

Fill in the relevant fields for the Jetton Master, and the deployment will be completed. After deployment, you can mint jettons for yourself by running the `mint.ts` script:

```bash
yarn start mint
```

Once minted, you can check the related transactions on tonviewer.

For comparing Jetton Transfers, after minting and receiving jettons, you can transfer them to other addresses using your wallet and check the related gas information.

## Jetton Mint Comparison

|                                                                                                                               | Total Fee   | Fwd. Fee    |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------- |
| [With Library](https://testnet.tonviewer.com/transaction/d2780885a17e806813821e11ac02ab971eb9133ac6616df2e3a946dac14fbf71)    | 0.003821645 | 0.000955200 |
| [Without Library](https://testnet.tonviewer.com/transaction/abfcc5c8e9728e07249718f1a8208e482636c8628ccb56ee524b0bc1505b2c78) | 0.004827112 | 0.003971600 |

We can observe that when using Library Cell, the forwarding fee (Fwd. fee) for Mint is indeed reduced by more than 3 times, as mentioned in the TON documentation, with our measurement showing a reduction of 4 times. The total fee (Total Fee) is also reduced by 0.001 TON.

## Jetton Transfer Comparison

|                                                                                                                               | Total Fee   | Fwd. Fee    |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------- | ----------- |
| [With Library](https://testnet.tonviewer.com/transaction/39c77d834d732dc4eef7b82314e25f4868d12bef48e82768afc0ba88ef1abe9e)    | 0.003995100 | 0.001210400 |
| [Without Library](https://testnet.tonviewer.com/transaction/2c542fe5cafaaf4bcfda4ec2629de276341074d0ef9c26dbe21a9040fa9d1d37) | 0.004956674 | 0.004226800 |

We can observe that when using Library Cell, the forwarding fee (Fwd. fee) for Jetton Transfer is indeed reduced by more than 3 times, as mentioned in the TON documentation, with our measurement showing a reduction of approximately 3.4 times. The total fee (Total Fee) is also reduced by 0.001 TON.

From these experimental results, we can conclude that using Library Cell indeed reduces gas fees.
