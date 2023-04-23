import { IsNumber, IsOptional } from 'class-validator';
import { ErrorsEnum } from '../Entities/ErrorsEnum';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ErrorsEnum.IS_NUMBER,
    },
  )
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: ErrorsEnum.IS_NUMBER,
    },
  )
  limit?: number;
}