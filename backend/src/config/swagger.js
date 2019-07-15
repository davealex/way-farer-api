import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'WayFarer API',
      version: '1.0.0',
      description: 'A public bus transportation booking server',
    },
    schemes: {
      https: 'https',
      http: 'http',
    },
  },
  // List of files to be processed. You can also set globs '../routes/*.js'
  apis: ['./backend/routes/api/v1/api.js'],

};

const specs = swaggerJsdoc(options);

export default specs;
