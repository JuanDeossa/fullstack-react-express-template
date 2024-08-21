# Este es un template para inicializar una app fullstack utilizando React+TS y Express+TS

## Docker ( base de datos postgresql y prisma )

- Abrir una terminal desde la carpeta raiz
- Tener inicializado docker ( recomendado docker desktop )
- Agregar archivo .env en la raiz ( según .env.template de la raiz )
- Agregar archivo .env en backend/ ( según .env.template de backend/ )
- Agregar archivo .env.local en frontend/ ( según .env.template de frontend )

- verificar que no estén corriendo otros contenedores con igual puerto que los descritos en el docker-compose.yml

```markdown
- docker compose up -d --build ( desde la carpeta raiz )
```

- visualizar contenedores, imagenes y volumenes mediante docker desktop o la consola ( docker ps )
- ejecutar npm i dentro de backend y frontend para que typescript tenga los tipos disponibles