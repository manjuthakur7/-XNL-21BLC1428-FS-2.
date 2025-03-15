import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recommendation } from 'src/entities/recommendation.entity';
import { CreateRecommendationDto } from 'src/dto/create-recommendation.dto';

@Injectable()
export class RecommendationService {
    constructor(
        @InjectRepository(Recommendation)
        private readonly recommendationRepository: Repository<Recommendation>,
    ) {}

    async createRecommendation(createRecommendationDto: CreateRecommendationDto): Promise<Recommendation> {
        const recommendation = this.recommendationRepository.create(createRecommendationDto);
        return await this.recommendationRepository.save(recommendation);
    }

    async getRecommendationsForUser(userId: string): Promise<Recommendation[]> {
        return await this.recommendationRepository.find({ where: { userId } });
    }
}
