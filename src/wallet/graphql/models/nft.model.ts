import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NFTItemData {
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  symbol: string;
  @Field((type) => String)
  uri: string;
  @Field((type) => Number)
  sellerFeeBasisPoints: number;
  @Field((type) => [NFTItemDataCreator])
  creators: NFTItemDataCreator[];
}

@ObjectType()
export class NFTItem {
  @Field((type) => Number)
  key: number;
  @Field((type) => String)
  updateAuthority: string;
  @Field((type) => String)
  mint: string;
  @Field((type) => NFTItemData)
  data: NFTItemData;
  @Field((type) => Boolean)
  primarySaleHappened: boolean;
  @Field((type) => Boolean)
  isMutable: boolean;
  @Field((type) => Number, { nullable: true })
  editionNonce: number;
}

@ObjectType()
export class NFTItemDataCreator {
  @Field((type) => String)
  address: string;
  @Field((type) => Number)
  verified: number;
  @Field((type) => Number)
  share: number;
}

@ObjectType()
export class NFTResponse {
  @Field((type) => String)
  publicAddress: string;
  @Field((type) => NFTItem)
  nftArray: [NFTItem];
}
