---
layout: post
category: Jekyll
tittle: Jekyll blog set up guide
---

## 安装ruby

**非常重要：目前不要选择3.0版本！！！会导致Jekyll初始化失败！！！**

从[ruby-lang.org](https://ruby-lang.org)选择适合自己版本的安装器下载安装。  

推荐选择`ruby 2.7.4p191 (2021-07-07 revision a21a3b7d23)`版本  

安装完成后记得重启（Windows重启后才会添加环境变量，Linux和macOS可以跳过）

## 安装rubygems

从[rubygems.org](https://rubygems.org/pages/download)下载rubygems的压缩包（随便哪一个），选取一个不含空格和中文的路径解压  

打开终端，输入`cd (你解压的路径，不含括号)`切换至rubygems的目录  

输入`ruby .\setup.rb` (Windows)或`ruby setup.rb` (macOS和Linux)  

## 安装Jekyll和一些插件

输入`gems install jekyll`安装Jekyll  

输入`gems install jekyll-seo-tag`安装（插件）jekyll-seo-tag（SEO优化）  

输入`gems install jekyll-feed`安装（插件）jekyll-feed（rss）

## 创建新的博客

**非常重要：开始下面的步骤之前请保证你终端所处的路径为你博客的路径且下面三种方法任选其一**

### 自己编写博客样式

运行`jekyll new (随便什么名字，不要含空格和汉字)`[^1]  

阅读Jekyll官方wiki编写代码添加样式，Jekyll官方wiki：[jekyllrb.com](https://jekyllrb.com/)  

[点此跳转到注意事项](#自己编写博客所要注意的事项)

### 使用jekyllthemes.org主题中的一个来作为你博客的主题

输入`cd (你博客从Github克隆的路径，不含括号)`[^1]  

*如果你是clone别人的github blog主题，请跳过这一章*  

从[jekyllthemes.org](http://jekyllthemes.org/)中挑选你喜欢的主题，记住主题的名字  
在终端中输入`gems install "你喜欢的主题的名字，含引号"`[^1]安装主题  

### 使用Github上大神们编写的Jekyll主题

将repo克隆到本地，将里面的文件复制到你博客所在的路径  

## 启动博客

如果需要使用subdomain请运行`jekyll new (你选择使用的subdomain，不含括号)`[^1]并再次执行上一章的内容

输入`jekyll serve`[^1]或`jekyll server`[^1]或`jekyll s`[^1]启动Jekyll进程

**非常重要：不能关闭终端，关闭终端的话服务器也会关闭，按`ctrl+C`可以退出**  

在浏览器中输入`127.0.0.1:4000`访问  

## 发布到网络上

### Github Pages

先注册Github账号  

创建以`(你的Github用户名，不含括号).github.io`命名的repo（现在也可以直接在repo的Settings中选择使用Github Pages）

#### *方法1（强烈不推荐）：每次写完文章直接把文章commit to master（那你直接不要在本地搭建这个环境了，脱裤子放屁（逃，哈哈哈）*

#### 方法2：下载Github Desktop或使用git来实时更新至github pages

##### 使用Github Desktop

从[desktop.github.com](https://desktop.github.com/)下载最新版Github Desktop安装  

配置好Github Desktop中你的博客的路径  

每次更改需要填写summary后push origin再commit就可以了

##### git

从[git-scm.com](https://git-scm.com/)中下载最新版git安装  

然后[配置Github的验证](#配置Github的验证)  

输入`git clone (你博客repo地址，不含括号) (本地博客的路径)`[^1]从Github服务器中克隆repo  

从[code.visualstudio.com](https://code.visualstudio.com/)下载Visual Studio Code安装，写文章更加舒服，也可以使用其他编辑器如Sublime  

配置完后写完文章请`git commit -a`[^1]打开编辑器后填入summary关闭推送所有更改，也可以选择性推送更改  

输入`git push`提交更改  

### 使用glitch.me

*不知道该怎么办（逃*

### 直接在服务器上执行此教程

整挺好哈，那你还需要一个git服务器，每次在本地写完文章直接push到服务器刷新，更改样式也是的

## 写文章

使用编辑器打开工作区`_posts`[^1]，在此文件夹下创建`(文章标题，不含括号，详见Jekyll wiki).md`（“_posts”是文章存储目录，一开始应该会有几篇默认的文章，删掉即可），写完保存并提交即可

## 添加独立页面

（视主题而定，有些主题在README里有说明，没有就看目录下的`_config.yml`[^1]文件或者在`_includes`里的某一个yml文件），将其加到yml文件中，再放入`_includes`[^1]里即可

---
{: data-content="Extra"}

## 配置Github的验证

### 创建SSH Key

### 添加到Github中并验证

## 自己编写博客代码所要注意的事项

[^1]:在本地博客路径下执行
