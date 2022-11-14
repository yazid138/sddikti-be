import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [model, property = 'id'] = args.constraints;

    if (!value && !model) return false;

    const record = await this.prismaService[model].findUnique({
      where: {
        [property]: value,
      },
    });

    return !!record;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} is not exists`;
  }
}

export function IsExists(
  model: string,
  uniqueField: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsExists',
      target: object.constructor,
      constraints: [model, uniqueField],
      propertyName,
      options: validationOptions,
      validator: ExistsValidator,
      async: true,
    });
  };
}
