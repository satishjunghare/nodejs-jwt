## JWT Integration with Restfull API
Built Users API's where integrated JWT for authentication. 

### API's
User registration
```
POST: /auth/register
JSON BODY: {
    "username": "youremail@gmail.com",
    "password": "your_password"
}
```

User login
```
POST: /auth/login
JSON BODY: {
    "username": "youremail@gmail.com",
    "password": "your_password"
}
```

Get all registered users
```
POST: /users
HEADERS: Authentication: {Token}
```

### Install Dependencies
```
npm init
npm install
```

### Start App
```
nodemon app.js
```