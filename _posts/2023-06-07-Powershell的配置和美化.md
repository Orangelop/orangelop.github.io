---
layout: post
title: Powershell 的配置和美化
date: 2023-06-07 01:00:00
categories: Powershell shell
tags: Powershell shell
author: Orangelop aka. null.
excerpt: 最近更新到了 Powershell 7.3.6，发现自己的 oh-my-posh 没用了，故重新配置一下，留作记录。
---

* content
{:toc}

Windows Terminal越来越好用了  
折腾的结果：
![最终效果](https://s2.loli.net/2023/06/07/ZfvtOBoViUFXkLA.png)

## Nerd Fonts / Cascadia Code / Terminal-Icons 字体

Nerd Fonts / Cascadia Code：编程连字，等宽字体  

* 可以使用scoop安装，也可直接在[github.com/microsoft/cascadia-code](https://github.com/microsoft/cascadia-code)上下载安装  
* 在Windows Terminal内修改即可  

Terminal-Icons: 图标  

* Step1: `Install-Module -Name Terminal-Icons -Repository PSGallery`  
* Step2: 在`$PROFILE`内引入Terminal-Icons  

    ```powershell
    Import-Module Terminal-Icons
    ```

## PSReadline 历史记录清理

PSReadline的历史记录不是随着进程启停的，用的时间长了之后速度会变慢（历史记录太多，自动补全索引慢），历史记录存在于`AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt`下，建议用everything直接搜索`ConsoleHost_history.txt`清空即可  

## oh-my-posh

* Step1: 通过winget安装oh-my-posh: `winget install JanDeDobbeleer.OhMyPosh -s winget`，或者使用MS Store安装  
    更新：`winget upgrade oh-my-posh`  
* Step2: 调整主题: `Get-PoshThemes`  
* Step3: 调整配置文件: `notepad $PROFILE`，在`$PROFILE`内引入oh-my-posh  

## `$PROFILE` 配置文件

这里给出一个配置好的Profile，大家可以自行探索更多用法：

```powershell
    #------------------------------- Welcome --------------------------------------------
    $hello="Welcome back, Orangelop."
    $hello

    #------------------------------- Import Modules BEGIN -------------------------------
    Import-Module posh-git
    Import-Module oh-my-posh
    Import-Module Terminal-Icons
    Set-PoshPrompt -Theme paradox
    #------------------------------- Import Modules END   -------------------------------
    #-------------------------------  Set Hot-keys BEGIN  -------------------------------
    # 设置 Tab 键补全
    Set-PSReadlineKeyHandler -Key Tab -Function Complete

    # 设置 Ctrl+d 为菜单补全和 Intellisense
    Set-PSReadLineKeyHandler -Key "Tab" -Function MenuComplete

    # 设置 Ctrl+d 为退出 PowerShell
    Set-PSReadlineKeyHandler -Key "Ctrl+d" -Function ViExit

    # 设置 Ctrl+z 为撤销
    Set-PSReadLineKeyHandler -Key "Ctrl+z" -Function Undo

    # 设置向上键为后向搜索历史记录
    Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward

    # 设置向下键为前向搜索历史纪录
    Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
    #-------------------------------  Set Hot-keys END    -------------------------------
```

## Schemes 配色文件

可在Windows Terminal内自行修改

## Posh-git

![posh-git](https://s2.loli.net/2023/06/07/Qr95hXp8LIcZUmq.png)  

posh-git可以很方便的展示git信息：

* Step1: `Install-Module posh-git -Scope CurrentUser`  
* Step2: 在`$PROFILE`内引入posh-git  

    ```powershell
    Import-Module posh-git
    ```

## GraphicalTools 可视化交互

[GraphicTools 演示](https://img2022.cnblogs.com/blog/375390/202207/375390-20220716212220581-485478966.gif)  
安装`GraphicalTools`来实现可视化交互：`Install-Module Microsoft.PowerShell.ConsoleGuiTools`  

## Windows 下的 neofetch

* Step1: 安装scoop

    `powershell Set-ExecutionPolicy RemoteSigned -scope CurrentUser`  

    这一步需要访问raw.githubusercontent.com，自行解决：  
    `irm get.scoop.sh | iex`  
    （You can use proxies if you have network trouble in accessing GitHub, e.g.）：`irm get.scoop.sh -Proxy 'http://<ip:port>' | iex`  

    以管理员身份安装：`irm get.scoop.sh -outfile 'install.ps1'`  
    `.\install.ps1 -RunAsAdmin [-OtherParameters ...]`  
    或者不带其它参数，使用：`iex "& {$(irm get.scoop.sh)} -RunAsAdmin"`  

    更多问题详见：[github.com/ScoopInstaller](https://github.com/ScoopInstaller/Install)  

    注：在国内使用scoop是一件非常灾难的事情，你需要配置代理服务器地址（访问raw.githubusercontent.com）:`scoop config proxy 127.0.0.1:xxxx`，恢复设置`scoop config proxy default`  

* Step2（可选）: scoop换源  

    更改为国内的源：`scoop config SCOOP_REPO 'https://gitee.com/glsnames/scoop-installer'`  
    添加国内的bucket仓库：`scoop bucket add extras https://gitee.com/scoop-bucket/extra`  

* Step3: 安装neofetch  
    `scoop install git`  
    `scoop install neofetch`  
