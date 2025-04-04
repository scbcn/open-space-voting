# 🗳️ Open Space Voting

Una aplicación web para gestionar votaciones en eventos tipo Open Space de manera sencilla y transparente.

## 🚀 Características

- Sistema de votación para Open Space
- Panel de administración
- Visualización de resultados
- Interfaz intuitiva y responsive
- Autenticación segura con Google y Github

## 🛠️ Tecnologías

- Next.js 15
- TypeScript
- MongoDB
- Tailwind CSS
- NextAuth.js

## 📋 Prerrequisitos

- Node.js 22 o superior
- MongoDB
- npm , pnpm o yarn

## 🔧 Instalación

1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/open-space-voting.git
cd open-space-voting
```

2. Instala las dependencias
```bash
npm install
# o
yarn install
```

3. Configura las variables de entorno
```bash
cp .env.example .env.local
```
Edita el archivo `.env.local` con tus configuraciones

4. Inicia el servidor de desarrollo
```bash
npm run dev
# o
yarn dev
```

## 🔑 Variables de Entorno

Asegúrate de configurar las siguientes variables en tu `.env.local`:

```env
MONGODB_URI=tu_uri_de_mongodb
NEXTAUTH_SECRET=tu_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## 🤝 Cómo Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📝 Convenciones de Código

- Utiliza TypeScript para todo el código
- Sigue el estilo de código existente
- Escribe pruebas para las nuevas características
- Documenta las funciones y componentes nuevos

## 📄 Estructura del Proyecto

```
open-space-voting/
├── app/                    # Rutas y páginas de Next.js
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuraciones
├── public/               # Archivos estáticos
└── styles/              # Estilos globales
```


## 📚 Documentación Adicional

Para más información sobre las tecnologías utilizadas:

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [NextAuth.js Documentation](https://next-auth.js.org)

