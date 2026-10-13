# Cómo usar el sitio público

Sitio estático de presentación: `index.html` y `styles.css`. No tiene scripts, no llama a la API y no carga nada de otros servidores.

## Verlo

Abre `index.html` en el navegador. No necesita servidor.

## Pruebas (T-23)

```bash
npm install
npm test
```

Abren la página desde el disco en 375 px y en 1280 px de ancho y comprueban que se ve completa, que no hay scroll horizontal y que no hace ninguna petición fuera del disco. Usan el navegador Edge ya instalado; para usar Chrome, define `PW_CHANNEL=chrome`.
