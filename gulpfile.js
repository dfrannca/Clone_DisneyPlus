const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// Tarefa para minificar os scripts
function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

// Tarefa para compilar o SASS em CSS comprimido
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

// Tarefa para otimizar as imagens
function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// Tarefa de build que roda as outras tarefas
function build(done) {
    gulp.parallel(styles, images, scripts)();
    done(); // Sinaliza a conclusão
}

// Exportando as tarefas
exports.build = build; // Definindo a tarefa 'build'
exports.default = gulp.parallel(styles, images, scripts); // Tarefa padrão
exports.watch = function () {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
};
