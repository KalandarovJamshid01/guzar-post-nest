import { IsString } from 'class-validator';

export class OneIdDto {
  @IsString()
  code: string;
}
