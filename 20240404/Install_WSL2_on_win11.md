## Windows11 にWSL２をインストール



1. 「設定」＞「アプリ」＞「オプション機能」＞「Windowsのその他の機能」
2. 「Linux用Windowsサブシステム」と「仮想マシンプラットフォーム」を有効にし、OSを再起動する。
3. 上記2で「仮想マシンプラットフォーム」(※注１) で失敗する場合は、UEFIで「仮想化テクノロジ」を有効にする
4. 「設定」＞「プライバシーとセキュリティ」＞「開発者向け」＞「開発者モード」をONにする。

(※注１) タスクマネージャの「パフォーマンス」タブの「CPU」を見ると、「仮想化」という項目で「有効・無効」を確認できる。

cf.
https://qiita.com/matarillo/items/98d7452967987fe5d633
https://learn.microsoft.com/ja-jp/windows/wsl/install-manual
https://learn.microsoft.com/ja-jp/windows/wsl/install
https://dev.classmethod.jp/articles/how-to-setup-wsl2-for-windows11


## 「Linux カーネル更新プログラム パッケージ」インストール並びにWSLバージョン設定

1. [Linux カーネル更新プログラム パッケージ](https://learn.microsoft.com/ja-jp/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)をDLして実行する．


2. WSL2 を規定のバージョンとして設定する

```
wsl --set-default-version 2
```

3. インストール開始

```
wsl --list --online

wsl --update

wsl --install -d Ubuntu-22.04

wsl --set-version Ubuntu 20.04.6 2

```


https://qiita.com/ryome/items/240f36923f5cb989da27

https://learn.microsoft.com/ja-jp/windows/wsl/install-manual

インストール後
`wslregisterdistribution failed with error: 0x800701bc`
がでたら、[Linux カーネル更新プログラム パッケージ](https://learn.microsoft.com/ja-jp/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)をDLして実行する．



### 2024/04/04付け　WSL適用可能なLinuxディストリビューション

```
PS C:\Windows\system32> wsl.exe --list --online
インストールできる有効なディストリビューションの一覧を次に示します。
'wsl.exe --install <Distro>' を使用してインストールします。

NAME                                   FRIENDLY NAME
Ubuntu                                 Ubuntu
Debian                                 Debian GNU/Linux
kali-linux                             Kali Linux Rolling
Ubuntu-18.04                           Ubuntu 18.04 LTS
Ubuntu-20.04                           Ubuntu 20.04 LTS
Ubuntu-22.04                           Ubuntu 22.04 LTS
OracleLinux_7_9                        Oracle Linux 7.9
OracleLinux_8_7                        Oracle Linux 8.7
OracleLinux_9_1                        Oracle Linux 9.1
openSUSE-Leap-15.5                     openSUSE Leap 15.5
SUSE-Linux-Enterprise-Server-15-SP4    SUSE Linux Enterprise Server 15 SP4
SUSE-Linux-Enterprise-15-SP5           SUSE Linux Enterprise 15 SP5
openSUSE-Tumbleweed                    openSUSE Tumbleweed

```
