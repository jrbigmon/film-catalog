# Film Catalog API Documentation

## Overview
The Film Catalog API provides endpoints to manage movies, movie genres, user creation, and authentication.

Base URL: `/api/v1`

## Authentication
The API requires JWT authentication. Obtain an access token by logging in using the `/login` endpoint.

## Error Handling
Errors are returned in JSON format with appropriate HTTP status codes.

Example Error Response:
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

## Endpoints

### User Management

