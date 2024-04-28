import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { jwtConstants } from './jwt.constants';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async register(userObject: RegisterAuthDto) {
    try {
      // Verificar si el usuario con este correo electrónico ya existe
      const existingUser = await this.userModel.findOne({ email: userObject.email });

      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      //  Hasheo el password
      const { password } = userObject;
      const plainToHask = await hash(password, 10)


      // Guardo los datos del nuevo usuario 
      userObject = { ...userObject, password: plainToHask }
      const findUser = await this.userModel.create(userObject)

      // Creo el token

      const payload = { id: findUser._id, name: findUser.name }

      const access_token = this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '1h',
      })
      const refresh_token = this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
        expiresIn: '2h',
      })

      const token = {
        access_token,
        refresh_token,
      };

      return token

    } catch (error) {
      return { error: error.message };
    }
  }

  async login(userObjectLogin: LoginAuthDto, res: Response) {
    const { email, password } = userObjectLogin
    const findUser = await this.userModel.findOne({ email })

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)
    //   console.log("f: ",findUser.password, "type: ", typeof(findUser.password))
    // console.log("p: ",password, "type: ", typeof(password))

    const checkPassword = await compare(password, findUser.password)
    // console.log("checkPassword: ",checkPassword)
    // el compare funciona solo si la contraseña esta encrytada
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

    const payload = { id: findUser._id, name: findUser.name }
    // const token = this.jwtService.sign(payload)
    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    })
    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '2h',
    })

    const token = {
      access_token,
      refresh_token,
    };
    // const expires = new Date();
    // expires.setMilliseconds(expires.getMilliseconds() + 24 * 60 * 60 * 1000); // 1 día en milisegundos

    // res.cookie('token', "token");
    console.log(token)
    return token
  }
}
