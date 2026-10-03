# CrypTao 官网

纯静态网站（HTML + CSS + 原生 JS），零依赖、零费用，部署在 GitHub Pages。

## 文件结构

```
crypTao-site/
├── index.html              # 单页，包含四大板块
├── assets/
│   ├── css/styles.css      # 全部样式（简洁现代风 / 移动端适配）
│   └── js/
│       ├── products.js     # 商品数据，改这里就能增删商品
│       └── main.js         # 导航、筛选、表单等交互
├── robots.txt              # 搜索引擎抓取规则
├── sitemap.xml             # 站点地图（SEO）
├── .nojekyll               # 跳过 Jekyll 构建
└── README.md
```

四个板块：关于我们 `#about`、商品 `#products`、供应链 `#supply`、联系方式 `#contact`。

## 本地预览

方式一：直接双击 `index.html`。
方式二（推荐）：在项目目录里执行

```bash
python -m http.server 8000
```

然后浏览器打开 http://localhost:8000

## 日常维护

- **改商品**：编辑 `assets/js/products.js`，每个商品是一条 `{ name, category, price, desc, tag }`，保存刷新即可。
- **改联系方式**：`index.html` 里搜索 `hello@cryptao.example` 和 `CrypTao_Service`，替换成你的邮箱和微信。
- **改配色**：`assets/css/styles.css` 顶部的 `--brand` 变量。
- **改 SEO 文案**：`index.html` 的 `<title>`、`<meta name="description">`、canonical 链接。

## 联系表单说明

静态站没有后端，表单提交后会打开用户本机邮件客户端（mailto），把留言发到你的邮箱。
如果你想收站内留言，可以之后免费接入 Formspree / Getform（注册免费额度即可），我也可以帮你接。

## 部署到 GitHub Pages

1. 注册/登录 https://github.com
2. 新建仓库，仓库名必须填：`crypTao.github.io`（把 crypTao 换成你的 GitHub 用户名，大小写尽量一致），选 Public，勾不勾 README 都行
3. 上传本文件夹里的全部文件到仓库根目录（注意是文件本身，不要多套一层 `crypTao-site/` 目录）
4. 仓库页面 → Settings → 左侧 Pages → Source 选 `Deploy from a branch` → Branch 选 `main`、目录选 `/ (root)` → Save
5. 等 1–3 分钟，访问 `https://crypTao.github.io` 就能看到网站

### 用命令行上传（可选）

```bash
cd crypTao-site
git init
git add .
git commit -m "init CrypTao site"
git branch -M main
git remote add origin https://github.com/crypTao/crypTao.github.io.git
git push -u origin main
```

之后每次改完再执行：

```bash
git add . && git commit -m "update" && git push
```

## 免费额度说明

GitHub Pages：免费，含 `*.github.io` 子域名与 HTTPS，无需服务器、数据库、付费 API。
