import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UserService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) return false;
    const [property = 'id'] = validationArguments.constraints;
    const user = await this.userService.user({
      [property]: value,
    });
    return !user;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is exists`;
  }
}

export function IsUserExists(
  property: string,
  validationOption?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserExist',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOption,
      validator: UserExistsValidator,
      async: true,
    });
  };
}
