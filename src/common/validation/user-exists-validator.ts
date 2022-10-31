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
    if (value) {
      const user = await this.userService.user({
        [validationArguments.constraints[0]]: value,
      });
      return !user;
    }
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is exists`;
  }
}

export function IsExistsUser(
  option: string[],
  validationOption?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExistUser',
      target: object.constructor,
      propertyName,
      constraints: option,
      options: validationOption,
      validator: UserExistsValidator,
      async: true,
    });
  };
}
