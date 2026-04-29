## Project

`/root/mikelin-site` 是林朝興教授個人網站的 Astro 重構版。

## Current Status

- 已從 Astro 預設範本改為學術個人網站
- 已新增多頁面架構：首頁、研究、論文、課程、服務、獲獎
- 已新增共用 layout、header、footer 與多個內容元件
- 已將主要內容改為 `src/data/` 下的資料驅動結構
- 已加入 GitHub Pages 部署相關設定與資料擷取腳本
- 已於 2026-04-28 執行 `npm run build`，目前可正常建置
- 已於 2026-04-28 重新調整首頁版面，重整 hero 資訊層級與首頁區塊引導文案
- 已於 2026-04-28 驗證 `SITE_URL` / `BASE_PATH` 建置輸出，專案頁面站路徑正常
- 已修正 `.github/workflows/deploy.yml`，讓 GitHub Pages workflow 同時支援 `master` 與 `main`
- 已於 2026-04-28 依版面審閱持續精簡首頁，移除重複資訊、快速導覽卡片與首頁統計區塊，並重新整理 hero 區塊層級
- 已將學歷移至姓名區下方，右側欄位縮減為照片、聯絡資訊與外部連結
- 已更新姓名與職稱顯示為 `林朝興`、`教授兼資工系主任`
- 已建立 commit：`d3192db` `Rebuild the site around structured academic content`
- commit 後持續微調首頁：研究計畫改為首頁分組顯示 `國科會研究計畫` / `教育部研究計畫`，增加國科會項目數、移除首頁授課課程區塊、縮小右側照片
- `tmp-source/` 已確認為資料擷取用本地快照，已加入 `.gitignore`
- 已建立 commit：`546efdc` `Refine the homepage content layout`
- 已建立 commit：`1126377` `Polish homepage presentation and project data`
- 已建立 GitHub repo：`https://github.com/Chowsing/mikelin-site`
- 已改用 SSH remote 並成功推送 `master` 到 GitHub
- 已建立 commit：`a4d39b4` `Update project notes for GitHub Pages rollout`
- 已再將最新 `master` 推送到 GitHub，等待 GitHub Pages workflow 完成首次部署

## Important Files

- `README.md`: 專案說明與內容維護方式
- `astro.config.mjs`: 靜態輸出與 `SITE_URL` / `BASE_PATH` 設定
- `src/pages/index.astro`: 首頁
- `src/pages/research.astro`: 研究計畫頁
- `src/pages/publications.astro`: 論文頁
- `src/pages/courses.astro`: 課程頁
- `src/pages/service.astro`: 服務頁
- `src/pages/awards.astro`: 獲獎頁
- `src/layouts/BaseLayout.astro`: 主 layout
- `src/data/`: 內容資料

## Git Snapshot

- 初始 commit: `bf74945` `Initial commit from Astro`
- 目前 worktree 有大量未提交變更

## Notes For Next Session

- 先看 `git status`
- 再看 `NEXT_STEPS.md`
- 目前 build 已通過；部署 workflow 分支觸發也已補齊，若要確認可否發布，優先做頁面顯示檢查
- 本輪主要持續調整首頁，子頁面資料與結構未另外重組
- GitHub Pages 若尚未生效，先到 repo settings 把 Pages source 設為 `GitHub Actions`
- 若網站仍顯示 404，先到 GitHub Actions 確認 `Deploy Astro to GitHub Pages` 是否已成功
