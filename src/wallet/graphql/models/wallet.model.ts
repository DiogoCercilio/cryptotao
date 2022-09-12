import { Field, ObjectType } from "@nestjs/graphql";
import { NFTResponse } from "src/wallet/rest/entities/wallet.entity";
import { NFTItem } from "./nft.model";

@ObjectType()
export class WalletResponse implements NFTResponse {  
  @Field(type => String)
  publicAddress: string

  @Field(type => [NFTItem])
  nftArray: [NFTItem];
}