# 🧢 CrewLab — Tienda de ropa urbana

**Sitio Web** : https://ucc-tallerdesarrolloweb.github.io/proyecto2025-alterman-peirone/
## 📋 Índice

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Objetivo](#objetivo)
- [Características](#características)
- [Librerías y Recursos](#librerías-y-recursos)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Wireframes](#wireframes)
- [Autores](#autores)

## 📖 Descripción del Proyecto

**CrewLab** es una tienda online de moda urbana con catálogo de **remeras, buzos, pantalones y zapatillas**. El sitio incluye páginas de categoría, vista de **detalle de producto**, carrito persistente con localStorage y una pantalla de **checkout** con validaciones.

### 🎯 Objetivo

Ofrecer una experiencia simple y rápida para explorar productos, ver detalles, armar un carrito y completar los datos de compra desde desktop o mobile.

## ✨ Características

- **Diseño moderno y responsive** que se adapta a cualquier dispositivo
- **Menú hamburguesa** en mobile.
- **Hover de imágenes** en listados (imagen secundaria).
- **Detalle de producto** con galería de miniaturas.
- **Carrito modal persistente** (sumar/restar/eliminar y total en tiempo real).
- **Checkout con validación** (placeholders, mensajes de error y alertas).
- **Metadatos** por página (autor, descripción, keywords).
- **Accesibilidad UI** básica (roles, aria-*, foco y navegación por teclado en el modal).

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Propósito                                  | Versión |
| ---------------- | ------------------------------------------ | ------- |
| **HTML5**        | Estructura semántica y metadatos           | -       |
| **CSS3**         |  Estilos, layout responsive, animaciones simples  | -       |
| **JavaScript**   | Interacciones, carrito, validaciones | ES6+    |
| **LocalStorage** | Persistencia del carrito |-|
| **Google Fonts**          | Tipografia                       | -       |
| **Git/GitHub Pages** | Hosting y despliegue                       | -       |

### 📚 Librerías y Recursos

- **Google Fonts** para tipografías personalizadas
- **SVG Icons** para iconografía vectorial
- **Responsive Design** con CSS Grid y Flexbox

## 📁 Estructura del Proyecto

```
Proyecto-DesarrolloWeb/
├── index.html
├── remeras.html
├── buzos.html
├── pantalones.html
├── zapatillas.html
├── productos.html
├── checkout.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── checkout.js
├── imagenes/
│   ├── FAVICON/
│   │   └── favicon-32x32.png
│   ├── CARRUSEL OFERTAS/
│   │   ├── promocion1.jpg
│   │   ├── promocion5.2.png.jpg
│   │   ├── promocion4.png
│   │   └── polo.avif
│   ├── LOGOS/               
│   ├── REMERAS/
│   ├── BUZOS/
│   ├── PANTALONES/
│   └── ZAPATILLAS/
├── Wireframes/
│   ├── Desktop/
│   └── Mobile/
├── Sketch/
│   ├── Desktop/
│   └── Mobile/
└── README.md

```

## Paginas y Funcionalidades

### 🏠 Página Principal (index.html)

- Carrusel de ofertas.
- Grid de **productos más vendidos** (con efecto hover).
- Sección **Sobre nosotros** + redes.

### 👕Pagina de cada categoría  remeras.html, buzos.html, pantalones.html, zapatillas.html

- Catálogo por categoría con **hover de imagen** y botón **Ver más** → productos.html?id=….

### 🧾 Pagina de cada uno de los productos productos.html

- **Galería** (imagen principal + miniaturas clicables).
- Selección de **talle y cantidad**.
- Botón **“Añadir a mi colección”** → agrega al carrito persistente.
- Ícono de carrito con **badge** de cantidad.

### 🔍 Detalle de compra (checkout.html)

- **Resumen del carrito** (subtotal y total).
- **Formulario** con placeholders y **validaciones** (DNI, número, selects, campos requeridos).
- Mensajes de error y **alerta** si el carrito está vacío.

## 🎨 Wireframes

El proyecto incluye wireframes completos para ambas versiones:

### Desktop

- Página Principal
- Pagina para cada categoría de ropa
- Pagina para cada uno de los productos
- Página Individual

### Mobile

- Adaptaciones responsive de todas las páginas
- Navegación optimizada para touch
- Layout vertical optimizado

## 👥 Autores

| Autor                 | Rol                    | GitHub                                                 |
| --------------------- | ---------------------- | ------------------------------------------------------ |
| **Ivo Alterman** | Desarrollador  | [@ivoalterman](https://github.com/ivoalterman) |
| **German Peirone**  | Desarrollador  | [@Gerpeirone](https://github.com/Gerpeirone) |

---

### 📝 Notas del Proyecto

- **Universidad:** Universidad Católica de Córdoba (UCC)
- **Materia:** Taller de Desarrollo Web
- **Año:** 2025
- **Tipo:** Proyecto Académico - Primer Parcial

### 📄 Licencia

Este proyecto es de uso académico para la Universidad Católica de Córdoba.

---
