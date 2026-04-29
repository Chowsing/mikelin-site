# 林朝興教授個人網站 Astro 重構版

以 Astro 建立的靜態學術個人網站，內容保留自原始網站並改為資料驅動結構，方便後續維護、版本控管與 GitHub Pages 部署。

原網站：<https://mail.nutn.edu.tw/mikelin/>

## 技術重點

- Astro 靜態網站
- 內容使用 YAML 管理
- 響應式設計，支援手機、平板、桌機
- 共用 Layout、Header、Footer
- 基本 SEO metadata 與 `Person` structured data
- 內建 GitHub Pages workflow

## 專案結構

```text
.
├── .github/workflows/deploy.yml
├── public/
│   └── images/
├── scripts/
│   └── extract-data.mjs
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
└── README.md
```

## 內容檔案

所有主要內容都放在 `src/data/`：

- `profile.yaml`
- `research-interests.yaml`
- `research-projects.yaml`
- `publications.yaml`
- `courses.yaml`
- `services.yaml`
- `awards.yaml`

## 本機開發

```bash
npm install
npm run dev
```

預設開發網址：`http://localhost:4321`

## 建置

```bash
npm run build
npm run preview
```

## 如何更新內容

### 1. 更新個人資料

編輯 `src/data/profile.yaml`。

可更新內容包含：

- 姓名
- 職稱
- 研究室
- 分機
- 傳真
- 學歷
- 研究興趣摘要
- 課程摘要
- 外部連結

### 2. 新增研究計畫

編輯 `src/data/research-projects.yaml`，每筆資料格式如下：

```yaml
- category: 國科會研究計畫
  title: 115 專題研究計畫（一般研究計畫）
  year: 2026
  topic: 計畫主題
  projectNumber: 115-xxxx
  sponsor: 國科會
  role: 計畫主持人
  period: 115/08-116/07
```

`category` 可使用：

- `教育部研究計畫`
- `國科會研究計畫`
- `大專生科技研究計畫`
- `產學合作計畫`

### 3. 新增論文

編輯 `src/data/publications.yaml`：

```yaml
- type: journal
  year: 2026
  citation: 作者，"論文標題"，期刊名稱，卷期頁碼，年份。
```

`type` 可使用：

- `journal`
- `conference`
- `book`

### 4. 更新課程

編輯 `src/data/courses.yaml`：

```yaml
- level: 研究所
  titleZh: 深度學習專題
  titleEn: Special Topics on Deep Learning
```

### 5. 更新服務紀錄

編輯 `src/data/services.yaml`：

```yaml
- category: 學術服務
  year: 2026
  role: 評審委員
  description: 某研討會或校外評審服務
  fullText: 評審委員，某研討會或校外評審服務
```

### 6. 更新獲獎紀錄

編輯 `src/data/awards.yaml`：

```yaml
- category: 論文發表
  year: 2026
  text: 最佳論文獎：某國際研討會，論文題目：XXX
```

### 7. 更新後如何發布

如果只是修改 `src/data/*.yaml` 內容，發布流程如下：

```bash
npm run build
git add .
git commit -m "Update site content"
git push origin master
```

推送後，GitHub Actions 會自動部署到 GitHub Pages。

可到這裡確認部署狀態：

- `https://github.com/Chowsing/mikelin-site/actions`

網站網址：

- `https://chowsing.github.io/mikelin-site/`

## GitHub Pages 部署

本專案已提供 `.github/workflows/deploy.yml`，推送到 `master` 或 `main` 後即可自動部署。

### GitHub Repository 設定

1. 到 GitHub 專案頁面
2. 開啟 `Settings` -> `Pages`
3. `Source` 選擇 `GitHub Actions`

### `site` 與 `base`

`astro.config.mjs` 已支援環境變數：

- `SITE_URL`
- `BASE_PATH`

GitHub Actions 會自動帶入：

- 使用者首頁站：`https://<user>.github.io/`
- 專案頁面站：`https://<user>.github.io/<repo>/`

如果要手動建置專案頁面站，可使用：

```bash
SITE_URL="https://<user>.github.io" BASE_PATH="/<repo>/" npm run build
```

## 原始資料重新擷取

如果要重新從原網站抓取資料並覆寫 YAML，可使用：

```bash
node scripts/extract-data.mjs
```

注意：此腳本是依原網站 HTML 結構撰寫，若原站格式變更，可能需要一起調整解析規則。

## 備註

- 已對原站做基本去重與格式整理
- 明顯重複的論文與條目會優先保留較完整版本
- 原站少量格式不一致、斷行與標點問題已在資料層統一
