# N28 API

## Setup
- Docker w/ Nodemon
- Debug directly in VSCode
- ES6 w/ Babel
- Gulp Tasks
- ESLint
- Unit Testing

## Prerequisites
- [Docker](https://www.docker.com/community-edition)
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [VSCode](https://code.visualstudio.com) (Recommended)

### Build
```bash
$ yarn install
$ yarn build #or run Build Task in VSCode
```

### Launch in Dev (w/ Nodemon)
```bash
$ yarn start #for hot-reload just build in VSCode
```

### Debug
```bash
$ yarn start
# Then just put some breakpoints and start "Localhost" config in Debug panel
# VSCode debugger will just attach to the docker node instance
```

### Test
```bash
$ yarn lint
$ yarn test
```

### Cleanup
```bash
$ yarn reset
# If you respond "y" you will loose every data in your databases
```