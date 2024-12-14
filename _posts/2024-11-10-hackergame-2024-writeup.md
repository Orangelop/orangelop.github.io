---
layout: post
title: Hackergame 2024 Writeup
date: 2024-11-10 00:00:00
categories: CTF
tags: hackergame CTF
author: Orangelop
excerpt: Hackergame 2024 (第十一届中科大信安赛) Writeup
---

* content
{:toc}

## 写在前面

苦逼高三生休息时间打ctf（  
反正是高中最后一次了，挺不容易的。  
我还会回来的（  

```text
当前分数：1700， 总排名：373 / 2460
AI：0 ， binary：0 ， general：850 ， math：400 ， web：450
```

## 签到

构造 `/?pass=true`  
`flag{WE!ComE-t0-HACKErG@m3-@Nd-eNjOY-H@cK1NG-Zo24}`  

## 喜欢做签到的 CTFer 你们好呀

中国科学技术大学校内 CTF 战队的 [招新主页](https://www.nebuu.la/) 在 `承办单位` 中提及，打开之。  

### Checkin Again

在可用命令中有一个 `env` 命令  

```bash
ctfer@ustc-nebula:$ ~ env
PWD=/root/Nebula-Homepage
ARCH=loong-arch
NAME=Nebula-Dedicated-High-Performance-Workstation
OS=NixOS❄️
FLAG=flag{actually_theres_another_flag_here_trY_to_f1nD_1t_y0urself___join_us_ustc_nebula}
REQUIREMENTS=1. you must come from USTC; 2. you must be interested in security!
```

flag{actually_theres_another_flag_here_trY_to_f1nD_1t_y0urself___join_us_ustc_nebula}

### Checkin Again & Again

在 `index-xxx.js` 中搜索flag：  

```javascript
case 0:
    if (1 !== n.length || ".flag" !== n[0]) {
        t.next = 4;
        break
    }
    return t.abrupt("return", "".concat(atob("ZmxhZ3swa18xNzVfYV9oMWRkM25fczNjM3J0X2YxNGdfX19wbGVhc2Vfam9pbl91c191c3RjX25lYnVsYV9hbkRfdHdvX21hSm9yX3JlcXVpcmVtZW50c19hUmVfc2hvd25fc29tZXdoZXJlX2Vsc2V9")));
```

得到cat命令可以读取隐藏文件`.flag`，遂执行得到：

```bash
ctfer@ustc-nebula:$ ~ cat .flag
flag{0k_175_a_h1dd3n_s3c3rt_f14g___please_join_us_ustc_nebula_anD_two_maJor_requirements_aRe_shown_somewhere_else}
```

btw，`sudo` 命令给我跳转到奶龙我真的没绷住。  

flag{0k_175_a_h1dd3n_s3c3rt_f14g___please_join_us_ustc_nebula_anD_two_maJor_requirements_aRe_shown_somewhere_else}  

## 猫咪问答（Hackergame 十周年纪念版）

* 在 Hackergame 2015 比赛开始前一天晚上开展的赛前讲座是在哪个教室举行的？  

访问 [lug.ustc.edu.cn/wiki/sec](https://lug.ustc.edu.cn/wiki/sec/contest.html)，得到答案：`3A204`  

* 众所周知，Hackergame 共约 25 道题目。近五年（不含今年）举办的 Hackergame 中，题目数量最接近这个数字的那一届比赛里有多少人注册参加？

一届一届翻，是 [Hackergame 2019](https://lug.ustc.edu.cn/news/2019/12/hackergame-2019/)，共25题，在新闻页得到答案：`2682`  

* Hackergame 2018 让哪个热门检索词成为了科大图书馆当月热搜第一？

在 [github.com/ustclug/hackergame2018-writeups/](https://github.com/ustclug/hackergame2018-writeups/blob/master/official/ustcquiz/README.md) 存档中找到答案：`程序员的自我修养`  

* 在今年的 USENIX Security 学术会议上中国科学技术大学发表了一篇关于电子邮件伪造攻击的论文，在论文中作者提出了 6 种攻击方法，并在多少个电子邮件服务提供商及客户端的组合上进行了实验？

在USENIX官网中找到 [Conferences](https://www.usenix.org/conference/usenixsecurity24/technical-sessions) ，`Ctrl+F` 搜索 `University of Science and Technology of China` 找到论文 [FakeBehalf: Imperceptible Email Spoofing Attacks
against the Delegation Mechanism in Email Systems](https://www.usenix.org/system/files/usenixsecurity24-ma-jinrui.pdf) ，在文章末尾可以看到约三百多种，遂爆破之，得到正确答案：`336`。

```python
import requests

cookie_dict = {
    "session":"cited"
}
s = requests.Session()
s.get("http://202.38.93.141:13030/",cookies=cookie_dict)
q4 = 250
while True: #submit form
    ret = s.post("http://202.38.93.141:13030/", {
        "q1": "2017-03",
        "q2": "Kdenlive",
        "q3": "12",
        "q4": q4,
        "q5": "sdf.org",
        "q6": ""
    },cookies=cookie_dict)
    if "本次测验总得分为 0。没有达到 60 分，不能给你 flag（摊手）" in ret.text:
        print(q4, "❌")
    else:
        print(q4, "✅", ret.text)
        break
    q4+=1
```

后记：没仔细看文章，人家原来总结了。。。反正答案得到了。  
> Consequently, we propose six types of email spoofing attacks and measure their impact across 16 email services and 20 clients. All 20 clients are configured as MUAs for all 16 providers via IMAP, resulting in 336 combinations (including 16 web interfaces of target providers).

* 10 月 18 日 Greg Kroah-Hartman 向 Linux 邮件列表提交的一个 patch 把大量开发者从 MAINTAINERS 文件中移除。这个 patch 被合并进 Linux mainline 的 commit id 是多少？  

在Commits中搜索`Russian`得到 [github.com/torwalds/linux/commit - 6e90b675cf942e50c70e8394dfb5862975c3b3b2](https://github.com/torvalds/linux/commit/6e90b675cf942e50c70e8394dfb5862975c3b3b2)，正确答案：`6e90b6`。btw，评论区里骂声一片。  

* 大语言模型会把输入分解为一个一个的 token 后继续计算，请问这个网页的 HTML 源代码会被 Meta 的 Llama 3 70B 模型的 tokenizer 分解为多少个 token？

做到这一题时我的表格已经填的差不多了，只好估计一个数然后爆破，将表单删删干净之后在[lunary.ai](https://lunary.ai/llama3-tokenizer)中直接使用Meta-Llama3-70b模型的tokenizer计算即可，约一千八百多种，爆破之得到答案：`1833`。  

```python
import requests

cookie_dict = {
    "session":"cited"
}
s = requests.Session()
s.get("http://202.38.93.141:13030/",cookies=cookie_dict)
q6 = 1800
while True: #submit form
    ret = s.post("http://202.38.93.141:13030/", {
        "q1": "2017-03",
        "q2": "Kdenlive",
        "q3": "12",
        "q4": "dcd46d897adb70d63e025f175a00a89797d31a43",
        "q5": "sdf.org",
        "q6": q6
    },cookies=cookie_dict)
    if "本次测验总得分为 0。没有达到 60 分，不能给你 flag（摊手）" in ret.text:
        print(q6, "❌")
    else:
        print(q6, "✅", ret.text)
        break
    q6+=1
```

得到flag：  
flag{@_90OD_Cαt_IS_TH3_CAT_WH0_caИ_PaSs_TH3_QU1z}  
flag{7eN_¥34rs_0F_HacK3r9Λme_Om3de7Øบ_WitH_И3KØ_Qu!Z}  

## 打不开的盒

在blender中打开透视视角直接看到flag。（用Maya、C4D、Solidworks、AutoCAD云云应该都能做）  
flag{Dr4W_Us!nG_fR3E_C4D!!w0W}  

## 每日论文太多了！

第一次见论文里藏flag的，开眼了。。。好一手骗论文下载量，是否有点学术不端（  
Acrobat DC 打开 搜索flag 编辑 移开挡住的空白文本框  
flag{h4PpY_hAck1ng_3veRyd4y}  

另解：`pdfimages 3650212.3652145.pdf prefix` 导出所有图片找flag即可。  

后记：一开始搜索flag只找到了`flag here`的白色文本字样，我真的没想到论文里面还可以藏一个位图的图片，导致文本都搜不到（流汗）  

## 比大小王

一开始直接利用 `requests` 构造请求，但是一直没过，后面用索性 `selenium` 模拟浏览器请求了，现在一想发现是没有 `time.sleep(4)` （比赛开始时间戳需要延后4s）导致的，痛失一小时调试时间。  

```python
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def compare(a,b):
    if a>b:
        return '>'
    else:
        return '<'

url = 'http://202.38.93.141:12122/'

cookie = {'name': 'session', 'value':'cited'}

driver = webdriver.Chrome()

driver.get(url)

input('✨Make sure the site open: ')
driver.add_cookie(cookie)
driver.refresh()

js = 'return state.values;'
data = driver.execute_script(js)

print(data)
input('✨Make sure the site open: ')
result_arr = []
cnt = 0
for value in data:
    res = compare(value[0],value[1])
    result_arr.append(res)
    cnt +=1
    if cnt <= 99:
        driver.execute_script("state.inputs.push('" + res + "');")

print(result_arr)
driver.execute_script('state.score1 = 99;')

#这边按理来说应该更新一下score1与score2，使之与最后一个比大小的数字相等，但是我就喜欢有概率能过（p = 1/4）的，就不改了（

if result_arr[99] == '>':
    button = driver.find_element(By.ID, 'greater-than')
    button.click()
elif result_arr[99] == '<':
    button = driver.find_element(By.ID, 'less-than')
    button.click()
input('✨Make sure the site open: ')
```

flag{!-@m-tHE-H@CkER-K1nG-oF-C0MpariNg-nUmBer5-ZoZ4}

## 旅行照片 4.0

### LEO_CHAN?

* 问题 1: 照片拍摄的位置距离哪个校门更近？（格式：X校区Y门，均为一个汉字）

答案：`东校区西门`  
百度地图搜索 `科里科气科创驿站` 即可。  

* 问题 2: 话说 Leo 酱上次出现在桁架上是…… ACG 音乐会？日期我没记错的话是？（格式：YYYYMMDD）

答案：`20240519`  
B站上搜搜就有了，[一个例子](https://www.bilibili.com/video/BV1mr421w74g/?spm_id_from=333.1007.top_right_bar_window_history.content.click) 该视频简介中就有提及。
flag{5UB5CR1B3_T0_L30_CH4N_0N_B1L1B1L1_PLZ_xxx}  

### FULL_RECALL

* 问题 3: 这个公园的名称是什么？（不需要填写公园所在市区等信息）

答案：`坛子岭`  
百度识图得到[一位老人的游记](https://www.meipian.cn/38gw2vzq)，其中提到了 `坛子岭`。  

* 问题 4: 这个景观所在的景点的名字是？（三个汉字）

答案：`未来城市公园`  
瞪眼可得图片中有 `六安园林` 字样，证明这个公园在安徽六安，在 [百度地图](https://maps.baidu.com/poi/%E4%B8%AD%E5%A4%AE%E6%A3%AE%E6%9E%97%E5%85%AC%E5%9B%AD(%E9%95%BF%E5%AE%89%E5%8D%97%E8%B7%AF)/@12971244.180000002,3707476.0200000005,11.43z?uid=4ea3f2f1884c53b3aecb6600&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl) 中搜索 `公园` 并将范围限制在六安范围内，并且百度中搜索 `六安 网红 公园` 字样，交叉比对可得 `未来城市公园`。  
flag{D3T41LS_M4TT3R_1F_R3V3RS3_S34RCH_1S_1MP0SS1BL3_bc4cba248b}  

### OMINOUS_BELL

* 问题 5: 距离拍摄地最近的医院是？（无需包含院区、地名信息，格式：XXX医院）

答案：`积水潭医院`  
铁道迷立大功（，百度识图可得到 [知乎 - Julien的铁路文化 - 北京北郊铁路运转（S2、京张高铁、S5、S6）](https://zhuanlan.zhihu.com/p/163787440?utm_id=0) 可得图片中建筑为 `北京北动车运用所`，如果不放行还可以在百度中搜索 `四编组动车`，得到 [结果](https://baijiahao.baidu.com/s?id=1814068057932414070&wfr=spider&for=pc) 交叉比对即可验证，在百度地图上看到距离 `北京北动车运用所` 最近的医院是 `积水潭医院` 的一个分院。  

* 问题 6: 左下角的车型是编号是？

答案：`CRH6F-A`  
[知乎 - Julien的铁路文化 - 北京北郊铁路运转（S2、京张高铁、S5、S6）](https://zhuanlan.zhihu.com/p/163787440?utm_id=0) 与 [结果](https://baijiahao.baidu.com/s?id=1814068057932414070&wfr=spider&for=pc) 均提及了该车型为 `CRH6F-A`。  
flag{1_C4NT_C0NT1NU3_TH3_5T0RY_4NYM0R3_50M30N3_PLZ_H3LP_xxx}  

## 不宽的宽字符

用 `\0` 丢掉后面的内容即可，选用 `theflag\0`（UTF-8, 8x8b） 刚好对应了4个宽字符 (16x4b)，且 `g` 对应的 `wchar_t` 恰好以 `00` 结尾。  

```python
b'theflag\x00'.decode('utf-16-le') 

# Payload：桴晥慬g
```

```text
         +--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+
wchar_t  |                桴                 |                晥                 |                慬                 |                g                  |
         +--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+
hex      |       7 4       |       6 8       |       6 6       |       6 5       |       6 1       |       6 c       |       6 7       |       0 0       |
         +--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+
char     |        t        |        h        |        e        |        f        |        l        |        a        |        g        |        \0       |
         +--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+--------+

```

flag{wider_char_isnt_so_great_xxx}  

## PowerfulShell

```bash
FORBIDDEN_CHARS="'\";,.%^*?!@#%^&()><\/abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0"
```

比赛期间想到 [bashfuck](https://github.com/ProbiusOfficial/bashFuck)，结果发现通配符被ban掉了，没法做。  

## Node.js is Web Scale

## PaoluGPT

## 强大的正则表达式

```python
allowed_chars = "0123456789()|*"
max_len = 1000000
num_tests = 300
```

该题只允许使用 `|` 和 `*()` 匹配，且构造的正则表达式大小不得超过1MiB。  
就是高级版打表。  

### Easy

观察代码：

```python
if difficulty == 1:
    test_string = str(t)  # decimal
    if (t % 16 == 0) == expected_result:  # mod 16
        break
```

让我们再回忆一下16倍数的性质：`后四位可以被16整除`，且该结论显然，即可构造一个匹配任意后四位为16倍数的正则表达式即可，即 `0016 0032 0064 ...`。

**附注**：对于n<=1000，该构造无法匹配，但题给的MAXN比较大（2^64-1），所以对于每次匹配，取到n<=1000的概率P = 1000/(2^64-1) $/frac{1000}/{2^64-1]$近似为0，所以你有**极大概率**可以利用这种方法通过测试。  

gen.py：  

```python
b = ''
for j in range(1,625):
    a = j*16
    a = str(a)
    print(a)
    if len(a)<2:
        b+="|000"+str(a)
    elif len(a)<3:
        b+="|00"+str(a)
    elif len(a)<4:
        b+="|0"+str(a)
    else:
        b+="|"+str(a)
print("(0|1|2|3|4|5|6|7|8|9)*(0000" + b +')')

# res = (0|1|2|3|4|5|6|7|8|9)*(0000|0016|0032|0048|0064|0080|0096|...
# res.length = 3148
```

官方压行后的：  

```python
print('(0|1|2|3|4|5|6|7|8|9)*' + '(' + '|'.join(f'{i:04d}' for i in range(0, 10000, 16)) + ')')
```

flag{p0werful_r3gular_expressi0n_easy_xxx}

### Medium

```python
elif difficulty == 2:
    test_string = bin(t)[2:]  # binary
    if (t % 13 == 0) == expected_result:  # mod 13
        break
```

不会OI，所以自动机一点写不出来。。。  
但是我在github上搜到了一个差不多思路的开源项目 [Github - AngluinLearning](https://github.com/xuanhuangyiqi/AngluinLearning)，也是利用求解DFA来进行构造表达式的，区别就是这个是自动构造，题解是手动档。  
这个项目是python2的，我没跑得起来。。。  
手动档：DFA 的状态代表余数（有 0~12 一共 13 个状态），初始状态是 0，每次读入一个 bit 更新余数（状态转移）（s:=(s*2+b)%13），读入完毕后如果 DFA 处于 0 状态（余数为 0），就意味着这个二进制数整除 13。然后可以使用状态消除算法，将 DFA 转化为正则表达式。  
[状态消除算法 DFAs to regex](https://courses.grainger.illinois.edu/cs374/sp2019/extra_notes/01_nfa_to_reg.pdf)

```python
# pip install greenery
# pip install regex
from greenery import Fsm, Charclass, rxelems
import regex as re
import random

m = 13
d = 2

digits = [Charclass(str(i)) for i in range(d)]
other = ~Charclass("".join(str(i) for i in range(d)))
alphabet = set(digits + [other])
states = set(range(m + 1))  # m is the dead state
initial_state = 0
accepting_states = {0}
transition_map = dict()
for s in range(m):
    transition_map[s] = {digits[i]: (s * d + i) % m for i in range(d)}
    transition_map[s][other] = m
transition_map[m] = {digits[i]: m for i in range(d)}
transition_map[m][other] = m

dfa = Fsm(
    alphabet=alphabet,
    states=states,
    initial=initial_state,
    finals=accepting_states,
    map=transition_map,
)

def convert_regex(regex):
    # `(...)?` -> `((...)|)`
    while '?' in regex:
        regex = re.sub(r'\((.*?)\)\?', r'(\1|)', regex)
    # Handle `{n}` quantifier
    n = 1
    while '{' in regex:
        while '{' + str(n) + '}' in regex:
            regex = re.sub(r'(\((.*?)\)|\w)\{n\}'.replace('n', str(n)), r'\1' * n, regex)
        n += 1
    # [abc] -> (a|b|c)
    while '[' in regex:
        def convert_charset(match):
            chars = match.group(1)
            return '(' + '|'.join(chars) + ')'
        regex = re.sub(r'\[([^\]]+)\]', convert_charset, regex)
    assert set(regex) <= set("0123456789|()*")
    return regex

dfa = dfa.reduce()
regex = rxelems.from_fsm(dfa)
regex = regex.reduce()
regex = convert_regex(str(regex))
print(regex)

# res.length = 7279
```

flag{pow3rful_r3gular_expressi0n_medium_xxx}

### Hard

```python
elif difficulty == 3:
    test_string = str(t)  # decimal
    if (libscrc.gsm3(test_string.encode()) == 0) == expected_result:  # crc
        break
```

同样是构造 DFA 然后转换成正则表达式。这次 DFA 的状态是线性反馈移位寄存器（LFSR）的状态，寄存器有 3 位，一共是 8 种状态（000~111），DFA 初始状态是 111，每次读入一个字符更新状态，读入完毕后如果 DFA 处于 000 状态，就意味着这个字符串符合要求。  

```python
# pip install greenery
# pip install regex
# pip install libscrc
from greenery import Fsm, Charclass, rxelems
import regex as re
import libscrc

digits = [Charclass(str(i)) for i in range(10)]
other = ~Charclass(''.join(str(i) for i in range(10)))
alphabet = set(digits + [other])
states = set(range(9))  # 8 is the dead state
initial_state = libscrc.gsm3(b'')  # 7 (111)
accepting_states = {0}
transition_map = {s:dict() for s in states}
for s in states:
    transition_map[s][other] = 8
for prefix in range(1000):
    for i in range(10):
        s_1 = libscrc.gsm3(str(prefix).encode())
        s_2 = libscrc.gsm3(str(prefix).encode() + str(i).encode())
        transition_map[s_1][digits[i]] = s_2
for i in range(10):
    transition_map[8][digits[i]] = 8

dfa = Fsm(
    alphabet=alphabet,
    states=states,
    initial=initial_state,
    finals=accepting_states,
    map=transition_map,
)

def convert_regex(regex):
    # `(...)?` -> `((...)|)`
    while '?' in regex:
        regex = re.sub(r'\((.*?)\)\?', r'(\1|)', regex)
    # Handle `{n}` quantifier
    n = 1
    while '{' in regex:
        while '{' + str(n) + '}' in regex:
            regex = re.sub(r'(\((.*?)\)|\w)\{n\}'.replace('n', str(n)), r'\1' * n, regex)
        n += 1
    # [abc] -> (a|b|c)
    while '[' in regex:
        def convert_charset(match):
            chars = match.group(1)
            return '(' + '|'.join(chars) + ')'
        regex = re.sub(r'\[([^\]]+)\]', convert_charset, regex)
    assert set(regex) <= set("0123456789|()*")
    return regex

dfa = dfa.reduce()
regex = rxelems.from_fsm(dfa)
regex = regex.reduce()
regex = convert_regex(str(regex))
print(regex)
```

## 惜字如金 3.0

### 题目 A

手动补全即可

### 题目 B

不会，赛后看选手wp，这个用掏GPU枚举的我真的没想到 [Mako #Ciallo～(∠・ω< )⌒★ writeup](https://github.com/USTC-Hackergame/hackergame2024-writeups/blob/master/players/Mako%20%23Ciallo%EF%BD%9E(%E2%88%A0%E3%83%BB%CF%89%20)%E2%8C%92%E2%98%85/wp.md)  

### 题目 C

不会

## 无法获得的秘密

[大神们的方法多种多样.jpg](https://github.com/USTC-Hackergame/hackergame2024-writeups/blob/master/players/Mako%20%23Ciallo%EF%BD%9E(%E2%88%A0%E3%83%BB%CF%89%20)%E2%8C%92%E2%98%85/wp.md)
