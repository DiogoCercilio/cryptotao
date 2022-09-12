import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from '../wallet.service';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an error when don\'t receive a wallet address', () => {
    try {
      expect(controller.findAll(null)).rejects.toThrow(BadRequestException);
      expect(true).toBe(false) // In case not throwing an error
    } catch (err) {
      expect(err.message).toBe("Wallet Address is mandatory");
    }
  });

  it('should throw an error when receive wrong wallet address params', () => {
    expect(controller.findAll('aaaaa')).rejects.toThrowError(BadRequestException);
    expect(controller.findAll('aaaaa')).rejects.toThrow("Can't resolve provided name into valid Solana address =(");
  });
});