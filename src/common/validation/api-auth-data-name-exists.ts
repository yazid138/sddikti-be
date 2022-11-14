import { PrismaService } from 'src/prisma/prisma.service';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MyContext } from '../context/my-context';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class ApiAuthDataNameExists implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: string, args?: ValidationArguments) {
    const ctx = RequestContext.get<MyContext>();
    const api_id: string = ctx.body['api_id'];

    if (!value && !api_id) return true;

    const api = await this.prismaService.api.findUnique({
      where: { id: api_id },
      include: { auth: { include: { data: true } } },
    });

    if (!api) return true;

    return !api.auth?.data.find((e) => e.name === value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is exists`;
  }
}

export function IsApiAuthDataNameExists(validationOption?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsApiAuthDataNameExists',
      target: object.constructor,
      constraints: [],
      propertyName,
      options: validationOption,
      validator: ApiAuthDataNameExists,
      async: true,
    });
  };
}
