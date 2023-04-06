import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import * as ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
