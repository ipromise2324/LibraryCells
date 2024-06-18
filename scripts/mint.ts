import { compile, NetworkProvider } from '@ton/blueprint';
import {
    addressToString,
    jettonWalletCodeFromLibrary,
    promptAddress,
    promptAmount,
    promptBool,
    promptUserFriendlyAddress,
} from '../wrappers/ui-utils';
import { checkJettonMinter } from './JettonMinterChecker';
import { fromUnits } from './units';
import { JettonMinter } from '../wrappers/JettonMinter';
import { Address } from '@ton/core';

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';

    const ui = provider.ui();

    const jettonMinterCode = await compile('JettonMinter');
    const jettonWalletCodeRaw = await compile('JettonWallet');
    const jettonWalletCode = jettonWalletCodeFromLibrary(jettonWalletCodeRaw);

    const jettonMasterAddress = await promptAddress('Enter the JettonMaster address: ', provider.ui());

    try {

        const jettonMinterContract = provider.open(JettonMinter.createFromAddress(jettonMasterAddress));
        const decimals = 9;

        const amount = await promptAmount('Enter jetton amount to mint', decimals, ui);

        const destinationAddress = await promptUserFriendlyAddress(
            'Enter destination user address to mint',
            ui,
            isTestnet,
        );

        if (
            !(await promptBool(
                `Mint ${fromUnits(amount, decimals)} to ${addressToString(destinationAddress)}?`,
                ['yes', 'no'],
                ui,
            ))
        ) {
            return;
        }

        await jettonMinterContract.sendMint(provider.sender(), destinationAddress.address, amount);

        ui.write('Transaction sent');
    } catch (e: any) {
        ui.write(e.message);
        return;
    }
}
