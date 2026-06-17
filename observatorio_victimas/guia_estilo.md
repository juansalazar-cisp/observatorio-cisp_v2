# Guía de Estilos Web y Componentes:

Este documento traduce los lineamientos del **Manual de Identidad Visual del observatorio de victimas con las especificaciones técnicas para la construcción de la interfaz y el sitio web oficial.
---

## 1. Fundamentos de la Marca y Co-Branding

El sitio web debe reflejar de manera equitativa la alianza entre las entidades firmantes del convenio:
* **Unidad para las Víctimas** (Gobierno de Colombia)
* **CISP** (Comitato Internazionale per lo Sviluppo dei Popoli)
* **Estrategia de Reparación Individual**

### Directrices de Logotipos en Web
* **Header / Navbar:** Ubicar los logotipos en su **Versión a color** sobre un fondo blanco (#ffffff) o gris muy claro para garantizar contraste.
* **Footer / Modos Oscuros:** Utilizar las variantes en **positivo y negativo** (blanco puro sobre fondos oscuros o negro sobre fondos claros) según el comportamiento del componente o la sección de la página.

---

## 2. Sistema Tipográfico (Tipografías Web)

Para el desarrollo frontend se implementarán dos familias tipográficas con jerarquías claras:
### Tipografía Principal: `Nunito Sans`
Se utiliza para la interfaz de usuario, títulos, botones, menús de navegación y el cuerpo de texto principal de la web debido a su alta legibilidad y diseño limpio.

* **Fuentes del Sistema:**
    * `Nunito Sans Light` (Peso: 300) - Lecturas complementarias puntuales.
    * `Nunito Sans Regular` (Peso: 400) - Cuerpo de texto principal (Body).
    * `Nunito Sans SemiBold` (Peso: 600) - Subtítulos de nivel medio, etiquetas.
    * `Nunito Sans Bold` (Peso: 700) - Títulos secundarios (H2, H3), botones.
    * `Nunito Sans Extra Bold` (Peso: 800) - Enfatizados fuertes.
    * `Nunito Sans Black` (Peso: 900) - Títulos principales de sección (H1) o Hero banners.

### Tipografía Complementaria: `Verdana`
**Restricción Web:** No debe usarse para la diagramación ni el diseño de componentes o landing pages del sitio. Su uso queda estrictamente limitado a:
* Contenido dinámico editable de plataformas de correo (Mailing e inserciones HTML sencillas).
* Documentación técnica descargable (Formatos Office integrados o exportados).

---

## 3. Paleta de Colores (Tokens CSS / Tailwind)

Definición de los colores institucionales para la configuración de variables CSS en el sitio:

| Uso / Nombre | Hexadecimal | Código RGB | Composición CMYK (Impresión) |
| :--- | :--- | :--- | :--- |
| **Amarillo Principal** | `#FEC707` | `RGB(255, 200, 0)` | `C:0 - M:23 - Y:93 - K:0` |
| **Rojo Institucional** | `#CD1719` | `RGB(207, 10, 44)` | `C:15 - M:100 - Y:100 - K:0` |
| **Gris Oscuro (Texto Principal)**| `#575756` | `RGB(87, 87, 78)` | `C:0 - M:0 - Y:0 - K:86` |
| **Gris Medio (Bordes/Deshabilitados)**| `#9D9D9C` | `RGB(157, 157, 156)` | `C:0 - M:0 - Y:0 - K:50` |
| **Blanco (Fondos/Negativos)** | `#FFFFFF` | `RGB(255, 255, 255)` | `C:0 - M:0 - Y:0 - K:0` |

---



## 5. Elementos de Contacto y Footer (Pie de Página)

Todos los canales digitales de atención implementados en el sitio web deben incluir de manera visible los siguientes datos unificados:

* **Canal oficial de soporte vía Email:** `reparacion.individual@cispcolombia.org`
* **Enlaces institucionales externos obligatorios:**
    * Unidad para las Víctimas: `unidadvictimas.gov.co`
    * CISP América Latina: `cispalc.org`
* **Leyenda de Identificación:** Todo el personal en territorio opera bajo la consigna *"Reparar también es estar presentes"*, premisa que debe destacar visualmente en los banners informativos de atención ciudadana.

## 6. Imagenes / iconos
* En la carpeta: C:\Users\jcsal\OneDrive\Documentos\dev\observatorio_cisp_v2\observatorio_victimas\src\assets podras encontrar los iconos y logos que debes utilizar, en lo posible no te salgas de estos