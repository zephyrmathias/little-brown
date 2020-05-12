# Little Brown Book Shop
GitHub Repo: https://github.com/zephyrmathias/little-brown

This website will be available at: https://brave-wright-2b6e3a.netlify.app

## Project setup
```
npm install
```

### How to run this project on local machine
```
npm run serve
```

### Run your unit tests
```
npm run test:unit
```

### Build the file for Production environment
Update `VUE_APP_API_URL` in `.env` file to be your API URL
and run following command
```
npm run build
```
You will get the `dist` directory for built files

### Build the file for Staging environment
Update `VUE_APP_API_URL` in `.env.staging` file to be your API URL
and run following command
```
npm run build:staging
```
You will get the `dist` directory for built files
