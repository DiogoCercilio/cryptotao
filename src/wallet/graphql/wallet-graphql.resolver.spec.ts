import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '../wallet.service';
import { WalletGraphqlResolver } from './wallet-graphql.resolver';

describe.only('WalletGraphqlResolver', () => {
  let resolver: WalletGraphqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletGraphqlResolver,
        {
          provide: WalletService,
          useFactory: () => ({
            findAll: jest.fn(() => {
              return [
                {
                  data: {
                    nft: {
                      publicAddress:
                        'H2x683jpLQMgCKWkiRkkTd3HuMQTgNeW5yAyWsLQYq8a',
                      nftArray: [
                        {
                          key: 4,
                          updateAuthority:
                            '3dDUp173Fo6wc3XcH4qfjnSebHVj6zscJsCMt9nr5QnF',
                          mint: '34U2xBGV5Ue17zzGxYV2t5gAjnqsDqgBD4FGExdeARPh',
                          data: {
                            name: '3 Outlier Birdz',
                          },
                          primarySaleHappened: false,
                          isMutable: true,
                          editionNonce: null,
                        },
                      ],
                    },
                  },
                },
              ];
            }),
          }),
        },
      ],
    }).compile();

    resolver = module.get<WalletGraphqlResolver>(WalletGraphqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Get NFTs', () => {
    it.only('should get the NFT array', async () => {
      expect(
        await resolver.nft('H2x683jpLQMgCKWkiRkkTd3HuMQTgNeW5yAyWsLQYq8a'),
      ).toEqual([
        {
          data: {
            nft: {
              publicAddress: 'H2x683jpLQMgCKWkiRkkTd3HuMQTgNeW5yAyWsLQYq8a',
              nftArray: [
                {
                  key: 4,
                  updateAuthority:
                    '3dDUp173Fo6wc3XcH4qfjnSebHVj6zscJsCMt9nr5QnF',
                  mint: '34U2xBGV5Ue17zzGxYV2t5gAjnqsDqgBD4FGExdeARPh',
                  data: {
                    name: '3 Outlier Birdz',
                  },
                  primarySaleHappened: false,
                  isMutable: true,
                  editionNonce: null,
                },
              ],
            },
          },
        },
      ]);
    });
  });
});
