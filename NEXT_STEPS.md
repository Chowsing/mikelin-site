## Next Steps

1. 檢查首頁與各分頁內容是否正確顯示
2. 確認實際部署目標是 GitHub 使用者首頁站或專案頁面站
3. 視需要將 commit 後的首頁微調與 `.gitignore` 收尾另建一筆 commit
4. 若要上線，確認首頁實際視覺呈現後即可推進 deploy

## Latest Verification

- 已執行 `git status`，目前仍有大量未提交變更，符合前一輪重構中的狀態
- 已執行 `npm run build`，建置成功，輸出於 `dist/`
- `.github/workflows/deploy.yml` 已在 GitHub Actions 中自動帶入 `SITE_URL` 與 `BASE_PATH`
- 已再次用 `SITE_URL="https://example.github.io" BASE_PATH="/mikelin-site/" npm run build` 驗證，產出路徑正確
- workflow push trigger 已補上 `master`，避免目前分支推送後不會自動部署
- 已依最新要求持續精簡首頁，移除重複文字、重複連結、研究興趣區塊、5 個快速導覽卡片與重點統計區塊
- 已將學歷移至左側姓名資訊下方，右側欄位縮短
- 已更新首頁姓名與職稱顯示為 `林朝興`、`教授兼資工系主任`
- 已建立 commit：`d3192db` `Rebuild the site around structured academic content`
- commit 後又追加首頁微調：首頁研究計畫分成 `國科會研究計畫` / `教育部研究計畫`、增加國科會顯示筆數、移除首頁授課課程、縮小右側照片
- `tmp-source/` 已加入 `.gitignore`，避免持續出現在 worktree

## Suggested Prompt Next Time

可直接對我說：

- `先看 /root/mikelin-site/WORKLOG.md 和 NEXT_STEPS.md，然後接著做`
- `先讀 /root/mikelin-site 的交接檔，再幫我延續上次進度`
- `先看 mikelin-site 的 git status、WORKLOG.md、NEXT_STEPS.md`

## Open Questions

- 目前尚未確認首頁在瀏覽器中的實際呈現是否符合預期
- 目前已有一筆主重構 commit，但首頁後續微調尚未另行提交
- 尚未確認實際部署目標是 GitHub 使用者首頁站或專案頁面站；目前兩者設定邏輯都已支援
- 尚未確認是否還要補內容或調整版面
