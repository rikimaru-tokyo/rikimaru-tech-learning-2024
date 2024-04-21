## WSL2に設定されているかの確認

https://qiita.com/siruku6/items/6506cebb9ca0c6cd24b8

```
wsl -l -v
  NAME            STATE           VERSION
* Ubuntu-20.04    Stopped         2

wsl --set-version Ubuntu-20.04 2
```


## Ubuntu on WSL2でのDocker Engineの最短インストール手順
https://qiita.com/nujust/items/d7cd395baa0c5dc94fc5

WSL2上にUbuntu-22.04LTSを導入し、Dockerをインストールしようとしたら、いろいろとハマった件
(VPNを使った環境では、resolv.confが起動のたびに生成されて邪魔になる問題)

https://developer.mamezou-tech.com/blogs/2023/09/09/docker_ubuntu_on_wsl2


### 1. Ubuntu-22.04 にログインして「/etc/wsl.conf」ファイルを編集。

```
sudo vi /etc/wsl.conf
```

### 2. 「/etc/wsl.conf」ファイルの末尾に２行を追記。

```
# 何故「/etc/wsl.conf」への設定が必要か？　＝　設定を永続化するため。

[network]
generateResolvConf = false
# 目的：resolv.confが自動生成させない。
```

### 3. 次に「/etc/resolv.conf」ファイルを更新。

```
sudo vim /etc/resolv.conf

nameserver 8.8.8.8
```


### 4. 「/etc/resolv.conf」ファイル消失対策

```
会社のPC等を使用していてVPNを利用している場合は、DNS で名前解決が出来ないという問題が発生する。
そこで DNS のネームサーバを記述している「/etc/resolv.conf」ファイルを編集が必要だが、
WSL2 のデフォルト設定では、WSL2 を再起動したときに WSL2 が「/etc/resolv.conf」ファイルを自動生成
してしまい、「/etc/resolv.conf」ファイルを編集した内容が上書きされて消失する。

```

### 5.「/etc/resolv.conf」ファイルが消されてしまわないように属性変更。

```
sudo chattr -f +i /etc/resolv.conf

```


### chattrコマンドについて

https://xtech.nikkei.com/it/article/COLUMN/20140115/529923/

samplefileを削除不可能にする。

```
chattr +i samplefile
```


samplefileを削除できるように戻す。

```
chattr -i samplefile
```



## WSL2の設定ファイル

https://dev.classmethod.jp/articles/learn_wsl2_wslconf



## 「/etc/resolv.conf」ファイル

https://linuc.org/study/knowledge/507

https://wa3.i-3-i.info/word11781.html

https://qiita.com/miyuki_samitani/items/7c6a59a17e47abf6dcad

「/etc/resolv.conf」ファイルは、名前解決（ホスト名からIPアドレスを調べること）の設定を行うファイル

```
nameserver     192.168.0.1
nameserver     192.168.0.2
domain         localdomain
search         dm1.example.org   dm2.example.org
```


#### nameserver : DNSサーバのIPアドレス

nameserver は最低でも書いておかないと名前解決ができないので、yum update等も実行できない。
名前解決が必要になった場合、上から順に問い合わせする。
3台まで指定可能。



#### domain : ドメイン名
自分が所属しているドメイン名を指定する。
記載しておくと名前解決の際にドメイン名を加えて解決。
例えば、 www の名前解決の際に、 example.com を加えて www.example.com. で名前解決をしようとします。

```
domain example.com.
```

#### search : 検索リスト
search は domeinを複数指定する際に使用。
名前解決の際にドメイン名を加えて解決を行い、
一番左であれば、www の名前解決の際に、 aaa.example.com を加えて aaa.www.example.com. で名前解決を試す。
解決できないのであれば、 その左の test.example.com で名前解決を試す。
6つまで指定可能。

```
domain aaa.example.com. test.example.com. example.com.
```


## では、何故WSL2でDockerをインストールや動作をする時にresolveでエラーになるのか？

https://qiita.com/tomoten/items/288d879381bb83d95652

https://qiita.com/moritalous/items/9a1b4d71961d09f81c8b

https://cn.teldevice.co.jp/blog/p41204/

前述、「4. 「/etc/resolv.conf」ファイル消失対策」にもあったように「/etc/resolv.conf」
がログインのたびに上書きされている原因が大きい。
WSL2のUbuntuでdockerコンテナを起動しても外部通信できない。

WSLでは、明示的にnameserverの指定が必要。
色々調査したところ、WSLを起動するたびにnameserverの指定をするresolv.confが自動生成されてしまい
設定が初期化されてしまう。
そこでまずは、自動生成をされないようにwsl.confの設定を変更してからresolv.confの設定を変更。


### WSLからインターネットに接続できないときは/etc/resolv.confを変更する

https://blog.cosnomi.com/posts/wsl-resolv-conf/



## いよいよDockerインストール


### Ubuntu-22.04 のパッケージ更新
```
# Advanced Package Tool
sudo apt update
sudo apt upgrade -y
```


###　Docker の公式GPGキーの追加

```
sudo apt install ca-certificates curl gnupg lsb-release -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### Docker のリポジトリを APTソースリストに追加

```
# ここでUpdateエラーにならなかったらresolveはセーフ。 sources.list のチェックお忘れなく。

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
```

#### 2024/04/21  ↑　updateしたらこんなエラーが出たぞ。

https://qiita.com/siruku6/items/6506cebb9ca0c6cd24b8

```
 GPG error: https://download.docker.com/linux/ubuntu focal InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 7EA0A9C3F273FCD8
```

WSLのカーネルおよびUbuntuのカーネルバージョンが２になっているかを確認する。
また、[Linux カーネル更新プログラム パッケージ](https://learn.microsoft.com/ja-jp/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)も必要な場合もある。


### Docker インストール

Docker に必要なパッケージをインストール。（Docker 本体は「docker-ce」パッケージを指す。）

```
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
```

### Docker の使用権限をオレオレユーザーに加える

```
sudo usermod -a -G docker *****
```

### Docker の自動起動デーモン設定

```
sudo systemctl enable docker
sudo service docker start

# 起動チェック
docker run hello-world

```