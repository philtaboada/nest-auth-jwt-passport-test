import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile']
        });
    }


    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const { name, emails, photos } = profile;
        const email = emails[0].value;

        let user = await this.userModel.findOne({ email });

        if (!user) {
            user = await this.userModel.create({
                name,
                email,
                photo: photos[0].value
            });
        }

        done(null, user);
    }

}