# Proyecto Node.js con Express

Este proyecto es una aplicación web construida con Node.js y Express.

## Requisitos

- Node.js (v16.20)
- npm (v8.x o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jorbinogales/challenge-backend
    ```
2. Instala las dependencias:

    ```bash
    npm install
    ```
## Configuración

1. Crea un archivo .env

     ```bash
       PORT=4002
       JWT_SECRET_KEY=mysecretkeys
       ORIGIN=http://localhost:4200
    ```
2. Descarga el archivo JSON de la cuenta de servicio de Firebase y colócalo en la carpeta `config` de tu proyecto. Renómbralo a `service-account.json`.

Si no tienes este archivo, debes solicitarlo en la consola de Firebase:

- Ve a [Firebase Console](https://console.firebase.google.com/)
- Selecciona tu proyecto.
- Navega a **Configuración del proyecto** > **Cuentas de servicio**.
- Genera una nueva clave privada JSON para esta cuenta de servicio y descarga el archivo.

## Ejecución

Para iniciar el proyecto, ejecuta el siguiente comando:
```bash
PORT=4002
JWT_SECRET_KEY=mysecretkeys
ORIGIN=http://localhost:4200
   ```
Esto iniciará el servidor en el puerto especificado en el archivo .env.

## Estructura del Proyecto

```bash
.
├── src
│   ├── common
│   │   ├── config
│   │   ├── dto
│   │   ├── exceptions
│   │   ├── interface
│   │   ├── middlewares
│   │   ├── models
│   │   ├── pipe
│   │   ├── routes
│   │   └── utils
│   ├── components
│   │   ├── task
│   │   └── users
│   └── app.js
├── .env
├── package.json
└── README.md
   ```