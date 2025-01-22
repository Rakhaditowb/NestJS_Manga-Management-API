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
