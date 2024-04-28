import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { jwtConstants } from './jwt.constants';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async register(userObject: RegisterAuthDto) {
    // Verificar si el usuario con este correo electrónico ya existe
    const existingUser = await this.userModel.findOne({ email: userObject.email });
    if (existingUser) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    //  Hasheo el password
    const { password } = userObject;
    const plainToHask = await hash(password, 10)

    // Guardo los datos del nuevo usuario 
    userObject = { ...userObject, password: plainToHask }
    const findUser = await this.userModel.create(userObject)

    // Creo el token

    const payload = { id: findUser._id, email: findUser.email }

    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    })
    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '2h',
    })

    return {
      access_token,
      refresh_token,
    }
  }

  async login(userObjectLogin: LoginAuthDto) {

    const { email, password } = userObjectLogin
    const findUser = await this.userModel.findOne({ email })

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404)


    const checkPassword = await compare(password, findUser.password)
    // console.log("checkPassword: ",checkPassword)
    // el compare funciona solo si la contraseña esta encrytada
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403)

    const payload = { id: findUser._id, email: findUser.email }
    // const token = this.jwtService.sign(payload)
    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    })
    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '2h',
    })
    await this.updateRtHash({ userId: findUser._id, rt: refresh_token });
    const tokens = {
      access_token,
      refresh_token,
    };
    return {
      user: {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email
      }
      , tokens
    }
  }
  async logout(userid: any){
    const userId = (userid.user._id) as string
    try {
      // Lógica para realizar el logout, por ejemplo, eliminar el refresh token
      await this.userModel.findByIdAndUpdate(
        userId,
        {hashedRt: '' } // Eliminar el campo hashedRt
      );
    } catch (error) {
      console.error('Error al realizar el logout:', error);
      throw error;
    }
  }


  async updateRtHash({ userId, rt }) {
    try {
      const hash = await argon.hash(rt);

      await this.userModel.findOneAndUpdate(
        { _id: userId }, // Filtro para encontrar al usuario por su ID
        { hashedRt: hash }, // Datos que se actualizarán
      );

    } catch (error) {
      console.error('Error al actualizar el hash del refresh token:', error);
      throw error; // Puedes manejar el error según sea necesario
    }
  }

  async refreshTokens({ userId, rt }) {
    // console.log({userId,rt})
    const findUser = await this.userModel.findOne({ _id: userId })
    console.log(findUser)
    if (!findUser || !findUser.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(findUser.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const payload = { id: findUser._id, email: findUser.email }

    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1h',
    })
    const refresh_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '2h',
    })
    await this.updateRtHash({ userId: findUser._id, rt: refresh_token });

    const tokens = {
      access_token,
      refresh_token,
    };
    return {
      user: {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email
      }
      , tokens
    }
  }
}
