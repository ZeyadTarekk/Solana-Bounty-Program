import type { Wallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';
import React from 'react';

export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
    return wallet && <Image src={wallet.adapter.icon} alt={`${wallet.adapter.name} icon`} />;
};
