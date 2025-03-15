import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RecommendationService } from 'src/recommendation.service';
import { CreateRecommendationDto } from 'src/dto/create-recommendation.dto';

@Controller('recommendations')
export class RecommendationController {
    constructor(private readonly recommendationService: RecommendationService) {}

    @Post()
    async createRecommendation(@Body() createRecommendationDto: CreateRecommendationDto) {
        return this.recommendationService.createRecommendation(createRecommendationDto);
    }

    @Get(':userId')
    async getRecommendations(@Param('userId') userId: string) {
        return this.recommendationService.getRecommendationsForUser(userId);
    }
}
