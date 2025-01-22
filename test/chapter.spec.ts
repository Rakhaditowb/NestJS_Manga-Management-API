import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('ControllerChapter (e2e)', () => {
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

  describe('POST /api/manga/:mangaId/chapters', () => {
    beforeEach(async () => {
      await testService.deleteChapter();
      await testService.deleteManga();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createManga();
      await testService.createChapter();
    });

    it('should be rejected if request is invalid', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .post(`/api/manga/${manga.id}/chapters`)
        .set('Authorization', 'test')
        .send({
          chapter_number: '',
          chapter_title: '',
          release_date: '',
          page_count: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to create chapter', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .post(`/api/manga/${manga.id}/chapters`)
        .set('Authorization', 'test')
        .send({
          chapter_number: '1',
          chapter_title: 'test',
          release_date: '2025-01-01',
          page_count: '1',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBeDefined();
      expect(response.body.Data.chapter_number).toBe('1');
      expect(response.body.Data.chapter_title).toBe('test');
      expect(response.body.Data.page_count).toBe('1');
    });
  });

  describe('GET /api/manga/:mangaId/chapters/:chapterId', () => {
    beforeEach(async () => {
      await testService.deleteChapter();
      await testService.deleteManga();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createManga();
      await testService.createChapter();
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id + 1}/chapters/${chapter.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if chapter is not found', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id}/chapters/${chapter.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get chapter', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id}/chapters/${chapter.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBeDefined();
      expect(response.body.Data.chapter_number).toBe('1');
      expect(response.body.Data.chapter_title).toBe('test');
      expect(response.body.Data.page_count).toBe('1');
    });
  });

  describe('PUT /api/manga/:mangaId/chapters/:chapterId', () => {
    beforeEach(async () => {
      await testService.deleteChapter();
      await testService.deleteManga();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createManga();
      await testService.createChapter();
    });

    it('should be rejected if request is invalid', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id}/chapters/${chapter.id}`)
        .set('Authorization', 'test')
        .send({
          chapter_number: '',
          chapter_title: '',
          release_date: '',
          page_count: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to update chapter', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id}/chapters/${chapter.id}`)
        .set('Authorization', 'test')
        .send({
          chapter_number: '1',
          chapter_title: 'test',
          release_date: '2025-01-01',
          page_count: '1',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.id).toBeDefined();
      expect(response.body.Data.chapter_number).toBe('1');
      expect(response.body.Data.chapter_title).toBe('test');
      expect(response.body.Data.page_count).toBe('1');
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id + 1}/chapters/${chapter.id}`)
        .set('Authorization', 'test')
        .send({
          chapter_number: '1',
          chapter_title: 'test',
          release_date: '2025-01-01',
          page_count: '1',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if chapter is not found', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .put(`/api/manga/${manga.id}/chapters/${chapter.id + 1}`)
        .set('Authorization', 'test')
        .send({
          chapter_number: '1',
          chapter_title: 'test',
          release_date: '2025-01-01',
          page_count: '1',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('DELETE /api/manga/:mangaId/chapters/:chapterId', () => {
    beforeEach(async () => {
      await testService.deleteChapter();
      await testService.deleteManga();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createManga();
      await testService.createChapter();
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .delete(`/api/manga/${manga.id + 1}/chapters/${chapter.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be rejected if chapter is not found', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .delete(`/api/manga/${manga.id}/chapters/${chapter.id + 1}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to delete chapter', async () => {
      const manga = await testService.getManga();
      const chapter = await testService.getChapter();
      const response = await request(app.getHttpServer())
        .delete(`/api/manga/${manga.id}/chapters/${chapter.id}`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data).toBe(true);

      const chapterResult = await testService.getChapter();
      expect(chapterResult).toBeNull();
    });
  });

  describe('GET /api/manga/:mangaId/chapters', () => {
    beforeEach(async () => {
      await testService.deleteChapter();
      await testService.deleteManga();
      await testService.deleteUser();

      await testService.createUser();
      await testService.createManga();
      await testService.createChapter();
    });

    it('should be rejected if manga is not found', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id + 1}/chapters`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to list chapter', async () => {
      const manga = await testService.getManga();
      const response = await request(app.getHttpServer())
        .get(`/api/manga/${manga.id}/chapters`)
        .set('Authorization', 'test');

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.Data.length).toBe(1);
      expect(response.body.Data[0].id).toBeDefined();
      expect(response.body.Data[0].chapter_number).toBe('1');
      expect(response.body.Data[0].chapter_title).toBe('test');
      expect(response.body.Data[0].page_count).toBe('1');
    });
  });
});
