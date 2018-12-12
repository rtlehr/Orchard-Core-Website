/**
 *  Web Dev Grunt.js Documentation
 *
 * @class Grunt.js
 */

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            //Checks for when a .LESS (style sheet) changes and then runs ''less'
            applicationLESS: {
                files: ['_development/css/desktop.less', '_development/css/libs/**/*.less'],
                tasks: ['less:application'],
                options: {}
            },
            applicationMin: {
                files: ['_production/assets/css/application.css'],
                tasks: ['cssmin:application'],
                options: {}
            },
            applicationJsConcat: {
                files: ['_development/js/*'],
                tasks: ['concat:application'],
                options: {}
            },
            allaxJsConcat: {
                files: ['_development/js/allax/**/*'],
                tasks: ['concat:allax'],
                options: {}
            },
            applicationLESSConcat: {
                files: ['_development/css/module-mediaQueries/**/*'],
                tasks: ['concat:mobileLESS', 'concat:tabletLESS', 'concat:desktopLESS'],
                options: {}
            },
            applicationUglify: {
                files: ['_production/assets/js/application.js'],
                tasks: ['uglify:application'],
                options: {}
            }
        },
        /**
         *    Converts LESS code to CSS code
         *
         *    @method less
         **/
        less: {
            application: {
                options: {
                    paths: '/_development/css/libs',
                    imports: {
                        less: ['/_development/css/libs/styleGuide.less', '/_development/css/libs/mixins.less', '/_development/css/libs/layout.less']
                    }
                },
                files: {
                    '_production/assets/css/application.css': '_development/css/application.less'
                }
            }
        },
        /**
         *    Minifies all of the CSS files
         *
         *    @method cssmin
         **/
        cssmin: {
            application: {
                files: {
                    '_production/assets/css/application.min.css': ['_production/assets/css/application.css'],
                }
            }
        },
        /**
         *    Minifies the application.js file
         *
         *    @method uglify
         **/
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery'],
                    beautify: true
                }
            },
            application: {
                files: {
                    '_production/assets/js/allax.min.js': ['_production/assets/js/allax.js']
                }
            },
            allax: {
                files: {
                    '_production/assets/js/application.min.js': ['_production/assets/js/application.js']
                }
            }
        },
        /**
         *    Combines all of the .js files and saves them as application.js
         *
         *    @method concat
         **/
        concat: {
            options: {
                separator: '\n'
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            application: {
                src: ['_development/js/*.js'],
                dest: '_production/assets/js/application.js',
                nonull: true,
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            allax: {
                src: ['_development/js/allax/**/*.js'],
                dest: '_production/assets/js/allax.js',
                nonull: true,
            },
            mobileLESS: {
                src: ['_development/css/module-mediaQueries/rotateImages/mobile.less', '_development/css/module-mediaQueries/events/mobile.less', '_development/css/module-mediaQueries/allax/mobile.less', '_development/css/module-mediaQueries/application/mobile.less', '_development/css/module-mediaQueries/menu/mobile.less'],
                dest: '_development/css/mobile.less',
                nonull: true,
            },
            tabletLESS: {
                src: ['_development/css/module-mediaQueries/rotateImages/tablet.less', '_development/css/module-mediaQueries/events/tablet.less', '_development/css/module-mediaQueries/allax/tablet.less', '_development/css/module-mediaQueries/application/tablet.less', '_development/css/module-mediaQueries/menu/tablet.less'],
                dest: '_development/css/tablet.less',
                nonull: true,
            },
            desktopLESS: {
                src: ['_development/css/module-mediaQueries/rotateImages/desktop.less', '_development/css/module-mediaQueries/events/desktop.less', '_development/css/module-mediaQueries/allax/desktop.less', '_development/css/module-mediaQueries/application/desktop.less', '_development/css/module-mediaQueries/menu/desktop.less'],
                dest: '_development/css/desktop.less',
                nonull: true,
            }
        },
        jsbeautifier: {
            files: ["_development/js/**/*.js", "GruntFile.js", "_production/*.html"],
            options: {
                js: {
                    indentWithTabs: true
                }

            }
        }

    });

    // Default task.
    //grunt.registerTask('default', ['less','concat','uglify','cssmin','watch']);
    grunt.registerTask('default', ['concat', 'less', 'cssmin', 'uglify', 'watch']);

};