This project is scaffold for web application development.
*****

How to use
=====

```shell
$ git clone git@github.com:liu1084/generator-sugar.git
$ cd generator-sugar
$ npm install
$ npm link
```

Generate your web application scaffold
=====
```shell
yo sugar
```



Note
=====

When you want to use `sass` to make your web application layout & style, you must install ruby firstly.

### Step
1. install ruby & make gem in your PATH;
#### linux OS
```shell
export RUBY_HOME=/usr/local/ruby2
export PATH=$PATH:$RUBY_HOME/bin
```

#### window OS
```
set RUBY_HOME="D:\ruby2.2_x64"
set PATH=$PATH;$RUBY_HOME/bin
```
2. install susy & compass & breakpoint
```shell
gem install compass breakpoint susy
```

Enjoy yourself!!