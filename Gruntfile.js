module.exports = function(grunt) {
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
    sass: {
      build: {
        files: {
          './public/styles/generalStyling.css': './public/styles/main.scss'
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          './public/styles/generalStyling.min.css': './public/styles/generalStyling.css'
        }
      }
    },
    watch: {
      stylesheets: {
        files: ['./public/styles/generalStyling.css', './public/styles/main.scss'],
        tasks: ['sass', 'cssmin']
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
};
