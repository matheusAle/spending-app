// @ts-ignore
import { Document, Schema, model, Types } from 'mongoose';

const userSchema: Schema = new Schema({
    fullName: { type: String, required: true , select: true },
    email: { type: String, required: true, select: true },
    password: { type: String, required: true, select: false },
    token: { type: String, required: false, select: false },
}, {
    timestamps: true,
});

userSchema.pre<any>('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const bcript = require('bcryptjs');
        const salt = bcript.genSaltSync(parseInt(process.env.USER_PSW_SALT || '8', 10));
        this.password = bcript.hashSync(this.password || '', salt);
    }
    return next();
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ _id: 1, token: 1 }, { background: true });

userSchema.methods.comparePassword = function(passw) {
    return new Promise((resolve, reject) => {
        const bcrypt = require('bcryptjs');
        bcrypt.compare(passw, this.password, (err, isMatch) => {
            if (err) { return reject(err); }

            resolve(isMatch);
        });
    });
};

export interface IUser extends Document {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    token: string;
}

export const UserModel = model<IUser>('User', userSchema);
