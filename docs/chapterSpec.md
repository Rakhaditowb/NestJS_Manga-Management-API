### Manga Chapter Management API Specification

#### Create Chapter

**Endpoint:** `POST /api/manga/:mangaId/chapters`

**Headers:**

- Authorization: Bearer <token>

**Request Body:**

```json
{
  "chapter_number": 1,
  "chapter_title": "The Beginning",
  "release_date": "2025-01-01",
  "page_count": 20
}
```

**Response Body:**

```json
{
  "data": {
    "id": 1,
    "chapter_number": 1,
    "chapter_title": "The Beginning",
    "release_date": "2025-01-01",
    "page_count": 20
  }
}
```

---

#### Get Chapter

**Endpoint:** `GET /api/manga/:mangaId/chapters/:chapterId`

**Headers:**

- Authorization: Bearer <token>

**Response Body:**

```json
{
  "data": {
    "id": 1,
    "chapter_number": 1,
    "chapter_title": "The Beginning",
    "release_date": "2025-01-01",
    "page_count": 20
  }
}
```

---

#### Update Chapter

**Endpoint:** `PUT /api/manga/:mangaId/chapters/:chapterId`

**Headers:**

- Authorization: Bearer <token>

**Request Body:**

```json
{
  "chapter_number": 1,
  "chapter_title": "The Beginning",
  "release_date": "2025-01-01",
  "page_count": 20
}
```

**Response Body:**

```json
{
  "data": {
    "id": 1,
    "chapter_number": 1,
    "chapter_title": "The Beginning",
    "release_date": "2025-01-01",
    "page_count": 20
  }
}
```

---

#### Remove Chapter

**Endpoint:** `DELETE /api/manga/:mangaId/chapters/:chapterId`

**Headers:**

- Authorization: Bearer <token>

**Response Body:**

```json
{
  "data": true
}
```

---

#### List Chapters

**Endpoint:** `GET /api/manga/:mangaId/chapters`

**Headers:**

- Authorization: Bearer <token>

**Response Body:**

```json
{
  "data": [
    {
      "id": 1,
      "chapter_number": 1,
      "chapter_title": "The Beginning",
      "release_date": "2025-01-01",
      "page_count": 20
    },
    {
      "id": 2,
      "chapter_number": 2,
      "chapter_title": "The Journey",
      "release_date": "2025-02-01",
      "page_count": 25
    }
  ]
}
```
