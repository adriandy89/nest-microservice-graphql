import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  OrganizationModule,
  RoleModule,
  UserModule,
} from './access-control';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const accessControlModules = [
  OrganizationModule,
  RoleModule,
  UserModule,
  AuthModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'apps/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context({ req }) {
          const token = req.headers.authorization?.replace('Bearer ', '');
          if (!token) throw Error('Token needed');
          const payload = jwtService.verify(token);
          // console.log({ payload });

          if (!payload) throw Error('Token not valid');
        },
      }),
    }),
    ...accessControlModules,
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
