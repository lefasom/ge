import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsInt()
    price: number;

    @IsString()
    description: string;
}