import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateRecommendationDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    recommendationText: string;
}
