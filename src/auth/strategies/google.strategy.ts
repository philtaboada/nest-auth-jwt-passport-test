import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

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

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback) {
        const { id, name, emails, photos } = profile;
        const email = emails[0].value;

        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        

        let user = await this.userModel.findOne({ email });

        if (!user) {
            //Remenber to change the name of the fields according to the provider

            // name.givenName == first name
            // name.familyName == last name
            user = await this.userModel.create({
                name: `${name.givenName} ${name.familyName}`,
                email,
                accessToken,
                refreshToken,
                photo: photos[0].value,
                provider: 'google',
                providerId: id
            });
        }

        done(null, user);
    }

}
