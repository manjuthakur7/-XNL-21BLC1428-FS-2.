import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from './entities/recommendation.entity';
import { RecommendationService } from 'src/recommendation.service';
import { RecommendationController } from 'src/recommendation.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'manju',
            database: 'health_tracker',
            entities: [Recommendation],
            synchronize: true, // ❗ Set `false` in production
        }),
        TypeOrmModule.forFeature([Recommendation]),
    ],
    controllers: [RecommendationController],
    providers: [RecommendationService],
})
export class AppModule {}
