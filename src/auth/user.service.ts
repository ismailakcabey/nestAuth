import { Injectable , Inject , forwardRef, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "./user.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('AuthUser') private readonly user: Model<User>,
        private jwtService: JwtService
    ){
    }

    async create(user: User): Promise<User> {
        const saveUser = new this.user(user)
        const result = await saveUser.save()
        return result;
    }

    async find(): Promise<User[]>{
        return await this.user.find();
    }

    async findById(id: string): Promise<User> {
        return await this.user.findById(id);
    }

    async signIn(username, pass) {
        const user = await this.user.findOne({fullName: username});
        
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const jwt = await this.jwtService.signAsync({id: user.id, role:user.role})
        return {
          access_token: jwt
        };
      }

    async login(user: User): Promise<{
        status:boolean,
        token:string
    }>{
        const filter = {
            fullName : user.fullName
        }
        const loginUser = await this.user.find(filter)
        console.log(loginUser);
        if(loginUser){
            
            if(loginUser[0].fullName === user.fullName && loginUser[0].password === user.password){
                const payload = { sub: loginUser[0].id, username: loginUser[0].fullName };
                const token= await this.jwtService.signAsync(payload)
                return{
                    status:true,
                    token: token
                }
            }
            else{
                return{
                    status:false,
                    token: "hatali"
                }
            }
        }
        else{
            return{
                status:false,
                token: ""
            }
        }
    }
}