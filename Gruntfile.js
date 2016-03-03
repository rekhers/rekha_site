module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["./public/stylesheets"],
                    yuicompress: true
                },
                files: {
                    "public/stylesheets/home.css": "public/stylesheets/home.less"
                }
            }
        },
        watch: {
            files: "public/stylesheets/*",
            tasks: ["less"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-less');
};

// module.exports = function(grunt) {
//   require('jit-grunt')(grunt);

//   grunt.initConfig({
//     less: {
//       development: {
//         options: {
//           compress: true,
//           yuicompress: true,
//           optimization: 2
//         },
//         files: {
//           "public/stylesheets/home.css": "public/stylesheets/home.less" // destination file and source file
//         }
//       }
//     },
//     watch: {
//       styles: {
//         files: ['less/**/*.less'], // which files to watch
//         tasks: ['less'],
//         options: {
//           nospawn: true
//         }
//       }
//     }
//   });

//   grunt.registerTask('default', ['less', 'watch']);
// };