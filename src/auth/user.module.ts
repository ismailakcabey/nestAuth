import { forwardRef, Injectable, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { RolesGuard } from "./roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:true
    }),
    MongooseModule.forFeature([{ name: "AuthUser", schema: UserSchema }]),
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      dbName: process.env.MONGO_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: { expiresIn: '1d' }
    }),
  ],
  controllers: [UsersController],
  providers: [UserService]
})


export class UserModule {

}