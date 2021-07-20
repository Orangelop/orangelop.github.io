---
layout: post  
title:  "Arch Linux Installation Guide Chinese"  
date:   2020-03-12 06:20:00  
categories: 教程
tags: Arch-Linux  
excerpt:   如何安装Arch Linux 傻瓜式教学哦 更新于2020.03.12
mathjax: true  
---

---

我来了，第一篇真正的博文写一下如何安装Arch Linux吧  
Arch Linux官方简体中文文档指路：[Click Here](https://wiki.archlinux.org/index.php/Installation_guide_(简体中文))  
Edited by Orangelop [博客](https://orangelop.github.io/) / [哔哩哔哩](https://space.bilibili.com/54818676)

---

## Part 1 分区+联网
### 1.1 联网
`dhcpcd &` ///联网并以后台模式运行  
`ping -c 4 www.baidu.com` ///测试网络连接  
`vim /etc/pacman.d/mirrorlist` ///换源  
*复制cn源到前面*  
*（按v进入选择模式y复制p粘贴i进入编辑模式ESC后输入:x保存）*  
`ls /sys/firmware/efi/efivars` ///检测启动模式是否为EFI  
*（如果目录不存在，系统可能以 BIOS 或 CSM 模式启动）*  
`timedatectl set-ntp true` ///确保系统时间是准确的  
### 1.2 分区
`cfdisk /dev/sda` ///分区   
*（如果是EFI启动选gpt BIOS启动选dos  
选NEW接下来回车直到输入yes再选bootable）*  
`mkfs.ext4 /dev/sda1` ///格式化为ext4格式  
`mount /dev/sda1 /mnt` ///挂载新建分区  

## Part 2 安装基本系统、引导+本地化+创建用户
### 2.1 安装基本系统
`pacstrap /mnt base linux linux-firmware` ///安装操作系统  
`genfstab -U /mnt >> /mnt/etc/fstab` ///生成fstab文件  
`cat /mnt/etc/fstab` ///检查生成的fstab文件  
`arch-chroot /mnt /bin/bash` ///改变root到新安装的系统  
### 2.2 本地化
`vim /etc/locale.gen` ///本地化  
`locale-gen` ///使本地化生效  
`echo LANG=en_US.UTF-8 > /etc/locale.conf` ///设置默认语言  
`ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime` ///设置时区  
`hwclock --systohc –utc` ///设置硬件时间为UTC时间  
### 2.3 安装引导
`pacman -S grub` ///安装grub  
`grub-install --target=i386-pc /dev/sda` ///设置grub引导  
*（如果是EFI启动请自行上网上查找）*  
`grub-mkconfig -o /boot/grub/grub.cfg` ///生成配置文件  
### 2.4 创建用户
`passwd` ///设置root密码  
`(root passwd)` ///root密码  
`useradd -m -g users -s /bin/bash orangelop` ///创建新用户  
`passwd orangelop` ///为新用户设置密码  
`(usr passwd)` ///新用户密码  
`pacman -s sudo` ///安装sudo  
`pacman -S vim` ///安装vim（新系统不自带vim，光秃秃的）  
`vim /etc/sudoers` ///改sudo权限  
*(在 `root ALL=(ALL) ALL` 下面添加  
`orangelop ALL=(ALL) ALL` 
为你刚才创建的用户 添加sudo权限）*  
`ls /home` ///检查新用户是否创建好了 

## Part 3 安装图形界面
### 3.1 安装图形界面
`pacman -S dhcpcd` ///安装网络组件  
`systemctl start dhcpcd` ///启动网络组件  
`systemctl enable dhcpcd` ///设置网络组件开机启动  
`lspci | grep VGA` ///以下都是安装软件  
`pacman -S xf86-video-vesa xorg ttf-dejavu wqy-microhei gnome gnome-tweaks alacarte`  
`systemctl enable gdm` ///开机启动Gnome  
`systemctl enable NetworkManager` ///开机联网  
`reboot` ///这时重启就可以进入图形界面了  

## Part 4 优化操作系统（添加常用源+安装常用软件）
### 4.1 添加archlinuxcn源
`vim /etc/pacman.conf` ///添加archlinuxcn源  
*在 /etc/pacman.conf 文件末尾添加两行：*  
```
[archlinuxcn]
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
或者
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch 
```
`pacman -S archlinuxcn-keyring` ///安装archlinuxcn密钥环
### 4.2 安装常用软件
#### 4.2.1 安装fcitx输入法
`pacman -S fcitx-im fcitx-configtool fcitx-sogoupinyin` ///安装fcitx输入法+搜狗拼音  
`vim ~/.xprofile` ///编辑fcitx环境变量
添加以下内容
```
export GTK_IM_MODULE=fcitx

export QT_IM_MODULE=fcitx

export XMODIFIERS="@im=fcitx"

```
#### 4.2.2 安装常用软件
`pacman -S yay`///安装yaourt  
`pacman -S google-chrome` ///安装Google Chrome  
`pacman -S firefox` ///安装Firefox  
`pacman -S netease-cloud-music` ///安装网易云音乐

这样就算安装完成了  
可以用了O(∩_∩)O哈哈~  
---Orangelop  
于2020.03.12
