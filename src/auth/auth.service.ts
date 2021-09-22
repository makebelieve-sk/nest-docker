import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../users/users.model";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateToken(dto);

        return this.generateToken(user);
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUsersByEmail(dto.email);

        if (candidate) {
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }

        const hashedPassword = await bcrypt.hash(dto.password, 12);

        const user = await this.userService.createUser({...dto, password: hashedPassword});

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}

        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateToken(userDto: CreateUserDto) {
        const user = await this.userService.getUsersByEmail(userDto.email);

        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);

            if (passwordEquals) {
                return user;
            }
        }

        throw new UnauthorizedException({message: "Неверный логин или пароль"})
    }
}
