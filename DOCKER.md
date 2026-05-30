# Guía de Despliegue con Docker - JSA Rendición

Este proyecto está contenedorizado utilizando Docker para proporcionar un entorno consistente tanto para el frontend (Angular) como para el backend (`json-server`).

## Arquitectura

- **Frontend**: Aplicación Angular servida por Nginx.
- **Backend**: `json-server` que proporciona una API REST basada en el archivo `db.json`.

## Primeros Pasos

### Ejecutar Todo el Sistema (Recomendado)

La forma más sencilla de iniciar toda la aplicación es utilizando Docker Compose.

1. **Iniciar los servicios**:
   ```bash
   docker-compose up -d
   ```

2. **Acceder a la aplicación**:
   - Frontend: [http://localhost](http://localhost)
   - API del Backend: [http://localhost:3000](http://localhost:3000)

3. **Detener los servicios**:
   ```bash
   docker-compose down
   ```

---

## Ejecución de Servicios por Separado

Si necesitas aislar o depurar un componente específico, puedes ejecutarlos independientemente.

### 1. Solo el Backend

**Construir la imagen**:
```bash
docker build -f Dockerfile.backend -t jsa-backend .
```

**Ejecutar el contenedor**:
```bash
docker run -d -p 3000:3000 -v $(pwd)/db.json:/app/db.json --name jsa-backend-container jsa-backend
```
*Nota: La bandera `-v` asegura que los cambios en `db.json` en tu máquina local se reflejen en el contenedor y viceversa.*

### 2. Solo el Frontend

**Construir la imagen**:
```bash
docker build -t jsa-frontend .
```

**Ejecutar el contenedor**:
```bash
docker run -d -p 80:80 --name jsa-frontend-container jsa-frontend
```
*Nota: Si el frontend se ejecuta por separado, intentará conectarse al backend. Es posible que necesites ajustar la URL de la API en los servicios de Angular si el backend no se encuentra en la misma máquina o utiliza un puerto diferente.*

---

## Detalles de Configuración

### Mapeo de Puertos
| Servicio | Puerto Contenedor | Puerto Host | URL |
| :--- | :--- | :--- | :--- |
| Frontend | 80 | 80 | http://localhost |
| Backend | 3000 | 3000 | http://localhost:3000 |

### Proxy de Nginx
El frontend está configurado con un `nginx.conf` personalizado que redirige las solicitudes que comienzan con `/api` al servicio `backend`. Esto ayuda a evitar problemas de CORS al ejecutar en Docker.

## Solución de Problemas

- **Fallo en la construcción**: Asegúrate de tener Docker instalado y de ejecutar los comandos desde la raíz del proyecto.
- **El Frontend no se conecta al Backend**: 
    - Si usas `docker-compose`, asegúrate de que el nombre del servicio en `nginx.conf` coincida con el nombre del servicio en `docker-compose.yml` (`backend`).
    - Si los ejecutas por separado, asegúrate de que el backend sea accesible en la URL especificada en tus servicios de Angular.
- **Los datos no persisten**: Asegúrate de que el montaje del volumen para `db.json` esté correctamente configurado en el comando `docker run` o en `docker-compose.yml`.
