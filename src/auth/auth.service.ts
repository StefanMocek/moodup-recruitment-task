import {AuthDto} from './dtos/auth.dto';
import {UserService, userService} from './user/user.service';
import {AuthenticationService} from '../utils/services/authentication.service';

export class AuthService {
  constructor(
    public userService: UserService,
    public authenticationService: AuthenticationService
  ) { }

  async register(createUserDto: AuthDto) {
    const existingUser = await this.userService.findOneByEmail(createUserDto.email);
    if (existingUser) {
      return {message: 'Email already taken'}
    };
    const newUser = await this.userService.create(createUserDto);

    const jwt = this.authenticationService.generateJwt({email: createUserDto.email, userId: newUser._id, role: newUser.role}, process.env.JWT_KEY!)
    return {jwt};
  };

  async signin(signInDto: AuthDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (!user) {
      return {message: 'Wrong credentials'}
    };

    const pwdCompered = this.authenticationService.pwdCompare(user.password, signInDto.password);

    if (!pwdCompered) {
      return {message: 'Wrong credentials'}
    };

    const jwt = this.authenticationService.generateJwt({email: user.email, userId: user._id, role: user.role}, process.env.JWT_KEY!)
    return {jwt};
  }
};

export const authService = new AuthService(userService, new AuthenticationService());