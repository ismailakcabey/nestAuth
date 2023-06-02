import {
    Controller,
    Post,
    Put,
    Patch,
    Delete,
    Get,
    Param,
    Body,
    Query,
    BadRequestException,
    Res,
    Req,
    UnauthorizedException,
    UseGuards,
    Inject,
    Request
} from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { AuthGuard } from "./auth.guard";
import { Role } from "./user.enum";
import { Roles } from "./roles.decorator";

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UserService,
    ) { }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @Post()
    async createUser(
        @Body() user: User
    ): Promise<User> {
        return await this.usersService.create(user);
    }

    @Post('login')
    async login(
        @Body() user: User
    ): Promise<any> {
        return await this.usersService.signIn(user.fullName, user.password);
    }

    @UseGuards(AuthGuard)
    @Roles(Role.Admin,Role.User)
    @Get()
    async findUser(
        @Request() req
    ): Promise<User[]> {
        console.log(req.user)
        console.log(process.env.MONGO_DB_URL)
        return await this.usersService.find();
    }

}