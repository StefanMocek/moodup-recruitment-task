import mongoose, { Schema } from 'mongoose';
import {AuthenticationService} from '../../utils/services/authentication.service';

interface UserDoc extends mongoose.Document {
  email: string,
  password: string,
  role: string
};

export interface UserModel extends mongoose.Model<UserDoc> {};

const userSchema: Schema<UserDoc, UserModel> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
});

userSchema.pre('save', async function (done) {
  const authenticationService = new AuthenticationService();
  if (this.isModified('password') || this.isNew) {
    const hashedPwd = await authenticationService.pwdToHash(this.get('password'));
    this.set('password', hashedPwd);
  }
  done();
});

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);