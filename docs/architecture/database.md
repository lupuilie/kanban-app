# Database Architecture

Considering that the project is deployed on AWS and it will have short bursts of traffic, I don't need a (relational) database that is running 24/7.

> I will use a serverless database, DynamoDB, which is a NoSQL database.

## Schema

The schema is very simple, it has two tables: `boards` and `users`.

### Boards table

```json
// Board access entity
{
  "PK": "USER#userId", // PK
  "SK": "BOARD#boardId", // SK
  "EntityType": "BOARD_ACCESS",
  "role": "enum", // CONTRIBUTOR | ...
  "createdAt": "string",
}

// Board entity
{
  "PK": "BOARD#boardId", // PK
  "SK": "BOARD#boardId", // SK
  "EntityType": "BOARD",
  "name": "string",
  "createdAt": "string",
}

// Column entity
{
  "PK": "BOARD#boardId", // PK
  "SK": "COLUMN#columnId", // SK
  "EntityType": "COLUMN",
  "name": "string",
  "color": "string",
  "position": 0 // number
}

// Task entity
{
  "PK": "BOARD#boardId", // PK
  "SK": "TASK#taskId", // SK
  "EntityType": "TASK",
  "columnId": "string",
  "title": "string",
  "description": "string",
  "position": 0, // number
  "subtasks": [
    {
      "subtaskId": "string",
      "title": "string",
      "isCompleted": false
    }
  ]
}
```

### Users table

```json
{
  "PK": "string", // PK
  "username": "string",
  "password": "string"
}
```

## Access patterns

Below are the access patterns that I will use in the application.

- Get all boards that user have access to

```JSON
{
  "PK": "USER#userId",
  "SK": // starts with "BOARD#"
}
```

- Get board with columns and tasks

```JSON
{
  "PK": "BOARD#boardId",
}
```

- Get boards (batch)

  ```JSON
  [
    {
      "PK": "BOARD#boardId",
      "SK": "BOARD#boardId"
    },
    {
      "PK": "BOARD#boardId",
      "SK": "BOARD#boardId"
    }
  ]
  ```

- Get all columns for a board

```JSON
{
  "PK": "BOARD#boardId",
  "SK": // starts with "COLUMN#"
}
```

- Get all tasks for a board

```JSON
{
  "PK": "BOARD#boardId",
  "SK": // starts with "TASK#"
}
```
