import {User, UserModel} from './user.model';
import {AuthDto} from '../dtos/auth.dto'

export class UserService {
  constructor(
    public userModel: UserModel
  ) { }

  async create(createUserDto: AuthDto) {
    // first registered user always will be an admin - for dev and tests purposes
    const isFirstAccount = await this.userModel.count({}) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = new this.userModel({
      email: createUserDto.email,
      password: createUserDto.password,
      role
    })

    return await user.save();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({email})
  }
}

export const userService = new UserService(User)