## After Install

### WSL2でLinux～Windows間のファイルのやり取り

①　エクスプローラーからWSLへのアクセス
```
\\wsl$
```


### WSL2のカスタマイズ (oh-my-posh)

cf. [Oh My Poshを利用してWSL2上のUbuntuのbashプロンプトをいい感じにする](https://qiita.com/SAITO_Keita/items/e4d69d7836214a008d01)





### PowerShellのカスタマイズ (oh-my-posh)

(正規の情報)
https://learn.microsoft.com/ja-jp/windows/terminal/tutorials/custom-prompt-setup

まずは、[NerdFont](https://www.nerdfonts.com/font-downloads)をインストール。

フォントのインストールは、[Add a font](https://support.microsoft.com/en-us/office/add-a-font-b7c5f17c-4426-4b53-967f-455339c564c1)

テーマのサンプルは、[Themes | Oh My Posh](https://ohmyposh.dev/docs/themes)

```

new-item -type file -path $profile -force

winget install JanDeDobbeleer.OhMyPosh

winget install oh-my-posh

oh-my-posh version

winget upgrade oh-my-posh

```


### WSL2のカスタマイズ (oh-my-posh)


cf. [Oh My Poshを利用してcmdプロンプト（Clink）をいい感じにする](https://qiita.com/SAITO_Keita/items/7eac08eb632c3d3eb286)


#### Oh My Posh のインストール

```
sudo wget https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/posh-linux-amd64 -O /usr/local/bin/oh-my-posh

sudo chmod +x /usr/local/bin/oh-my-posh
```

#### Poshテーマのダウンロード

```
mkdir ~/.poshthemes
wget https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/themes.zip -O ~/.poshthemes/themes.zip
unzip ~/.poshthemes/themes.zip -d ~/.poshthemes
chmod u+rw ~/.poshthemes/*.omp.*
rm ~/.poshthemes/themes.zip
```

#### BashにてＯＭＰを有効化

 .bashrc に下記を追加して起動時に Oh My Poshを読み込むように設定します。
```
eval "$(oh-my-posh init bash)"
```

 .bashrcを更新したら、下記でプロファイルをリロードします。

```
exec bash
```

#### テーマ切り替え

テーマ一覧は `~/.poshthemes`

テーマ切り替えのコマンド（.bashrcの登録も忘れずに）

```

eval "$(oh-my-posh init bash --config ~/.poshthemes/M365Princess.omp.json)"

または

eval "$(oh-my-posh init bash --config ~/.poshthemes/tokyonight_storm.omp.json)"
```

