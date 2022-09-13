import { BadRequestException, Injectable } from '@nestjs/common';

import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from '@nfteyez/sol-rayz';
import { NFTItem, NFTResponse } from './rest/entities/wallet.entity';

@Injectable()
export class WalletService {
  /**
   * Returns all NFTs for a given Wallet
   * @param address The User Wallet Address
   * @returns
   */
  async findAll(
    address: string,
    resolveToWalletAddressFn: (
      options: any,
    ) => Promise<string> = resolveToWalletAddress,
    getParsedNftAccountsByOwnerFn: (
      options: any,
    ) => Promise<NFTItem[]> = getParsedNftAccountsByOwner,
  ): Promise<NFTResponse> {
    if (typeof address !== 'string') {
      throw new BadRequestException(
        'Wallet Address should be a valid Hash (string)',
      );
    }

    const publicAddress = await resolveToWalletAddressFn({
      text: address,
    }).catch((err) => {
      throw new BadRequestException(
        `Error resolving to Wallet Address: ${err.message}`,
      );
    });

    const nftArray = await getParsedNftAccountsByOwnerFn({
      publicAddress,
    }).catch((err) => {
      throw new BadRequestException(`Error getting parsed NFT: ${err.message}`);
    });

    return {
      publicAddress,
      nftArray,
    };
  }
}
