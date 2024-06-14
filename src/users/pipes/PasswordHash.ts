import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import RegisterUserDTO from '../dto/register-user-dto';

@Injectable()
class PasswordHash implements PipeTransform {

  constructor(private readonly configService: ConfigService) { }

  async transform(value: RegisterUserDTO) {
    if ('name' in value) {
      const salt: string = this.configService.get<string>('BCRYPT_SALT');
      const newPass = await bcrypt.hash(value.password, salt);

      delete value.confirmPassword;

      return {
        ...value,
        password: newPass
      };
    }

    return value;

  }

}

export default PasswordHash;