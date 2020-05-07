export const config = {
  "postgress": {
    "username": process.env.POSTGRESS_USERNAME, // "udagramnaskadev",
    "password": process.env.POSTGRESS_PASSWORD, // "udagramnaskadev",
    "database": process.env.POSTGRESS_DATABASE, // "udagramnaskadev",
    "host": process.env.POSTGRESS_HOST, // "udagramnaskadev.cxubidwohfa4.eu-central-1.rds.amazonaws.com",
    "dialect": "postgress"
  },
  "dev": {
    "username": "udagramnaskadev",
    "password": "udagramnaskadev",
    "database": "udagramnaskadev",
    "host": "udagramnaskadev.cxubidwohfa4.eu-central-1.rds.amazonaws.com",
    "dialect": "postgres",
    "aws_region": "eu-central-1",
    "aws_profile": "default",
    "aws_media_bucket": "udagram-naska-dev"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  },
  "jwt": {
    "secret": "helloworld"
  }
}
