---
layout: post
title: 在 Arch Linux（Manjaro）下使用 Waydroid 运行 Android Apps
date: 2023-01-27 12:01:00
categories: Manjaro Arch Linux
tags: Manjaro Linux Arch
author: Orangelop aka. null.
excerpt: 想用安卓模拟器玩明日方舟的，可是内存过小用不了WSAonWin10，模拟器我又嫌膈应，AndroidX86性能太差，所以就有了本文
---

* content
{:toc}

## Waydroid的安装

一开始是想用anbox的，结果发现anbox的安卓版本太老了，而且已经两三年没维护了，就改用waydroid了。  

* 必须是用Intel或者AMD的显卡（有些型号详见如下英文），NVIDIA的不能用（也可以看文章末尾的问题解决），详见[Arch Linux Wiki - Waydroid](https://wiki.archlinux.org/title/Waydroid)。

    ```text
    AMD GPUs appear to have mixed results (in particular, the RX 6800 does not work using official images as of 2022-09-29); if Waydroid does not work you might also want to try to build a new Waydroid image (which works for Radeon 680M), or try the NVIDIA instructions below.
    ```

* 善用`sudo systemctl status waydroid-container`和`waydroid log`和`sudo waydroid logcat`查看错误信息。

### 切换至Wayland环境

使用`echo $XDG_SESSION_TYPE`查看自己是否处于Wayland环境下，若不处于，切换至Wayland（登入界面内切换，找不到的网上搜其他方法）（Manjaro可在`Layouts`内打开）。  

### 切换至linux-zen核心

* `sudo pacman -S linux-zen linux-zen-headers` ## 安装linux-zen  
* `vim /etc/default/grub`，加入如下内容：  

    ```conf
    GRUB_DEFAULT=saved
    GRUB_SAVEDEFAULT=true
    GRUB_DISABLE_SUBMENU=y
    ```

* `sudo grub-mkconfig -o /boot/grub/grub.cfg` ## 更新配置  
* `reboot`，在grub内选择linux-zen内核启动  

### 安装&启动

* `yay -S waydroid` ## 安装Waydroid本体  
* `sudo waydroid init -s GAPPS -f` ## 初始化Waydroid（带有Google APPs，命令的含义可以使用`waydroid -h`查看），这一步会在SourceForge上下载两个镜像文件：1、system.img；2、vendor.img，国内下载的话实在是太慢了，解决方法跳转至[这里](#解决sourceforge文件下载过慢的问题)  
* `sudo systemctl start waydroid-container` ## 启动服务  
* `waydroid show-full-ui` ## 可以显示安卓UI  
* `sudo waydroid shell` ## 带有root权限的安卓shell  
* `waydroid app install xxx.apk` ## 安装apk，也可以通过adb来  
* （可选）`sudo systemctl enable waydroid-container` ## 注册waydroid开机启动，如不注册，每次都需要手动启动  
* 可以直接使用了现在  

### 在Google处注册设备以使用GMS

安装并启动后的Waydroid打开Google Play会提示`Device is not Play Protect certified`，解决方案如下：

* `sudo pacman -S lzip sqlite`  
* `cd ~`  
* `git clone https://github.com/casualsnek/waydroid_script`  ## 使用[waydroid_script](https://github.com/casualsnek/waydroid_script)获取Wydroid的设备ID  
* `cd ~/waydroid_script`  
* `sudo python3 -m pip install -r requirements.txt`  
* `cd ~/waydroid_script`  
* `sudo python3 waydroid_extras.py -i` ## 打印ID  
* 在[https://www.google.com/android/uncertified/](https://www.google.com/android/uncertified/)内输入ID完成注册。  
* `sudo systemctl restart waydroid-container` ## 重启waydroid容器  

### 安装ARM转译器`libhoudini`

装上ARM转译器后才能运行ARM应用，否则只能运行少数有X86构建的安卓应用。  

安装方法：

* `sudo systemctl stop waydroid-container`
* `cd ~/waydroid_script`
* `sudo python3 waydroid_extras.py -l`
* `sudo systemctl start waydroid-container`

## 问题解决

### 解决Sourceforge文件下载过慢的问题

SourceForge是出了名的慢，即使是挂了梯子，单线程仍然是几十K，两个镜像加起来一个G，这得下到明年啊（气愤。  
稍微搜了下，网上没有解决方法，没找到官方文档，但是多线程的速度稍微快一些，能够接受，所以我的方法就是在外部下载好拖到虚拟机中。  

#### 方案A（最优解）

笔者在尝试了下文的方案B后才发现的方案A：

* `waydroid init -h` ## 可以直接看到waydroid中init函数的用法，运行结果如下：

    ```text
    ❯ waydroid init -h
    usage: waydroid init [-h] [-i IMAGES_PATH] [-f] [-c SYSTEM_CHANNEL] [-v VENDOR_CHANNEL]
                        [-r ROM_TYPE] [-s SYSTEM_TYPE]

    options:
    -h, --help            show this help message and exit
    -i IMAGES_PATH, --images_path IMAGES_PATH
                            custom path to waydroid images (default in
                            /var/lib/waydroid/images)
    -f, --force           re-initialize configs and images
    -c SYSTEM_CHANNEL, --system_channel SYSTEM_CHANNEL
                            custom system channel (options: OTA channel URL; default is
                            Official OTA server)
    -v VENDOR_CHANNEL, --vendor_channel VENDOR_CHANNEL
                            custom vendor channel (options: OTA channel URL; default is
                            Official OTA server)
    -r ROM_TYPE, --rom_type ROM_TYPE
                            rom type (options: "lineage", "bliss" or OTA channel URL;
                            default is LineageOS)
    -s SYSTEM_TYPE, --system_type SYSTEM_TYPE
                            system type (options: VANILLA, FOSS or GAPPS; default is
                            VANILLA)
    ```

    可以看到init是可以指定镜像路径的，我们将下载好的`system.img`和`vendor.img`放入`/var/lib/waydroid/images/`内再运行`waydroid init -s GAPPS -f`即可。  
* 如何获取`system.img`和`vendor.img`：在[Sourceforge - Waydroid](https://sourceforge.net/projects/waydroid/files/images/)内分别选择**对应**的`system.img`和`vendor.img`（一定不能混用）进行下载，解压，放入指定位置（需要root权限）。  
* 下载到的文件名示例：

    ```text
    system.img: lineage-18.1-20230121-GAPPS-waydroid_x86_64-system.zip
    vendor.ing: lineage-18.1-20230121-MAINLINE-waydroid_x86_64-vendor.zip
    ```

* 多线程下载软件推荐：笔者是在Windows下使用[Motrix](https://motrix.app/)进行的下载（百度他妈根本找不到官网，这里放一下链接），可以支持最大64线程，足够使用，也可以使用IDM来下载。  

#### 方案B（想体验下"千兆网"的可以试试，目测速度可以到100MB/s，不过是内网）

![《拥有了千兆网，但是内网》](/assets/2023012701.png)

笔者在艰难地解决网速问题时还发现了一个奇葩的解决方法：修改init函数的逻辑，并在内网使用nginx搭建一个服务器来供init函数存取镜像文件。  

* `wget http://nginx.org/download/nginx-1.23.3.zip` ## 先装nginx  
* `tar -zxvf nginx-1.23.3.tar.gz`  
* `./configure --prefix=/usr/local/nginx`
* `make && make install`
* `/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf` ## 装完了启动下
* 将`system.img`和`vendor.img`**的原始压缩包**拖入`/usr/local/nginx/html/`中，接下来如果在`http://localhost/你的压缩包文件名`中成功访问，就可以下一步了  
* `sudo vim /usr/lib/waydroid/tools/helpers/images.py` ## 修改逻辑，如下：
* 在36行处将`system_response['url']`替换为`http://localhost/你的system.img压缩包文件名`  
* 在65行处将`vendor_response['url']`替换为`http://localhost/你的vendor.img压缩包文件名`
* `waydroid init -s GAPPS -f` ## 后面的参数取决于你的镜像的选择

### NVIDIA显卡使用Waydroid

#### 方案一：软解码（性能烂）

* `sudo vim /var/lib/waydroid/waydroid_base.prop`，输入以下内容：

    ```text
    ro.hardware.gralloc=default
    ro.hardware.egl=swiftshader
    ```

* 重启waydroid服务

#### 方案二：换用核显（你说烂不烂）

### 在X11下运行

使用weston

* `sudo systemctl stop waydroid-container`
* `sudo pacman -Syu weston`
* `export XDG_SESSION_TYPE=wayland`
* `sudo systemctl start waydroid-container`
* `waydroid show-full-ui`

## 引用列表

* [ivonblog - archlinux-waydroid](https://ivonblog.com/posts/archlinux-waydroid/#contents:6-%E6%9C%89%E9%97%9Cwaydroid%E7%9A%84%E7%96%91%E9%9B%A3%E9%9B%9C%E7%97%87)
* [折腾记录:Waydroid透过Weston在X11下运行](https://www.bilibili.com/read/cv16137611)

## 结语

他妈的不如不装  
