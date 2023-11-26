---
layout: post
title: Manjaro 的一些优化
date: 2023-01-27 12:01:00
categories: Manjaro Linux
tags: Manjaro Linux
author: Orangelop aka. null.
excerpt: 最近搞了个gnome版的Manjaro，写一下遇到的问题和优化方案
---

* content
{:toc}

## 安装透明终端（gnome-terminal-transparency）

Manjaro版的gnome-terminal很早就把`Transparent background`选项去掉了（两三年前），中间改回来过一段时间，反正现在是没了。  
原因详见[AUR: gnome-terminal-transparency.git - transparency.patch (c86826f713c09ede575250a0b72c118f7c80e14a)](https://aur.archlinux.org/cgit/aur.git/tree/transparency.patch?h=gnome-terminal-transparency)。

这里截取一下原文：

```text
The transparency settings were removed as a side effect of 2bff4b63ed3ceef6055e35563e9b0b33ad57349d
```  

我的解决方案就是使用aur的`gnome-terminal-transparency`包替代原本的`gnome-terminal`。

* `sudo pacman -S deepin-terminal` ## 先随便下载一个终端A，比如`deepin-terminal`，并打开终端A，  
* `sudo pacman -R gnome-terminal` ## 移除`gnome-terminal`，  
* `yay -S gnome-terminal-transparency`  ## 下载并编译`gnome-terminal-transparency`，如果提示缺少`cmake`等组件，装上再次编译就好，  
* 现在可以卸载掉终端A，打开`gnome-terminal-transparency`了。

## 显示桌面图标

和透明终端一样，很早就被gnome移除了，但是在Manjaro上可以通过自带的`Layouts`（不知道中文名称是什么，我用的英文系统）打开，直接把`Show Desktop Icons`勾上就好了。  

顺带一提这里面可以更改主题配色和启用Wayland。  

注：Gnome Tweaks中的`Extensions`已经被单独分出来了，`https://extensions.gnome.org`上的许多插件目前已经不支持了，实在需要的话可以编译安装。  

## 有线连接突然消失的处理方法

有一次vmware虚拟机突然掉电后右上角就没了有线连接，设置里也没了，用`sudo lshw -C network`列出的列表里出现了类似于以下的东西：

```text
*-network DISABLED               
      description: ***
      product: ***
      vendor: ***
      physical id: ***
      bus info: ***
      logical name: ***
      version: ***
      serial: ***
```

可以看到被禁用了，网上有解决方案，类似于[这里](https://blog.csdn.net/weixin_48408016/article/details/128675899)，但是也有很多不行的方案，纯粹放屁污染环境的那种，这里列出正确的方案。  

解决方案：

* `sudo systemctl stop NetworkManager`
* `sudo vim /var/lib/NetworkManager/NetworkManager.state`
* 将`[main]`里面的`NetworkingEnabled`设置为true，如果文件是空白的，填入如下内容：  

```conf
[main]
NetworkingEnabled=true
WirelessEnabled=true
WWANEnabled=true
```

* `sudo systemctl start NetworkManager`

## 使用SSH控制Manjaro

VMware内设置为NAT模式（不需要额外的操作，如果要使用桥接模式或者专门的无线网卡另当别论），在Manjaro的Settings里面找到`Share`将`Remote Control`打开就好，使用`ip --list`查看虚拟机ip地址，再用SSH连接就好  

## zsh的优化

Manjaro自带zsh并使用`p10k`主题，自带autosuggestions和code-highlight，我觉得挺好的就没改，如果要修改p10k的样式的话，`p10k configure`，我自己用的`lean`，看起来比较简洁。  

要修改配置可以直接改`~/.zshrc`。  

## 介绍下neofetch

这个可以打印出电脑的信息，安装的话直接pacman就可以了。  

## 修改快捷键

全局快捷键在`Settings`内修改（可以设置一个截屏的快捷键，我Windows上Snipaste设置的`F1`，所以Manjaro内也设置的F1），终端的快捷键在终端的`Preferences`内修改，有一说一终端默认的快捷键真的反人类。  

## dash-to-dock优化

对于Manjaro，dash-to-dock可以在`Extensions`内找到并开启，其他发行版（gnome版本＞3.32）需要自行编译，≤3.32在[Gnome Extensions](https://extensions.gnome.org)内下载。  

* 默认的样式太大了，在dash-to-dock的设置内的`Appearence`内找到`Shrink the dash`，开启，  
* `Appearence`内还可以调节透明度和标志`window counter indicators`。  

## 安装pip3（pip）以及换源

我很惊讶Manjaro竟然不自带pip，而且官方库和AUR里也没有。  
这里参考[pip documentation v22.3.1 - installation](https://pip.pypa.io/en/stable/installation/)，给出以下两个方案：  

* 方案一：`python -m ensurepip --upgrade`
* 方案二：  
      `wget https://bootstrap.pypa.io/get-pip.py`  
      `python ./get-pip.py`

如果想要安装特定版本的pip，参考上面的链接。  

* 换源：  
pip的速度在国内真的很感人，有几个同学下载时甚至直接连不上，建议换到国内的源，我用的清华源：`pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`，还可以直接改用户文件夹下的`~/pip/pip.conf(ini)`来解决。。  

目前就遇到了这些问题，网上也没有很好的解答，就写了下。。。  
