export class ChapterResponse {
  id: number;
  chapter_number: string;
  chapter_title: string;
  release_date: Date;
  page_count: string;
}

export class CreateChapterRequest {
  manga_id: number;
  chapter_number: string;
  chapter_title: string;
  release_date: Date;
  page_count: string;
}

export class GetChapterRequest {
  manga_id: number;
  chapter_id: number;
}

export class UpdateChapterRequest {
  id: number;
  manga_id: number;
  chapter_number?: string;
  chapter_title: string;
  release_date?: Date;
  page_count?: string;
}

export class RemoveChapterRequest {
  manga_id: number;
  chapter_id: number;
}
