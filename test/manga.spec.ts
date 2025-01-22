import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ControllerManga (e2e)', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /api/manga', () => {
    beforeEach(async () => {
      await testService.deleteManga();
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/manga')
        .set('Authorization', 'test')
        .send({
          title: '',
          author: '',
          status: '',
          release_date: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create manga', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/manga')
        .set('Authorization', 'test')
        .send({
          title: 'test',
          author: 'test',
          status: 'test',
          release_date: '2025-01-01',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBeDefined();
      expect(response.body.Data.title).toBe('test');
      expect(response.body.Data.author).toBe('test');
      expect(response.body.Data.status).toBe('test');
    });
  });

  describe('GET /api/manga', () => {
    beforeEach(async () => {
      await testService.deleteManga();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createManga();
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get manga', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id}`)
        .set('Authorization', 'test');
      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBeDefined();
      expect(response.body.Data.title).toBe('test');
      expect(response.body.Data.author).toBe('test');
      expect(response.body.Data.status).toBe('test');
    });
  });

  describe('PUT /api/manga/:mangaId', () => {
    beforeEach(async () => {
      await testService.deleteManga();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createManga();
    });

    it('should be rejected if request is invalid', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id}`)
        .set('Authorization', 'test')
        .send({
          title: '',
          author: '',
          status: '',
          release_date: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id + 1}`)
        .set('Authorization', 'test')
        .send({
          title: 'test',
          author: 'test',
          status: 'test',
          release_date: '2025-01-01',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update manga', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id}`)
        .set('Authorization', 'test')
        .send({
          title: 'test updated',
          author: 'test updated',
          status: 'test updated',
          release_date: '2025-01-02',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBeDefined();
      expect(response.body.Data.title).toBe('test updated');
      expect(response.body.Data.author).toBe('test updated');
      expect(response.body.Data.status).toBe('test updated');
    });
  });

  describe('DELETE /api/manga', () => {
    beforeEach(async () => {
      await testService.deleteManga();
      await testService.deleteUser();
      await testService.createUser();
      await testService.createManga();
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .delete(`/api/manga/${manga.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to remove manga', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .delete(`/api/manga/${manga.id}`)
        .set('Authorization', 'test');
      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data).toBe(true);
    });
  });
});
