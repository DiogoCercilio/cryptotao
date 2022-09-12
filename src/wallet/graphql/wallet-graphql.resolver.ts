import { Resolver, Query, Args } from '@nestjs/graphql';
import { WalletService } from '../wallet.service';
import { WalletResponse } from './models/wallet.model';

@Resolver((of) => WalletResponse)
export class WalletGraphqlResolver {
  constructor(private readonly walletService: WalletService) {}

  @Query((returns) => WalletResponse)
  async nft(@Args('walletAddress') walletAddress: string) {
    return await this.walletService.findAll(walletAddress);
  }
}
