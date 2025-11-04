# Docker Setup Guide for Blog Application

## Prerequisites
- Docker Desktop installed on your computer
- Docker Compose installed (comes with Docker Desktop)

## Quick Start

### 1. Start the Application

From the project root directory, run:

```bash
docker-compose up -d
```

This will:
- Create a MongoDB container
- Create a backend API container
- Set up networking between them

### 2. Check if Containers are Running

```bash
docker-compose ps
```

You should see both `blog-mongodb` and `blog-backend` running.

### 3. View Logs

To see backend logs:
```bash
docker-compose logs -f backend
```

To see MongoDB logs:
```bash
docker-compose logs -f mongodb
```

### 4. Stop the Application

```bash
docker-compose down
```

To stop and remove all data (including database):
```bash
docker-compose down -v
```

## Configuration

### MongoDB Connection
- **Host:** localhost
- **Port:** 27017
- **Username:** admin
- **Password:** admin123
- **Database:** blog_db

### Backend API
- **Port:** 3001
- **URL:** http://localhost:3001

### Frontend
The frontend runs separately with Vite. To start it:
```bash
npm run dev
```

## Useful Commands

### Rebuild Containers
If you make changes to the Dockerfile or dependencies:
```bash
docker-compose up -d --build
```

### Access MongoDB Shell
```bash
docker exec -it blog-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin
```

### Access Backend Container
```bash
docker exec -it blog-backend sh
```

### View All Logs
```bash
docker-compose logs -f
```

## Troubleshooting

### Port Already in Use
If port 3001 or 27017 is already in use, edit `docker-compose.yml` and change the ports:
```yaml
ports:
  - "3002:3001"  # Change 3002 to any available port
```

### Database Connection Issues
1. Make sure MongoDB container is running: `docker-compose ps`
2. Check backend logs: `docker-compose logs backend`
3. Verify DATABASE_URL in backend/.env

### Reset Everything
To completely reset the application and database:
```bash
docker-compose down -v
docker-compose up -d
```

## Development Workflow

1. Start Docker containers: `docker-compose up -d`
2. Start frontend: `npm run dev`
3. Make changes to your code
4. Backend will auto-reload (nodemon)
5. Frontend will hot-reload (Vite)

## Production Notes

Before deploying to production:
1. Change MongoDB username and password
2. Change JWT_SECRET to a strong random string
3. Update CORS settings in backend/src/app.js
4. Use proper MongoDB connection string with authentication
