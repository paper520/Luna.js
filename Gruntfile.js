'use strict';

var source = [

    './src/tool.js',

    /**
     * -------------
     * 对外提供的，常用web端编程方法
     */

    // 和剪切板有关的方法
    './src/clipboard.js',

    // 动画/轮播相关方法
    './src/animation.js',

    // 操作html/svg结点相关
    './src/dom.js'

];

var banner = '/*!\n' +
    '* luna.js - <%= pkg.description %>\n' +
    '* <%= pkg.repository.url %>\n' +
    '* \n' +
    '* author <%= pkg.author %>\n' +
    '*\n' +
    '* version <%= pkg.version %>\n' +
    '* \n' +
    '* build Sat Jul 01 2017\n' +
    '*\n' +
    '* Copyright yelloxing\n' +
    '* Released under the <%= pkg.license %> license\n' +
    '* \n' +
    '* Date:' + new Date() + '\n' +
    '*/\n';

module.exports = function (grunt) {
    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        insert: { // 合并代码
            options: {
                banner: banner,
                link: "\n"
            },
            target: {
                options: {
                    separator: '// @CODE build.js inserts compiled luna.js here',
                    target: 'src/core.js'
                },
                files: {
                    'build/luna.js': source
                }
            }
        },
        jshint: { //语法检查
            options: { //语法检查配置
                '-W064': true,
                "strict": true,
                "eqnull": true,
                "undef": true,
                "globals": {
                    "window": true,
                    "navigator": true,
                    "document": true,
                    "console": true,
                    "module": true,
                    "setInterval": true,
                    "clearInterval": true,
                    "Math": true,
                    "SVGElement": true,
                    "HTMLCollection": true,
                    "CanvasRenderingContext2D": true,
                    "WebGLRenderingContext": true,
                    "NodeList": true,
                    "XMLHttpRequest": true,
                    "SVGSVGElement": true,
                    "ActiveXObject": true,
                    "Event": true,
                    "define": true,
                    "exports": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            target: 'build/luna.js'
        },
        uglify: { //压缩代码
            options: {
                banner: banner
            },
            target: {
                options: {
                    mangle: true
                },
                files: [{
                    'build/luna.min.js': ['build/luna.js']
                }]
            }
        },
        connect: {
            server: {//本地服务器
                options: {
                    keepalive: true,
                    port: 20000,
                    base: '.'
                }
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-plug-insert');

    /*注册任务*/
    grunt.registerTask('release', ['insert:target', 'jshint:target', 'uglify:target']);
    grunt.registerTask('server', ['connect:server']);
};
