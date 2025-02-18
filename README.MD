# Nova Server

![status badge](https://badgen.net/badge/status/in_dev/yellow)

### Run Server

- `npm` to install dependencies
```sh
npm install
```
- Fill `.env.example` and save as `.env`
```shell
DATABASE_URL = 
PORT = 
API_PREFIX = 
JWT_SECRET= 
```

- Prisma Generator & Database Generator
```sh
- npx prisma generate
- npx prisma migrate dev --name init
```

- Start development
```sh
npm run dev
```

- Build for Production
```sh
npm run build
```

- Run server for Production
```sh
npm start
```
- You can view the API document by running `http://localhost:{PORT}/docs`.
