### User API Specification

#### Register User

**Endpoint:** `POST /api/users`

**Request Body:**

```json
{
  "username": "Bassam",
  "password": "123",
  "name": "Rakhadito Bassam"
}
```

**Response Body (Success):**

```json
{
  "data": {
    "username": "Bassam",
    "name": "Rakhadito Bassam"
  }
}
```

**Response Body (Failure):**

```json
{
  "errors": "Username already registered"
}
```

---

#### Login User

**Endpoint:** `POST /api/users/login`

**Request Body:**

```json
{
  "username": "Bassam",
  "password": "123"
}
```

**Response Body (Success):**

```json
{
  "data": {
    "username": "Bassam",
    "name": "Rakhadito Bassam",
    "token": "session_id_generated"
  }
}
```

**Response Body (Failure):**

```json
{
  "errors": "Invalid username or password"
}
```

---

#### Get Current User

**Endpoint:** `GET /api/users/current`

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response Body (Success):**

```json
{
  "data": {
    "username": "Bassam",
    "name": "Rakhadito Bassam"
  }
}
```

**Response Body (Failure):**

```json
{
  "errors": "Unauthorized access"
}
```

---

#### Update User

**Endpoint:** `PATCH /api/users/current`

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "password": "newpassword", // optional, for changing the password
  "name": "New Name" // optional, for changing the name
}
```

**Response Body (Success):**

```json
{
  "data": {
    "username": "Bassam",
    "name": "New Name"
  }
}
```

---

#### Logout User

**Endpoint:** `DELETE /api/users/current`

**Headers:**

```plaintext
Authorization: Bearer <token>
```

**Response Body (Success):**

```json
{
  "data": true
}
```
