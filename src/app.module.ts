import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from 'src/modules/shared/shared.module';
import { ProductManagementModule } from 'src/modules/product-management/product.management.module';
import { UsersModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [CqrsModule, SharedModule, UsersModule, ProductManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
