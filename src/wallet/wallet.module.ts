import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './rest/wallet.controller';
import { WalletGraphqlResolver } from 'src/wallet/graphql/wallet-graphql.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  controllers: [WalletController],
  providers: [WalletService, WalletGraphqlResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './graphql/wallet.graphql',
      driver: ApolloDriver
    }),
  ],
})

export class WalletModule {}