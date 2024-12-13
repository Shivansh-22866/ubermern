# User Registration API Documentation

## Overview

This API allows users to register by providing their personal information, including their first name, last name, email address, and password. The password is securely hashed before being stored in the database. Upon successful registration, a JSON Web Token (JWT) is generated for authentication purposes.

## Base URL

`http://<your-server-domain>/api/v1/users`


## Endpoint

### Register User

- **URL**: `/register`
- **Method**: `POST`
- **Authentication**: None required for this endpoint.

### Request

#### Headers

- `Content-Type: application/json`

#### Body Parameters

| Parameter                | Type   | Required | Description                                      |
|--------------------------|--------|----------|--------------------------------------------------|
| `fullname.firstName`     | String | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastName`      | String | No       | The last name of the user (minimum 3 characters). |
| `email`                  | String | Yes      | The email address of the user (must be valid).   |
| `password`               | String | Yes      | The password for the user account (minimum 6 characters). |

#### Example Request

```json
POST /api/v1/users/register
Content-Type: application/json

{
    "fullname": {
        "firstName": "sample-first",
        "lastName": "sample-last"
    },
    "email": "abc@xyz.com",
    "password": "Samplepassword"
}
```

#### Sucess Response

- Status Response: `201 Created`
- Content:

```
{
    "user": {
        "_id": "60d5f484f1e2c4d0a8b45678",
        "fullname": {
            "firstName": "sample-first",
            "lastName": "sample-last"
        },
        "email": "abc@xyz.com",
        "password": "<hashed_password>",
        "socketId": null,
        "__v": 0
    },
    "token": "<JWT_token>"
}
```

#### Error Response

1. Validation Errors
   - Status Code: `404 Bad Request`
   - Content:
    ```
    {
        "errors": [
            {
                "msg": "Email is not valid",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "First name must be at least 3 characters long",
                "param": "fullname.firstName",
                "location": "body"
            },
            {
                "msg": "Password must be at least 6 characters long",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```
2. Internal Server Errors
   - Status Code: `500 Internal Server Error`
   - Content:
    ```
    {
    "message": "Internal server error"
    }

    ```

## Implementation Details

### User Model

The user model is defined using Mongoose and includes the following fields:
- `fullname`: An object containing firstName and lastName.
- `email`: A unique email address for the user.
- `password`: A hashed password stored securely.
- `socketId`: An optional field for real-time communication.

#### Password Hashing
Passwords are hashed using bcrypt before being saved to the database to enhance security. The hashing process uses a salt to protect against rainbow table attacks.

#### JWT Generation
Upon successful registration, a JSON Web Token (JWT) is generated using the user's ID. This token can be used for authenticating subsequent requests to protected endpoints.

#### Error Handling
The API includes validation checks using express-validator. If validation fails, appropriate error messages are returned to the client. Additionally, any unexpected errors are caught and logged, returning a generic internal server error message.

#### Notes
- Ensure that environment variables such as JWT_SECRET are set up correctly in your environment for JWT generation.
- Adjust the salt rounds in bcrypt as necessary based on your security requirements.
- Consider implementing rate limiting or other security measures to protect against abuse of the registration endpoint.