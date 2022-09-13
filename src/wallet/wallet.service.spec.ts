import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  // Third party Mocked Functions injected
  const resolveToWalletAddress = (val) => Promise.resolve(val.text);
  const getParsedNftAccountsByOwner = () => Promise.resolve([]);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should throw an error when getting NFTs passing wrong wallet Address', async () => {
      expect(service.findAll('invalid')).rejects.toThrowError(
        BadRequestException,
      );
    });

    it('should return NFTs successfully when receive a valid wallet', async () => {
      const nfts = await service.findAll(
        'valid-mocked',
        resolveToWalletAddress,
        getParsedNftAccountsByOwner,
      );
      expect(Object.keys(nfts)).toHaveLength(2);
      expect(nfts.publicAddress).toBe('valid-mocked');
      expect(nfts.nftArray).toBeInstanceOf(Array);
      expect(nfts.nftArray).toHaveLength(0);
    });
  });
});
