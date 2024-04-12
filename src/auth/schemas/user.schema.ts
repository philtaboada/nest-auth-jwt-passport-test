import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ unique: [true, 'Email already exists'] })
    email: string;

    @Prop()
    password!: string;

    @Prop()
    accessToken!: string;

    @Prop()
    refreshToken!: string;

    @Prop()
    photo!: string;

    @Prop()
    provider!: string;

    @Prop()
    providerId!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
