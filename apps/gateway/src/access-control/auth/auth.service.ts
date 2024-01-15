import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxyAPI } from '../common/proxy/client-proxy';
import { firstValueFrom } from 'rxjs';
import { UserMsg } from 'libs/common/constants/rabbitmq.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientProxy: ClientProxyAPI,
    private readonly jwtService: JwtService,
  ) {}

  private clientProxyAccessControl =
    this.clientProxy.clientProxyAccessControl();

  async validateUser(username: string, password: string): Promise<any> {
    const r = this.clientProxyAccessControl.send(UserMsg.VALID_USER, {
      username,
      password,
    });
    const user = await firstValueFrom(r);

    if (user) return user;

    return null;
  }

  async userValidateTokenInfo(userId: string) {
    const r = this.clientProxyAccessControl.send(UserMsg.VALID_TOKEN, {
      userId,
    });
    const user = await firstValueFrom(r);

    if (user) return user;

    return null;
    // const user = await this.prismaService.cmsUser.findUnique({
    //   where: { id },
    //   select: { isActive: true, role: true, email: true }
    // });
    // return (user && user.isActive && user.role === role && user.email === email);
    return true;
  }

  async signIn(user: any) {
    if (user?.username === 'sadmin') {
      return {
        access_token: this.jwtService.sign({ userId: user.username }),
      };
    }
    const payload = {
      userId: user._id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  // async signUp(userDTO: UserDTO) {
  //   return await this.clientProxyAccessControl
  //     .send(UserMsg.CREATE, userDTO)
  //     .toPromise();
  // }
}
