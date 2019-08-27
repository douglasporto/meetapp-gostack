<h1 align="center">
    <img alt="Go Stack logo" src="https://github.com/douglasporto/meetapp-gostack/blob/master/assets/logo-gostack.png" />
    <br>
    MEETAPP challenge
</h1>

<h4 align="center">
  A challenge for [Rocketseat Certificate](https://rocketseat.com.br/bootcamp)
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/douglasporto/meetapp-gostack.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/douglasporto/meetapp-gostack.svg">

  <a href="https://www.codacy.com/app/douglasporto/meetapp-gostack?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=douglasporto/meetapp-gostack&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://api.codacy.com/project/badge/Grade/7e5f576735a2406680f07df42ddce82b">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/douglasporto/meetapp-gostack.svg">
  <a href="https://github.com/douglasporto/meetapp-gostack/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/douglasporto/meetapp-gostack.svg">
  </a>

  <a href="https://github.com/douglasporto/meetapp-gostack/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/douglasporto/meetapp-gostack.svg">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/douglasporto/meetapp-gostack.svg">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-how-to-use">How To Use</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

![App Screenshot](https://github.com/douglasporto/meetapp-gostack/blob/master/assets/screenshoot.png)
![App Screenshot](https://github.com/douglasporto/meetapp-gostack/blob/master/assets/screenshoot2.png)

## :rocket: Technologies

This project was developed to get the [RocketSeat GoStack Bootcamp](https://rocketseat.com.br/bootcamp) certificate with the following technologies:

### FRONT-END
-  [ReactJS](https://reactjs.org/)
-  [Create React App Configuration Override](https://github.com/sharegate/craco)
-  [Redux](https://redux.js.org/)
-  [Redux-Saga](https://redux-saga.js.org/)
-  [React Router v4](https://github.com/ReactTraining/react-router)
-  [styled-components](https://www.styled-components.com/)
-  [Axios](https://github.com/axios/axios)
-  [History](https://www.npmjs.com/package/history)
-  [Immer](https://github.com/immerjs/immer)
-  [Polished](https://polished.js.org/)
-  [React-Toastify](https://fkhadra.github.io/react-toastify/)
-  [React-Icons](http://react-icons.github.io/react-icons/)
-  [react-perfect-scrollbar](https://github.com/OpusCapita/react-perfect-scrollbar)
-  [Unform](https://github.com/Rocketseat/unform)
-  [Yup](https://www.npmjs.com/package/yup)
-  [date-fns](https://date-fns.org/)
-  [Reactotron](https://infinite.red/reactotron)
-  [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

### BACK-END
-  [Node.js][nodejs]
-  [Express](https://expressjs.com/)
-  [nodemon](https://nodemon.io/)
-  [Sucrase](https://github.com/alangpierce/sucrase)
-  [Docker](https://www.docker.com/docker-community)
-  [Sequelize](http://docs.sequelizejs.com/)
-  [PostgreSQL](https://www.postgresql.org/)
-  [node-postgres](https://www.npmjs.com/package/pg)
-  [Redis](https://redis.io/)
-  [MongoDB](https://www.mongodb.com/)
-  [Mongoose](https://mongoosejs.com/)
-  [JWT](https://jwt.io/)
-  [Multer](https://github.com/expressjs/multer)
-  [Bcrypt](https://www.npmjs.com/package/bcrypt)
-  [Youch](https://www.npmjs.com/package/youch)
-  [Yup](https://www.npmjs.com/package/yup)
-  [Bee Queue](https://www.npmjs.com/package/bcrypt)
-  [Nodemailer](https://nodemailer.com/about/)
-  [date-fns](https://date-fns.org/)
-  [Sentry](https://sentry.io/)
-  [DotEnv](https://www.npmjs.com/package/dotenv)
-  [VS Code][vc] with [ESLint][vceslint]

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v10.15][nodejs] or higher + [Yarn v1.5][yarn] or higher installed on your computer and the [First React Project](https://github.com/douglasporto/meetapp-gostack). From your command line:

### Install API
```bash
# Clone this repository
$ git clone https://github.com/douglasporto/meetapp-gostack

# Go into the repository
$ cd meetapp-gostack/api

# Install dependencies
$ yarn install

# Created Postgree Docker container
$ docker run --name database_meetapp -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres

# Created Mongo Docker container
$ docker run --name mongo_bmstarter -p 27017:27017 -d -t mongo

# Run Migrates
$ yarn migrate

# Run Seeds
$ yarn seed

# Run the API
$ yarn dev
```

### Install Front
```bash

# Go into the front path
$ cd meetapp-gostack/front

# Install dependencies
$ yarn install

# Run the API
$ yarn start
```

## :memo: License
This project is under the MIT license. See the [LICENSE](https://github.com/douglasporto/meetapp-gostack/blob/master/LICENSE) for more information.

---

Made with ♥ by Douglas Porto :wave: [Get in touch!](https://www.linkedin.com/in/douglas-porto/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
