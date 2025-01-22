export class MangaResponse {
  id: number;
  title: string;
  author: string;
  status: string;
  release_date: Date;
}

export class CreateMangaRequest {
  title: string;
  author: string;
  status: string;
  release_date: Date;
}

export class UpdateMangaRequest {
  id: number;
  title: string;
  author?: string;
  status?: string;
  release_date?: Date;
}
