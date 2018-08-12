# react-redux-graphql-starter

Full-stack GraphQL application with React, redux, and Apollo 2, with full backend passport and mongo support

## Running the app

### 0. environment requirement

```
install mongodb
```

### 1. start server

```
cd server
npm install
cp .env.sample .env
configure MONGODB_URL in .env
npm start
create admin user: curl -H "Content-Type:application/json" -X POST --data '{"username": "admin", "password":"admin"}' http://localhost:4000/signup
```

### 2. start client

```
cd client
npm install
npm start
open http://localhost:3000, use admin/admin to login
```

## Tutorial

* [full stack graphql tutorial](https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b)
* [add redux to create-react-app](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)

## Features

* coreui-react: [CoreUI Free React.js Admin Template](https://github.com/coreui/coreui-free-react-admin-template)
* [redux-form](https://github.com/erikras/redux-form)
* [redux-thunk](https://github.com/reduxjs/redux-thunk)
* [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)
* react-router v4
* apollo-client v2.3 with subscription
* graphql server
* apollo upload
* mongo, passport, jwt support
* full sign/signout flow

## Support

Any suggestion is welcome. Feel free to submit issues if you want.

## License

MIT