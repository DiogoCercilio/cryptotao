export interface NFTItemDataCreator {
  address: string;
  verified: number;
  share: number;
}

export interface NFTItemData {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: NFTItemDataCreator[];
}

export interface NFTItem {
  key: number;
  updateAuthority: string;
  mint: string;
  data: NFTItemData;
  primarySaleHappened: boolean;
  isMutable: boolean;
  editionNonce: number;
}

export interface NFTResponse {
  publicAddress: string;
  nftArray: NFTItem[];
}
