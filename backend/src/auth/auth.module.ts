import { Module, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  //   JwtModule.register({
  //     global: true,
  //     secret: jwtConstants.secret,
  //     signOptions: { expiresIn: '60s' },
  //   }),
    
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,JwtService],
})
export class AuthModule { 

  
}
