Ok, vamos a reconstruir el sitio completo, empecemos con la pagina pricipal pero seguimos conservando la identidad corporativa con colores simbolos, fuentes e imagenes.
- En la parte superio antes de la galeria debe aparecer un texto que hable de un contexto del observatorio, este texto sera cambiado luego por el indicado, por ahora utiliza texto que quieras.
- Abajo de este texto una defincio de Planes de vida, utiliza cualqueir texto este tambien sera cambiado.
- Luego una seccion de enlaces de interes, estos enlaces vendran de una base de datos como fuente, pero por ahora obtenlos de un json que puedes construir con enlaces dumies
- Luego Requiero una ruleta de imagenes y puedes tomar las imagenes de la carpeta: C:\Users\jcsal\OneDrive\Documentos\dev\observatorio_cisp_v2\observatorio_planesdevida\src\assets\galeria.
- Esta galeria debe conservar el estilo que estamos trabajando.
- Luego una sección con 2 accesos por medio de iconos que conserven la identidad corporativa que venimos trabajando, recuerda que los iconos los puedes encontrar en la carpeta: C:\Users\jcsal\OneDrive\Documentos\dev\observatorio_cisp_v2\observatorio_planesdevida\src\assets como imaginario1, imaginario2...
- Estos iconos deben conectar con otros sitios:
	- Visualización y consulta
	- Reportes y Productos de información
	
Permite al modulo Visualización y Consulta ir a una nueva pagina con estas caracteristicas:
- Genera un mapa interactivo de colombia en donde pueda seleccionar un departamento y muestre información de los planes de vida de organizaciones indigenas
- Debajo de este mapa crea 5 tarjetas con una descripción de estos modulos, estos textos tambien serán cambiados mas adelante por los indicados por el cliente:
	- El módulo “Mi territorio”:  constituye el componente base del observatorio a nivel comunitario, orientado a la recolección, organización y visualización de la información general del territorio y de la comunidad. Su propósito es proporcionar un contexto integral que permita comprender las dinámicas territoriales, socioculturales y organizativas desde una perspectiva situada. 
	Este módulo integra información relacionada con la identidad comunitaria, incluyendo aspectos históricos, culturales y organizativos, así como la caracterización del territorio a partir de su ubicación geográfica y su representación geoespacial.
	“Mi territorio” articula información generada por las comunidades con fuentes secundarias relevantes, tales como datos demográficos, sociales y territoriales provenientes de entidades oficiales, lo que permite enriquecer el análisis y fortalecer los procesos organizativos y de toma de decisiones. Un elemento central del módulo es la incorporación de narrativas propias de las comunidades, a través de las cuales se recogen las formas de relación con el territorio y los elementos simbólicos que lo configuran. Estas narrativas pueden expresarse mediante textos, galerías de imágenes y otros formatos que permitan visibilizar el territorio desde la perspectiva comunitaria. 
	En términos operativos, el módulo funciona como punto de entrada de información para los demás componentes del observatorio, en la medida en que provee las variables contextuales necesarias para la interpretación de los datos asociados a los Planes de Vida, el fortalecimiento organizativo y los procesos comunitarios. 
	- Módulo “Mi Plan de Vida”: El Módulo “Mi Plan de Vida” consolida, organiza y gestiona la información relacionada con el Plan de Vida de cada comunidad, entendido como el principal instrumento de planificación, orientación y proyección del desarrollo propio. Su propósito es transformar este instrumento en información estructurada, sistemática y actualizable, que facilite su consulta, seguimiento y análisis dentro del observatorio.  
	El elemento principal de este módulo es el documento del Plan de Vida comunitario, su estructura interna y los componentes que lo conforman, incluyendo aspectos como líneas estratégicas, avances y desarrollo del mismo. Este módulo está destinado a permitir el seguimiento al nivel de avance del plan, incorporando información sobre su estado (formulación, actualización) y los progresos en su ejecución.
	En términos funcionales, “Mi Plan de Vida” permite desagregar el Plan de Vida en unidades de información que pueden ser analizadas y visualizadas, facilitando su articulación con otros módulos del observatorio, especialmente en lo relacionado con el fortalecimiento comunitario y las dinámicas territoriales. Un elemento central de este módulo es la gestión de permisos diferenciados de acceso y edición, en coherencia con los principios de autonomía y gobernanza de la información. En este sentido: 
	Las comunidades cuentan con permisos para la carga, actualización y validación de la información de su propio Plan de Vida
	El equipo técnico dispone de permisos para la revisión, acompañamiento metodológico y validación de consistencia de la información.
	Los usuarios públicos tendrán acceso restringido a versiones de consulta, previamente definidas, que no comprometen la información sensible para la comunidad. 
	En conjunto, este módulo no solo organiza la información del Plan de Vida, sino que contribuye a su apropiación como herramienta viva de gestión comunitaria, fortaleciendo su uso para la toma de decisiones y la proyección territorial. 
	Módulo Fortalecimiento comunitario 
	Este módulo está orientado a la consolidación, organización y disponibilidad de recursos pedagógicos y metodológicos utilizados en los procesos de fortalecimiento de capacidades con las comunidades. Su propósito es funcionar como repositorio centralizado de contenido que facilite el acceso, la consulta y apropiación de herramientas formativas tanto por parte de los equipos técnicos como de las comunidades.
	Este módulo alberga material asociado a procesos de acompañamiento y formación, tales como presentaciones, herramientas didácticas, instrumentos de trabajo, piezas audivisuales y demás contenidos utilizados en campo. Los recursos se organizan de manera estructurada, permitiendo su clasificación por temáticas, tipo de material, y líneas de fortalecimiento. En términos funcionales, “Fortalecimiento comunitario” permite almacenar, catalogar y recuperar información de manera ágil, facilitando la reutilización de contenidos y evitando la dispersión de materiales en múltiples fuentes 
	- Módulo Tejiendo caminos: El módulo “Tejiendo caminos” se orienta al análisis, diagnóstico y fortalecimiento organizativo de las comunidades, a partir de la identificación de sus capacidades actuales y la construcción de rutas de mejora. Se integran diagnósticos que permiten caracteriza la gestión interna, los procesos organizativos y las prácticas documentales de las comunidades. A través de estos, se identifican capacidades instaladas, necesidades de fortalecimiento, así como posibles cuellos de botella que afectan el desarrollo de sus dinámicas organizativas. 
	A partir de los análisis, el módulo permite establecer análisis comparativos entre el estado actual y un estado ideal o deseado de fortalecimiento, facilitando la definición de rutas de mejora comunitaria. Estas rutas se configuran como orientaciones que priorizan acciones y sugieren estrategias para el cierre de brechas identificadas. 
	En términos funcionales, el módulo permite registrar los resultados de los diagnósticos, sistematizar los hallazgos y estructurar las rutas de mejora, de manera que puedan ser consultadas, actualizadas y utilizadas como guía para los procesos organizativos de las comunidades. Las comunidades pueden consultar los resultados de sus diagnósticos, validar la información y apropiarse de las rutas definidas, mientras que los usuarios externos pueden acceder a capas externas para fines de análisis y toma de decisiones, espetando los principios de confidencialidad y autonomía comunitaria.  
	En conjunto tejiendo caminos funciona como una herramienta de análisis y proyección, que no solo permite diagnosticar el estado de las comunidades, sino también orientar procesos de fortalecimiento desde una lógica participativa, situada y basada en evidencia. 
	Módulo Archivo vivo del territorio
	- Modulo “Archivo vivo del territorio”: está orientado a la preservación, organización y activación de la memoria territorial de las comunidades, concebido como un espacio dinámico que articula narrativas propias, herramientas de planificación comunitaria y mecanismos técnicos de gestión documental. Su propósito es reconocer, resguardar y poner en circulación los saberes, experiencias y registros que configuran la vida territorial, entendiendo a las comunidades como productoras activas de conocimiento. 
	Archivo vivo del territorio integra tanto información estructurada como contenidos narrativos, permitiendo la coexistencia de registros técnicos con expresiones propias de las comunidades, tales como relatos, registros audiovisuales y fotografías que dan cuenta de la relación cultural y simbólica con el territorio.  En términos funcionales, el módulo opera además como un sistema de organización documental que facilita la clasificación, almacenamiento, recuperación y uso de la información comunitaria, para lo cual, incorpora instrumentos técnicos como los cuadros de clasificación documental y las tablas de retención documental, los cuales permiten estructurar archivos de acuerdo con criterios organizativos claros, garantizando su conservación, trazabilidad y adecuada disposición en el tiempo.
- En estas tarjetas conserva el estilo que venimos trabajando.
- Estas tarjetas seran enlace para paginas con informacion de cada una, pero estas pagina slas trabajamos luego.

Vamos al modulo Mi Plan de vida:
- Creememos una seccion inicial: crea 36 tarjetas pequeñas con 36 Planes de vida de las organizaciones indigenas, estas tarjetas deben verse como galeria de imagenes acomodadas en matriz de 5 tarjetas por linea pero conservando el estilo que estamos trabajando; cada link abre un sitio que se va a replicar identicamente para cada comunidad pero lo avanzamos luego.
- Crea en la parte superior de estas tarjetas una barra para buscar y filtrar planes de vida ya que son muchos planes de vida

python "C:\Users\jcsal\OneDrive\Documentos\Proyectos\CISP\Categorias_new_DX2\genera_categorias_new.py" -i "C:\Users\jcsal\OneDrive\Documentos\Proyectos\CISP\COL_CONVENIO_2544_PLANES_VIDA_INSTRUMENTO_DIAGNÓSTICO_BD_Kobo.xlsx"

Ahora vamos con la pagina Visualizacion y consulta:
- crea un espacio para un Dashboard desde Fichas: Pendiente extarer informacion constantemente para actualizar data
- Debajo de Modulos del Observatorio agrega los 36 planes de vida que estan en la pagina Mi plan de vida; muevelos tal cual en diseño, filtros y nombres


Ahora trabajemos con uno de los 36 Planes de vida: Nasa / Cauca que estan en la pagina Visualizacion y Consulta:
Cuando este temrinado lo replicamos para los 36 planes de vida
- Agregar 5 accesos a modulos con las descripciones como estan en la seccion Módulos del Observatorio, estos accesos deben permitir abrir otras paginas para cada una de las opciones:
	- Mi Territorio:
	Aqui vamos a construir una imagen de la parte donde pertenece cada Organizacion, esta imagen será provisional ya que despues la actualizamos puedes agregar una temporal
		- Mapa estatico de Colombia para visulizar donde esta ubicada la organizacion
		- Crea una sección: Contexto Territorial y poblacional, aqui debe ir un texto por ahora agrega uno temporal
		- Crea una seccion: Elementos de identidad y agrega un texto provisional
		- Crea una seccion: Cifras claves del territorio, aqui vamos a tener dos secciones: 
			- Fuentes secuendarias esta en Excel:
				- agrega un icono con el texto: Cartillas; esto permitira descargar un pdf que luego agregamos
				- Agrega un icono con el texto: Bases de datos; aqui podremos ver mas adelante informacion descargable en Excel
	
	Ahora avancemos con el modulo Mi plan de vida: 
		- Crear una seccion con el titulo: Lineas de intervención; agrega un icono para descargar un archivo pdf
		- Crear una seccion con el titulo: Propuesta de formulacion o actualización de plan de vida; agrega un icono para descargar un pdf
		- Crea una seccion con el titulo: Aplicativo de Innovación, este sera un link a utra pagina
		- crea un icono con el titulo: Plan de vida final para descargar un pdf que luego tendresmo disponible
	en el modulo Fortalecimiento comunitario:
		- crea un icono con el texto: Biblioteca digital; este permitira descargar un pdf
		- Crear una seccion con el texto: Biblioteca aula virtual; aqui tendremos unas tarjetas sobre 5 tematicas ofertadas: Economias propias, cuidado y autocuidado, Identiddad cultural buen vivir comunitario, igualdad de genero y derechos; cada tarjeta de cada tematica tendra un texto relacionado que luego podemos mejorar y acceso a un video
	para el modulo Tejiendo Caminos:
		- crear el espacio para un Dashboard que luego tendremos la informacion
		- Crear una seccion con el texto: rutas de mejora; aqui tendremos un texto y un pdf descargable
	Para el modulo Archivo vivo del territorio:
		- Crearemos una seccion con titulo: Experiencia de Memoria comunitaria (historias emblematicas) donde se podra ver una lista de videos que estan en un drive, pero por ahora solo simula los links para luego trabajar en como conectarnos a este drive y traer los videos en forma d elinks que al dar clic pueda verse
		- Crear una seccion con el titulo: Memoria de convenio; este tendra acceso a informacion de una aplicacion externa, luego trabajamos en la conexion a esta fuente de datos
		- Crear una seccion con el titulo: ABC Instrumentos de Gestion Documental; aqui vamos a mostrar una lista de links con acceso a la descarga de documentos pdf, esta lista debe estar relaiconada en un archivo json para poder editarlo

Ahora quiero que trabajaemos en la pagina de administracion que creaste:
- Primero se requiere acceder con usuario y clave, para esto crea un popup, crea un json con usuario y clave para 3 usuarios: admin1, admin, admin3
- unifica los json: planesDeVida.json y organizaciones pero has que no se dañe nada en la logica que esta conectada en las paginas a estos json
- esta pagina debe permitir cambiar los colores de cada organizacion modificando el json que esta asociado para cambiar icono, colores primario y segundario, ademas debe permitir cambiar los textos de las secciones, para ello debes agregar los nodos necesarios al json:
	- Contexto Territorial y poblacional
	- Elementos de identidad
	- Plan de vida final: agrega dinamicamente el nombre y la ruta de este archivo en el json
