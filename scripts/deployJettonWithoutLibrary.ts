import { toNano } from '@ton/core';
import { JettonMinter } from '../wrappers/JettonMinter';
import { compile, NetworkProvider } from '@ton/blueprint';
import { promptUserFriendlyAddress } from '../wrappers/ui-utils';
import { buildJettonContent } from '../utils/jetton';
import { JettonWallet } from '../wrappers/JettonWallet';

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';

    const ui = provider.ui();

    const adminAddress = await promptUserFriendlyAddress(
        'Enter the address of the jetton owner (admin):',
        ui,
        isTestnet,
    );
    // prompt user for jetton details
    const name = await provider.ui().input('Please enter the name of the jetton:'); // prettier-ignore
    const symbol = await provider.ui().input('Please enter the symbol of the jetton:'); // prettier-ignore
    const description =  await provider.ui().input('Please enter the description of the jetton:'); // prettier-ignore
    const image = await provider.ui().input('Please enter the image url of the jetton:'); // prettier-ignore
    const decimals = '9';
    const jettonContent = buildJettonContent({
        symbol: symbol,
        name: name,
        description: description,
        image: image,
        decimals: decimals,
    });

    const jettonWalletCode = await compile(JettonWallet.name);

    const minter = provider.open(
        JettonMinter.createFromConfig(
            {
                admin: adminAddress.address,
                wallet_code: jettonWalletCode,
                jetton_content: jettonContent,
            },
            await compile('JettonMinter'),
        ),
    );

    await minter.sendDeploy(provider.sender(), toNano('1.5')); // send 1.5 TON
}
