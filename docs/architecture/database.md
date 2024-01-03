# Database Architecture

Considering that the project is deployed on AWS and it will have short bursts of traffic, I don't need a (relational) database that is running 24/7.

> I will use a serverless database, DynamoDB, which is a NoSQL database.

## Schema

The schema is very simple, it has two tables: `boards` and `users`.

### Boards table

```json
// Board entity
{
  "PK": "BOARD#boardId", // PK
  "SK": "BOARD#boardId", // SK
  "EntityType": "BOARD",
  "name": "string",
  "createdAt": "string",
  "columns": [
    {
      "columnId": "string",
      "name": "string",
      "color": "string"
    }
  ]
}
// Task entity
{
  "PK": "BOARD#boardId", // PK
  "SK": "TASK#taskId", // SK
  "EntityType": "TASK",
  "columnId": "string",
  "title": "string",
  "description": "string",
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
  "userId": "string", // PK
  "username": "string",
  "password": "string",
  "boards": [
    {
      "boardId": "string",
      "name:": "string",
      "permission": "string"
    }
  ]
}
```

## Access patterns

Below are the access patterns that I will use in the application.

- Get boards that the user has access to

```
PK: USER#userId
SK: BOARD#boardId
```

- Get board by id

```
PK: BOARD#boardId
SK: BOARD#boardId
```

- Get tasks by board id

```
PK: BOARD#boardId
SK: TASK#
```

> **SK** starts with `TASK#` so that I can use the `begins_with` operator to get all tasks of a board.
