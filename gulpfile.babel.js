import gulp from 'gulp'
import browserSync from 'browser-sync' /* servidor en tiempo real */
import plumber from 'gulp-plumber' /* evita que se crasehe el proseso de node */
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps' /* mapas de origen guardan registos de linea en codigo original */
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream' /* mejor optimizacion */
import buffer from 'vinyl-buffer' /* mejor manejo lo paquetes que gulp recibe */
import jsmin from 'gulp-jsmin'
import imagemin from 'gulp-imagemin'
import wpPot from 'gulp-wp-pot' /* genera plantilla .pot para manejar traducciones Poedit */
import sort from 'gulp-sort' /* permite ordenar archivos php a  gulp-wp-pot*/


const reload = browserSync.reload,
reloadFiles =[
    './script.js',
    './style.css',
    './**/*.php'
],

proxyOptions={
    proxy:'wocker.test/',
    notify:false
},

imageminOptions={
    progressive:true,
    optimizationLevel:7,//0-7 low-high
    interlaced:true, /* interlazado */
    svgoPlugins:[{removeViewBox:false}] /* para img svg remueva viewBox */
},
wpPotOptions = {
    domain: 'cinecoder', 
    package: 'cinecoder',
    lastTranslator: 'Irving Mendoza <irving@webdesignrs.com>'
  },
potFile = './languages/en_US.pot' /* en que carpeta se guarda */

/* 4 tareas de gulp task, src, dest, watch */
gulp.task('server', () => browserSync.init(reloadFiles, proxyOptions)) /* iniciar la tarea y  asi correr el servidor, recargando automaticamen los archivos "reloadFiles" */

gulp.task('css',()=>{
    gulp.src('./css/style.scss') /*depues de recibir src entran todos los plugins para css*/
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber()) /* si detecta algun error de sinaxis no crashee */
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(cleanCSS())/* minifique */
    .pipe(sourcemaps.write('./css/'))/* donde quiero escribir los sourcemaps */
    .pipe(gulp.dest('./'))/* destino en raiz de mi carpeta */
    .pipe(reload({ stream: true })) /* recargue en mi hoja de estilos sass */

})

gulp.task('js', () => {
    browserify('./js/index.js')
      .transform(babelify)
      .bundle()
      .on('error', err => console.log(err.message))
      .pipe(source('script.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./js/'))
      .pipe(jsmin())
      .pipe(gulp.dest('./'))
      .pipe(reload({ stream: true }))
  })


  gulp.task('img', () => {
    gulp.src('./img/raw/**/*.{png,jpg,jpeg,gif,svg}')
      .pipe(imagemin(imageminOptions)) /* optimizar con pugin image min */
      .pipe(gulp.dest('./img')) 
      /* esta tarea solo se ejecutara uan vez y no entrara a la tarea por default */
  })

  gulp.task('translate', () => { /* traduccion */
    gulp.src('./**/*.php') /* busca todos los archivos php y sub */
      .pipe(sort()) /*  ordenalos para wpPot*/
      .pipe(wpPot(wpPotOptions)) /* recibe opciones */
      .pipe(gulp.dest(potFile)) /* donde se alojara el archivo archivo potfile */
  })
 
  
  

gulp.task('default', ['server','css','js'], () => {  /* por default ejecuta la tarea al poner en terminal solo gulp */
    gulp.watch('./css/**/*.+(scss|css)', ['css']) /* que observe cualquier cambio en archivos scss o css en la carpeta css y ejecute tare css*/
    gulp.watch('./js/**/*.js', ['js']) /* que observe cualquier cambio cualquier  archivo js en la carpeta js y ejecute tare js*/
  })



  