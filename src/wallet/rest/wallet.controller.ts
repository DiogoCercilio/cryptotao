import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { WalletService } from '../wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('nft')
  findAll(@Query('walletAddress') walletAddress: string) {
    if(!walletAddress) {
      throw new BadRequestException('Wallet Address is mandatory')
    }
    return this.walletService.findAll(walletAddress);
  }
}
