import { BadRequestException, Injectable } from '@nestjs/common';

import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from '@nfteyez/sol-rayz';
import { NFTResponse } from './rest/entities/wallet.entity';

@Injectable()
export class WalletService {
  /**
   * Returns all NFTs for a given Wallet
   * @param address The User Wallet Address
   * @returns
   */
  async findAll(address): Promise<NFTResponse> {
    if (typeof address !== 'string') {
      throw new BadRequestException(
        'Wallet Address should be a valid Hash (string)',
      );
    }

    const publicAddress = await resolveToWalletAddress({ text: address }).catch(
      (err) => {
        throw new BadRequestException(
          `Error resolving to Wallet Address: ${err.message}`,
        );
      },
    );

    const nftArray = await getParsedNftAccountsByOwner({ publicAddress }).catch(
      (err) => {
        throw new BadRequestException(
          `Error getting parsed NFT: ${err.message}`,
        );
      },
    );

    return {
      publicAddress,
      nftArray,
    };
  }
}
