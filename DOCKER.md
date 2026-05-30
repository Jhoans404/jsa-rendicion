# Docker Deployment Guide - JSA Rendición

This project is containerized using Docker to provide a consistent environment for both the frontend (Angular) and the backend (`json-server`).

## Architecture

- **Frontend**: Angular application served by Nginx.
- **Backend**: `json-server` providing a REST API based on `db.json`.

## Getting Started

### Running Everything Together (Recommended)

The easiest way to start the entire application is using Docker Compose.

1. **Start the services**:
   ```bash
   docker-compose up -d
   ```

2. **Access the application**:
   - Frontend: [http://localhost](http://localhost)
   - Backend API: [http://localhost:3000](http://localhost:3000)

3. **Stop the services**:
   ```bash
   docker-compose down
   ```

---

## Running Services Separately

If you need to isolate or debug a specific component, you can run them independently.

### 1. Backend Only

**Build the image**:
```bash
docker build -f Dockerfile.backend -t jsa-backend .
```

**Run the container**:
```bash
docker run -d -p 3000:3000 -v $(pwd)/db.json:/app/db.json --name jsa-backend-container jsa-backend
```
*Note: The `-v` flag ensures that changes to `db.json` on your host machine are reflected in the container and vice-versa.*

### 2. Frontend Only

**Build the image**:
```bash
docker build -t jsa-frontend .
```

**Run the container**:
```bash
docker run -d -p 80:80 --name jsa-frontend-container jsa-frontend
```
*Note: If the frontend is running separately, it will attempt to connect to the backend. You may need to adjust the API URL in the Angular services if the backend is not running on the same machine or is on a different port.*

---

## Configuration Details

### Port Mappings
| Service | Container Port | Host Port | URL |
| :--- | :--- | :--- | :--- |
| Frontend | 80 | 80 | http://localhost |
| Backend | 3000 | 3000 | http://localhost:3000 |

### Nginx Proxy
The frontend is configured with a custom `nginx.conf` that proxies requests starting with `/api` to the `backend` service. This helps avoid CORS issues when running in Docker.

## Troubleshooting

- **Build fails**: Ensure you have Docker installed and that you are running the commands from the project root.
- **Frontend cannot connect to Backend**: 
    - If using `docker-compose`, ensure the service name in `nginx.conf` matches the service name in `docker-compose.yml` (`backend`).
    - If running separately, ensure the backend is accessible at the URL specified in your Angular services.
- **Data not persisting**: Ensure the volume mount for `db.json` is correctly configured in the `docker run` command or `docker-compose.yml`.
