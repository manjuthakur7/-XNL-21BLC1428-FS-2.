import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity'; // Import your entities here

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User], // 👈 Make sure to load all your entities
      synchronize: process.env.NODE_ENV !== 'production', // 👈 Disable in production
      logging: true, // 👈 Enable SQL logging for debugging
      cache: {
        duration: 60000, // 60 seconds cache
      },
    }),
  ],
})
export class DatabaseModule {}
