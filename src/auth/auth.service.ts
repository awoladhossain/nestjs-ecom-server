import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  // token generation helper

  private async generateToken(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };

    // access token
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN'),
    });

    // refresh tokne
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  // register user
  async register(dto: RegisterDto) {
    // email already  exist check

    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) {
      throw new ConflictException('Email already registered');
    }

    // password hash

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password: hashedPassword,
    });

    // token generation
    const tokens = await this.generateToken(
      user._id.toString(),
      user.email,
      user.role,
    );

    // refresh token hash and save
    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashedRefresh,
    });

    return {
      message: 'User registered successfully',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // login user
  async login(dto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateToken(
      user._id.toString(),
      user.email,
      user.role,
    );
    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashedRefresh,
    });

    return {
      message: 'Login successful',
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // logout user
  async logout(userId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: null,
    });
    return {
      message: 'Logout successful',
    };
  }

  // refresh token
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Access denied');

    const tokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!tokenMatch) throw new UnauthorizedException('Access denied');

    const tokens = await this.generateToken(
      user._id.toString(),
      user.email,
      user.role,
    );

    const hashedRefresh = await bcrypt.hash(tokens.refreshToken, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: hashedRefresh,
    });

    return tokens;
  }
}
