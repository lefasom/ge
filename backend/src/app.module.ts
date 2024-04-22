import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Indica que este módulo es global, esto permite el uso de variables de entorno
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    ItemsModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {

}
