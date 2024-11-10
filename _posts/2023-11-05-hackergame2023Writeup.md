---
layout: post
title: Hackergame 2023 Writeup
date: 2023-11-05 00:00:00
categories: CTF
tags: hackergame CTF
author: Orangelop
excerpt: hackergame2023 (第十届中科大信安赛) Writeup
---

* content
{:toc}

## 前言

题目很有意思，明年还来。  
今年hackergame依旧是没做多少，中间五六天没做，最后一天干脆就摆烂挑了几题写了下。  

```text
当前分数：1050， 总排名：732 / 2381
AI：0 ， binary：0 ， general：750 ， math：0 ， web：300
```

## 签到题

hackergame，启动！  
构造 `?similarity=100` 拿到flag。  
flag: `flag{wE1com3-TO-H@CkeRgAME-and-Enj0Y-h@CkIn9-z023}`  

## 猫咪小测

* Q1：想要借阅世界图书出版公司出版的《A Classical Introduction To Modern Number Theory 2nd ed.》，应当前往中国科学技术大学西区图书馆的哪一层？  
搜索「中国科学技术大学西区图书馆」，进入[西区图书馆简介 | 中国科学技术大学图书馆](https://lib.ustc.edu.cn/%E6%9C%AC%E9%A6%86%E6%A6%82%E5%86%B5/%E5%9B%BE%E4%B9%A6%E9%A6%86%E6%A6%82%E5%86%B5%E5%85%B6%E4%BB%96%E6%96%87%E6%A1%A3/%E8%A5%BF%E5%8C%BA%E5%9B%BE%E4%B9%A6%E9%A6%86%E7%AE%80%E4%BB%8B/)，找到外文书库位于 `12` 楼。  
答案：`12`  
* Q2：今年 arXiv 网站的天体物理版块上有人发表了一篇关于「可观测宇宙中的鸡的密度上限」的论文，请问论文中作者计算出的鸡密度函数的上限为 10 的多少次方每立方秒差距？  
搜索找到论文[Nuggets of Wisdom: Determining an Upper Limit on the Number Density of Chickens in the Universe](https://arxiv.org/abs/2303.17626)，数量级为 `23` 。  
答案：`23`  
* Q3：为了支持 TCP BBR 拥塞控制算法，在编译 Linux 内核时应该配置好哪一条内核选项？  
搜索「LINUX TCP BBR kernel config」，得到答案「CONFIG_TCP_CONG_BBR」，也可以在源码里乱翻一气。  
答案：`CONFIG_TCP_CONG_BBR`  
* Q4: 🥒🥒🥒：「我……从没觉得写类型标注有意思过」。在一篇论文中，作者给出了能够让 Python 的类型检查器 MyPY 陷入死循环的代码，并证明 Python 的类型检查和停机问题一样困难。请问这篇论文发表在今年的哪个学术会议上？  
google搜索「the halting problem for mypy」，找到论文[Python Type Hints Are Turing Complete](https://drops.dagstuhl.de/storage/00lipics/lipics-vol263-ecoop2023/LIPIcs.ECOOP.2023.44/LIPIcs.ECOOP.2023.44.pdf)，该论文发布在ECOOP 2023上。  
答案：`ECOOP`  
得到flag1：`flag{WElcOm3-TO-aTTEnd-ThE-Neko-3XAm-Z0Z3}`；flag2：`flag{re@L-MAS7er-0f-tHE-NEko-eXam-in-U57C}`  

## 更深更暗

这题面有些地狱了属于是。  
~~其实截图就可以了~~，F12暂停脚本执行并搜索 `flag{` 即可得到答案。  
答案：`flag{T1t@n_f5a415a9734e144169a963d8985eecd9}`  

## 旅行照片3.0

~~其实比赛时一题没做出来~~，挂着梯子搜了半天都没什么头绪，社工能力降降降，这里就直接参考官方wp了。  
ps：这补充说明够抽象的。（**补充说明 1：如果在「旅行照片 3.0」题目网站中提交答案后提示答案错误，可能是由于同时打开了其他的题目造成的。如果你认为答案正确，请关闭所有题目页面后从平台重新进入再试一次。**）

* 题目 1-2：

1. 你还记得与学长见面这天是哪一天吗？（格式：yyyy-mm-dd）  
答案：`2023-08-10`  
2. 在学校该展厅展示的所有同种金色奖牌的得主中，出生最晚者获奖时所在的研究所缩写是什么？  
答案：`ICRR`  
flag1：`flag{how_I_wi5h_i_COulD_w1N_A_Nobe1_pri23_495f96bf1a}`

* 题目 3-4：

1. 帐篷中活动招募志愿者时用于收集报名信息的在线问卷的编号（以字母 S 开头后接数字）是多少？  
答案：`S495584522`  
2. 学长购买自己的博物馆门票时，花费了多少日元？  
答案：`0`  
flag2：`flag{PluM_w1NE_1S_rEa1LY_EXpen5iVE_a0e7767e6b}`

* 题目 5-6：

1. 学长当天晚上需要在哪栋标志性建筑物的附近集合呢？（请用简体中文回答，四个汉字）  
答案：`安田讲堂`  
2. 进站时，你在 JR 上野站中央检票口外看到「ボタン＆カフリンクス」活动正在销售动物周边商品，该活动张贴的粉色背景海报上是什么动物（记作 A，两个汉字）？在出站处附近建筑的屋顶广告牌上，每小时都会顽皮出现的那只 3D 动物是什么品种？（记作 B，三个汉字）？（格式：A-B）  
答案：`熊猫-秋田犬`  
flag3：`flag{Un7I1_W3_M337_A64iN_6oODByE_S3n1OR_b82ae194c4}`

## 赛博井字棋

查看前端代码，发现落子位置判断在前端，判断没有后才会发回后端：  

```javascript
async function setMove(x, y) {
  if (board[x][y] != 0) {   // ***** 这一行是关键 *****
    return;
  }
  if (frozen) {
    return;
  }
  let url = window.location.href; 
  let data = { x: x, y: y }; 
  return fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  }).catch(errorHandler);
}
```

所以F12控制台直接改落子位置即可，或者postman直接发请求就好。  
先在左上角点一个，在F12清空(1,1)位置，最后在右下角点一个即可。  

```javascript
board[1][1]=0; setMove(1,1)
```

得到flag：`flag{I_can_eat_your_pieces_aa80d796ae}`  

## 奶奶的睡前 flag 故事

本来还以为是隐写题，扔到stegsolve和binwalk里都没用。之后发现题面中出现了好几次「Pixel」相关的字眼。搜索发现 **老旧的**Pixel内置截图存在bug，搜索可以发现很多新闻报道：Pixel 手机自带的系统截图工具存在漏洞，裁剪图片并不会删除原图，而是将裁剪后的图片的数据直接写在原图的开头，覆盖原先的数据，此时原图未被覆盖的部分仍然可以被恢复。剩余的数据因为缺失了 PNG 的头部，而且也不一定按照 PNG 的 chunk 对齐，所以无法直接用图片查看器打开，但我们可以借助恢复工具恢复。  
找到漏洞利用[https://acropalypse.app/](https://acropalypse.app/)，选择Pixel 3即可得出结果。  
获得flag：`flag{sh1nj1ru_k0k0r0_4nata_m4h0}`  

## 组委会模拟器

* 可以通过分析并模拟网络请求来完成  
可以发现前端首先是通过`/getMessages`接口获取所有消息以及它们的出现时间，然后撤回操作会使用`/deleteMessage`撤回某条消息，最后通过`/getflag`接口检验是否正确处理所有消息。所以可以带上自己的 cookie（从浏览器中复制或向完整的带有 token 的题目 URL 发送请求获取），通过发送请求来模拟所有的撤回操作。  

* 也可以直接写个js直接筛选。
F12发现`click`事件绑定在了具有`.fakeqq-message__bubble`类名的`<div>`元素上，直接写脚本筛选即可。  

```javascript
setInterval(() =>
    Array.from(document.querySelectorAll(".fakeqq-message__bubble")).filter((element) => element.innerHTML.indexOf("hack[") != -1).forEach((element) => element.click()), 100)
```

## 虫

一眼sstv，这里笔者找到一个比较好用的全平台 Decoder [https://github.com/colaclanth/sstv](https://github.com/colaclanth/sstv)，可以自动检测SSTV Sensitivity与mode，直接读取音频文件即可。  

```bash
❯ sstv -d insect.wav -o opt.png
[sstv] Searching for calibration header... Found!
[sstv] Detected SSTV mode Scottie 2
[sstv] Decoding image...   [###################################################] 100%
[sstv] Drawing image data...
[sstv] ...Done!
```

获得flag：`flag{SSssTV_y0u_W4NNa_HaV3_4_trY}`

## JSON ⊂ YAML?

网上稍微搜索就可以拿到这两个flag：第一个只需要特别大的数溢出即可，第二个用两个重复的元素赋值即可，下面援引官方wp。

### JSON ⊄ YAML 1.1

输入 `1e2` 可以拿到这个 flag。解题思路可以来自 [Stackoverflow - What Valid JSON Files are not Valid YAML 1.1 Files](https://stackoverflow.com/questions/21584985/what-valid-json-files-are-not-valid-yaml-1-1-files) 中提到的 `12345e999`，或者 [Json is not a YAML Subset](https://john-millikin.com/json-is-not-a-yaml-subset) 中提到的 `1e2`。  

[JSON](https://www.json.org/json-zh.html) 的数字格式很清晰，网页上有一张图，可以翻译为这个正则表达式：`-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][-+]?[0-9]+)?`  
可以看出这个规则是比较严格的，不允许使用正号，不允许有前面的零（除非只有一个零），只要有小数点就必须有小数部分。  

YAML 1.1 就没这么清晰了，实际上，你翻遍[YAML - species](https://yaml.org/spec/1.1/)也不会找到任何关于数字格式的规定。因为 YAML 1.1 并没有规定未标注类型的文字该按什么规则确定类型，而是允许解析器自己实现一系列正则表达式，逐一尝试匹配。[YAML 1.1 tag repository](https://yaml.org/type/index.html) 提供了一些常见的类型，供解析器参考。  

其中，十进制浮点数的正则表达式是：`[-+]?([0-9][0-9_]*)?\.[0-9.]*([eE][-+][0-9]+)?`  

这个正则表达式极其宽松，这是一些它能匹配的情况：`.`、`...`、`+0_0_..0..e+0`。但是，它匹配不了 `1e2`，因为小数点是必须的。  

对比 JSON 的规则和上面两条规则，可以发现，总共有两处存在 JSON 能匹配，但上面两条规则不能匹配的情况。一是**没有小数点**，二是**指数部分没有正负号**。

### JSON ⊄ YAML 1.2

输入 `{"":0,"":0}` 可以拿到这个 flag。解题思路可以来自 [Stackoverflow - What Valid JSON Files are not Valid YAML 1.1 Files](https://stackoverflow.com/questions/21584985/what-valid-json-files-are-not-valid-yaml-1-1-files) 中提到的“with one minor caveat regarding duplicate keys”，或者 [ruamel.yaml 库的文档](https://yaml.readthedocs.io/en/latest/api/)中提到的“Duplicate keys”。

JSON 由两个规范定义：[ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/) 与 [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259)，它们明确提到了二者对语法方面的定义应当是完全一致的，但是可以重复。

然而，根据 [YAML 1.2](https://yaml.org/spec/1.2.2/) ：YAML 1.2 解析器在遇到重复的键时必须报错。

笔者构造一个可以同时获得两个flag的输入：`{"aaa":12345e999,"aaa":12345e999}`

```bash
cheng@DESKTOP-MK0P33L
❯ ./nc.exe 202.38.93.111 10096
Please input your token:
Input your JSON: {"aaa":12345e999,"aaa":12345e999}
As JSON: {'aaa': inf}
As YAML 1.1: {'aaa': '12345e999'}
Flag1: flag{faf9facd7c9d64f74a4a746468400a505c1ab30103}

Flag2: flag{b1c73f14d04db546b7e7e24cf1cc72522a536885c0}

```

获得flag1: `flag{faf9facd7c9d64f74a4a746468400a505c1ab30103}`；  flag2: `flag{b1c73f14d04db546b7e7e24cf1cc72522a536885c0}`  

## Git? Git!

首先使用`git reflog`查看完整的操作历史：  

```bash
❯ git reflog
ea49f0c (HEAD -> main) HEAD@{0}: commit: Trim trailing spaces
15fd0a1 (origin/main, origin/HEAD) HEAD@{1}: reset: moving to HEAD~
505e1a3 HEAD@{2}: commit: Trim trailing spaces
15fd0a1 (origin/main, origin/HEAD) HEAD@{3}: clone: from https://github.com/dair-ai/ML-Course-Notes.git
```

可以看到，clone后最近的一次提交hash是 `505e1a3`，猜测这就是马老师故意不小心提交flag的commit。使用`git reset`回退到这次提交：  

```bash
❯ git reset --hard 505e1a3
HEAD is now at 505e1a3 Trim trailing spaces
```

查看README，得到flag：`flag{TheRe5_@lwAy5_a_R3GreT_pi1l_1n_G1t}`

## HTTP集邮册

~~太杂太乱了，所以援引官方wp~~：  

关于收集的状态码，可以去 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100) 逛一圈，MDN 对每个状态码的解释是很详细的。首先列出 5 个最容易拿到的状态码：  

- 200 OK. 点击就送，代表请求成功。  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n\r\n
    ```

- 404 Not Found. 修改路径到一个不存在的文件即可。  

    ```
    GET /x HTTP/1.1\r\n
    Host: example.com\r\n\r\n
    ```

- 400 Bad Request. 构造不符合格式的 HTTP 请求即可。  

    ```
    GET / aHTTP/1.1\r\n
    Host: example.com\r\n\r\n
    ```

- 505 HTTP Version Not Supported. 修改 HTTP 版本号到一个离谱的值即可。  

    ```
    GET / HTTP/11\r\n
    Host: example.com\r\n\r\n
    ```

- 405 Method Not Allowed. 修改请求方法到 `POST` 等即可。  

    ```
    POST / HTTP/1.1\r\n
    Host: example.com\r\n\r\n
    ```

接下来是可能需要看文档的部分：  

- 100 Continue. 代表服务器希望客户端继续请求或者忽略。需要客户端发送 `Expect: 100-continue`。  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Expect: 100-continue\r\n\r\n
    ```

- 206 Partial Content. 一个 HTTP 请求可以只请求部分内容，服务器也会返回部分内容。  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Range: bytes=1-2\r\n\r\n
    ```

- 416 Range Not Satisfiable. 上面的 `Range` 是一个合法的范围，那么不合法的范围呢？就是 416。  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Range: bytes=114514-1919810\r\n\r\n
    ```

- 304 Not Modified. 代表文件在指定条件下没有修改过，这里用 `If-Modified-Since`：  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    If-Modified-Since: Tue, 15 Aug 2023 17:03:04 GMT\r\n\r\n
    ```

- 412 Precondition Failed. 这个 payload 使用了 ETag + If-Match，ETag 和对应的 web 资源对应，用来区分对应资源不同的版本。客户端可以利用这个信息来节省带宽。这里 [`If-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match) 则在尝试匹配这个 ETag，如果不匹配，那就返回 412。  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    If-Match: "bfc13a64729c4290ef5b2c2730249c88ca92d82d"\r\n\r\n
    ```

- 413 Content Too Large. 不需要真正输入很大的 payload，把 `Content-length` 弄得很大就行：  

    ```
    GET / HTTP/1.1\r\n
    Host: example.com\r\n
    Content-length: 1145141919810\r\n\r\n
    ```

- 414 URI Too Long. 大概需要很长的 URI 路径（但是又不能太长，否则 web 界面本体不会允许这样的响应）。内容详见 [414.txt](./414.txt)。  

- 501 Not Implemented. 代表服务器不支持此功能。Nginx 源代码中默认配置下唯一可能触发的地方是 <https://github.com/nginx/nginx/blob/a13ed7f5ed5bebdc0b9217ffafb75ab69f835a84/src/http/ngx_http_request.c#L2008>:  

    ```c
    } else {
        ngx_log_error(NGX_LOG_INFO, r->connection->log, 0,
                        "client sent unknown \"Transfer-Encoding\": \"%V\"",
                        &r->headers_in.transfer_encoding->value);
        ngx_http_finalize_request(r, NGX_HTTP_NOT_IMPLEMENTED);
        return NGX_ERROR;
    }
    ```

    `else` 上面只允许 `chunked`，所以可以：  

    ```
    GET / HTTP/1.1\r\n
    Transfer-Encoding: gzip\r\n
    Host: example.com\r\n\r\n
    ```

    `gzip` 换成除了 `chunked` 以外的任意字符串都行。  

最后一个问题：没有状态码是怎么回事？这道题可能可以手工 fuzz 出来，payload 类似于这样：  

```
GET /\r\n
```

这里实际发送的是 HTTP/0.9 请求，它只支持 `GET`，然后后面直接接 URL，没有别的。然后响应就直接响应文件内容，也没有状态码之类的东西。  
当时做原型的时候，看到这个其实还是挺惊讶的，没想到 nginx 还保留着和 HTTP/0.9 客户端的兼容性。  

得到flag：5 种状态码：`flag{stacking_up_http_status_codes_is_fun_e5ba5861ad}`  
没有状态……哈？：`flag{great backward compatibility of nginx, R1ght?}`  
12 种状态码：`flag{I think that when many such status codes are accumulated c83f176066 it becomes a lifetime}`  

## Dcoker for Everyone

docker 用户组和 root 事实上是等价的。  

解法很简单，在打开之后等待 alpine 开机，然后把 rootfs 挂（bind mount）进要运行的容器里即可：  

```bash
docker run -it --rm -v /:/outside alpine
```

那么实际的 rootfs 就在 `/outside` 目录，注意 `/flag` 是个软链接，所以实际上 flag 位于 `/outside/dev/shm/flag`。  
如果希望能直接读根目录的软链接的话，得设置一下 IPC 模式为 `host`，这样的话主机和容器的 `/dev/shm` 就共享了：  

```bash
docker run -it --rm --ipc=host -v /:/outside alpine
```

于是 flag 就在 `/dev/shm/flag`，可以直接读 `/outside/flag` 获取。  

得到flag：`flag{u5e_r00t1ess_conta1ner_7f3f57f7ac_plz!}`

## 惜字如金 2.0

~~做这题的的时候就意识到要去穷举，所以就放弃了~~，比赛结束后做出来了。  

我的解法就是枚举。  

```text
* 第一原则（又称 creat 原则）：如单词最后一个字母为「`e`」或「`E`」，且该字母的上一个字母为辅音字母，则该字母予以删除。
* 第二原则（又称 referer 原则）：如单词中存在一串全部由完全相同（忽略大小写）的辅音字母组成的子串，则该子串仅保留第一个字母。
```

阅读代码：

```python
cod_dict += ['nymeh1niwemflcir}echaet']
cod_dict += ['a3g7}kidgojernoetlsup?h']
cod_dict += ['ulw!f5soadrhwnrsnstnoeq']
cod_dict += ['ct{l-findiehaai{oveatas']
cod_dict += ['ty9kxborszstguyd?!blm-p']
```

发现`cod_dict`每行都少了一个字符。  
根据题面中的第一、二原则可知：  

* 第一原则：如果后面不再是字母，则该辅音字母后面可能是 `e` 或者 `E`。  

* 第二原则：该辅音字母后面可能是其本身的小写或大写形式。  

然后就可以枚举力：  
注意第二个判断的条件：它不仅要求最后一个字符是 `}`，还要求了这个字符只出现一次。  

```python
#!/usr/bin/python3
#pip3 install itertools

from itertools import product

consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'
letters = consonants + 'aeiouAEIOU'


def recover(chars):
    results = []
    for i in range(0, len(chars)):
        if chars[i] in consonants:
            results.append(chars[:i] + chars[i].lower() + chars[i:])
            results.append(chars[:i] + chars[i].upper() + chars[i:])
            if i == len(chars) - 1 or chars[i + 1] not in letters:
                results.append(chars[:i] + 'e' + chars[i:])
                results.append(chars[:i] + 'E' + chars[i:])
    return results


flag_collection = set([])
choice_indexes = [53, 41, 85, 109, 75, 1, 33, 48, 77, 90,
                  17, 118, 36, 25, 13, 89, 90, 3, 63, 25,
                  31, 77, 27, 60, 3, 118, 24, 62, 54, 61,
                  25, 63, 77, 36, 5, 32, 60, 67, 113, 28]

for choice in product(recover('nymeh1niwemflcir}echaet'),
                      recover('a3g7}kidgojernoetlsup?h'),
                      recover('ulw!f5soadrhwnrsnstnoeq'),
                      recover('ct{l-findiehaai{oveatas'),
                      recover('ty9kxborszstguyd?!blm-p')):
    chars = [choice[c // 24][c % 24] for c in choice_indexes]
    if chars[:5] == ['f', 'l', 'a', 'g', '{'] and chars[-1] == '}':
        if '}' not in chars[5:-1]: flag_collection.add(''.join(chars))

for flag in flag_collection: print(flag)
```

官方wp中给出了一种模拟：  

总的来说，输出一共 40 个字符，满足条件的输出共有三个要求：

* 输出字符 0-4 分别是 `flag{`
* 字符 5-38 不出现 `}`
* 字符 39 是 `}`

我们先从输出字符 0 开始。在定义码表的五个元素中，输出字符 0 对应码表第三个元素的字符 5（`53`）。然而，第三个元素惜字如金化后的字符 5 是 `5`，字符 4 才是 `f`，这说明被惜字如金化的字符在字符 4 前——这样才能把 `f` 顺延到惜字如金化前的字符 5 的位置。这样做带来了一个确定的事情，就是：惜字如金化前 `f` 及之后的字符已经全部确定了，我们简记为：

```text
*****f5soadrhwnrsnstnoeq
```

然后是输出字符 1，它对应码表第二个元素的字符 17（`41`）。第二个元素惜字如金化后的字符 17 正是 `l`，这说明被惜字如金化的字符在字符 17 后——惜字如金化前第二个元素我们确定如下：

```text
a3g7}kidgojernoetl******
```

对输出字符 2-4 及 39 能够得到以下的结果：

```text
************************
a3g7}kidgojernoetl******
*****f5soadrhwnrsnstnoeq
***{l-findiehaai{oveatas
*************guyd?!blm-p
```

还有大量的字符我们仍然没有头绪。但实质上第一行仍然可以确定很多字符——这是由输出字符 10 确定的，它对应码表第一个元素的字符 17（`17`）。我们注意到第一个元素惜字如金化后的字符 17 是 `e`，但字符 16 是 `}`：这说明被惜字如金化的字符绝不可能在 `}` 之前，否则字符 17 将顺延到 `}`，从而使得输出包含不止一个 `}` 字符。现在我们把推断得出的结果整理如下：

```text
nymeh1niwemflcir}*******
a3g7}kidgojernoetl******
*****f5soadrhwnrsnstnoeq
***{l-findiehaai{oveatas
*************guyd?!blm-p
```

此时只剩下输出字符 7 和输出字符 10 没有解开。输出字符 10 对应的是码表第一个元素 `}` 后，说明它不可能是被惜字如金化的字符（`}` 不是辅音字母），那自然就是它的下一个字符 `e`，而输出字符 7 对应的是码表第三个元素的开头，而一个单词的开头不可能被惜字如金化，那么它就直接对应字符 `u`。最后逐个代入，得到的输出就是我们的 flag：

```text
flag{you-ve-r3cover3d-7he-an5w3r-r1ght?}
```

以上推理也证实了 flag 是唯一的。

得到flag：`flag{you-ve-r3cover3d-7he-an5w3r-r1ght?}`  

## 🪐 高频率星球

## 🪐 小型大语言模型星球

### You are smart

### Accepted

### Hackergame

### 🐮

## 🪐 流式星球

## 🪐 低带宽星球

### 小试牛刀

转换成webp即可通过。  
得到flag：`flag1: flag{A1ot0f_t0015_is_available_to_compre55_PNG}`  

### 极致压缩

Jpeg XL
