/*
 * The MIT License
 *
 * Copyright (c) 2015-2016 by Jim liu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var util = require('util');
var path = require('path');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var generators = require('yeoman-generator');
var universalCopy = require('universal-copy');

var SugarAppGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    initializing: function () {
        this.log('angular application generator is running...');
        this.pkg = require('../../package.json');
    },
    prompting: function () {
        var done = this.async();
        this.log(yosay('Welcome to sugar web application development!'));
        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: '(1/5)What\'s the name of project?',
                default: 'web-app-sugar',
                validate: function (input) {
                    if (/^([a-zA-Z0-9_-]*)$/.test(input)) return true;
                    return 'Your application name cannot contain special characters or a blank space, using the default name instead';
                },
                store: true
            }
        ];

        this.prompt(prompts, function (answers) {
            this.projectName = answers.projectName;
            done();
        }.bind(this));
    },
    writing: {
        setupEnv: function () {
            console.log(this.projectName);

            this.SOURCE = this.projectName + '/src';
            this.TEST = this.projectName + '/test';
            this.VENDOR = this.projectName + '/vendor';
            this.BUILD = this.projectName + '/build';
            this.DIST = this.projectName + '/dist';

            this.mkdir(this.SOURCE);
            this.mkdir(this.TEST);
            this.mkdir(this.VENDOR);
            this.mkdir(this.BUILD);
            this.mkdir(this.DIST);

            this.mkdir(this.SOURCE + '/app');
            this.PLUGIN = this.SOURCE + '/plugin';
            this.mkdir(this.PLUGIN);
            this.mkdir(this.SOURCE + '/assets');
            this.mkdir(this.SOURCE + '/common');
            this.mkdir(this.SOURCE + '/sass');

            //create MVC directories
            this.mkdirp(this.SOURCE + '/app/controllers');
            this.mkdirp(this.SOURCE + '/app/services');
            this.mkdirp(this.SOURCE + '/views');

            //create assets directories
            this.mkdirp(this.SOURCE + '/assets/css');
            this.mkdirp(this.SOURCE + '/assets/img');

            this.copy('static/img/favicon.ico', this.SOURCE + '/assets/img/favicon.ico', this, {});
            universalCopy('static/fonts', this.SOURCE + '/assets/fonts', this, {});
            this.copy('config/_template.js', this.PLUGIN + '/template.js', this, {});
            this.template('static/html/index.html', this.SOURCE + '/index.html', this, {});
        },

        readMe: function(){
            this.template('config/_README.md', this.projectName + '/README.md', this, {});
        },

        bower: function () {
            this.template('config/_bower.json', this.projectName + '/bower.json');
            this.template('config/_bowerrc', this.projectName + '/\.bowerrc', this, {});
        },

        jsHint: function () {
            this.copy('config/_jshintrc', this.projectName + '/\.jshintrc', this, {});
        },

        cssHint: function () {
            this.copy('config/_csshintrc', this.projectName + '/\.csshintrc', this, {});
        },

        htmlHint: function () {
            this.copy('config/_htmlhintrc', this.projectName + '/\.htmlhintrc', this, {});
        },

        gruntfile: function () {
            this.copy('config/_Gruntfile.js', this.projectName + '/Gruntfile.js', this, {});
        },

        packageJSON: function () {
            this.template('config/_package.json', this.projectName + '/package.json', this, {});
        },

        //license
        license: function(){
            this.copy('config/_LICENSE', this.projectName + '/LICENSE', this, {});
        },

        //git
        git: function(){
            this.copy('config/_gitignore', this.projectName + '/\.gitignore', this, {});
        }
    },

    install: function () {
        var done = this.async();
        //UX dependencies
        this.spawnCommand('cnpm', ['install', '--save'], {cwd: this.projectName}).on('exit', function () {
            this.spawnCommand('bower', ['install', '--save'], {cwd: this.projectName});
            done();
        }.bind(this));
        this.log('Done.');
    },
    end: function () {
        var done = this.async();
        this.log('Thanks to your using this application for your scaffolding...');
        this.log('will be installed, please waiting for a moment.');
        this.log('If errors, please run `cnpm install & bower install` manual on console.');
        done();
    }
});
module.exports = SugarAppGenerator;