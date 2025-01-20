### Manga Management API Specification

#### Create Manga

**Endpoint:** `POST /api/manga`

**Headers:**

- Authorization: Bearer <token>

**Request Body:**

```json
{
  "title": "One Piece",
  "author": "Eiichiro Oda",
  "status": "Ongoing",
  "release_date": "1997-07-22"
}
```

**Response Body:**

```json
{
  "data": {
    "id": 1,
    "title": "One Piece",
    "author": "Eiichiro Oda",
    "status": "Ongoing",
    "release_date": "1997-07-22"
  }
}
```

---

#### Get Manga

**Endpoint:** `GET /api/manga/:mangaId`

**Headers:**

- Authorization: Bearer <token>

**Response Body:**

```json
{
  "data": {
    "id": 1,
    "title": "One Piece",
    "author": "Eiichiro Oda",
    "status": "Ongoing",
    "release_date": "1997-07-22"
  }
}
```

---

#### Update Manga

**Endpoint:** `PUT /api/manga/:mangaId`

**Headers:**

- Authorization: Bearer <token>

**Request Body:**

```json
{
  "title": "One Piece",
  "author": "Eiichiro Oda",
  "status": "Ongoing",
  "release_date": "1997-07-22"
}
```

**Response Body:**

```json
{
  "data": {
    "id": 1,
    "title": "One Piece",
    "author": "Eiichiro Oda",
    "status": "Ongoing",
    "release_date": "1997-07-22"
  }
}
```

---

#### Remove Manga

**Endpoint:** `DELETE /api/manga/:mangaId`

**Headers:**

- Authorization: Bearer <token>

**Response Body:**

```json
{
  "data": true
}
```

---

#### Search Manga

**Endpoint:** `GET /api/manga`

**Headers:**

- Authorization: Bearer <token>

**Query Parameters:**

- `title`: string, manga title, optional
- `author`: string, manga author, optional
- `status`: string, manga status (e.g., "Ongoing", "Completed"), optional
- `release_date`: string, manga release date, optional
- `page`: number, default 1
- `size`: number, default 10

**Response Body:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "One Piece",
      "author": "Eiichiro Oda",
      "status": "Ongoing",
      "release_date": "1997-07-22"
    },
    {
      "id": 2,
      "title": "Naruto",
      "author": "Masashi Kishimoto",
      "status": "Completed",
      "release_date": "1999-09-21"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
