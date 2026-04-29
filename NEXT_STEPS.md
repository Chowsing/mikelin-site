## Next Steps

1. 重新確認首頁與各分頁內容是否正確顯示
2. 重新確認實際部署網址 `https://chowsing.github.io/mikelin-site/` 已反映 commit `01a92cb`
3. 若仍有首頁細節需微調，再另建一筆 commit
4. 若後續需要，可直接用 `gh` 在 VPS 上查 Actions 或建立 PR

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
- 已建立 commit：`546efdc` `Refine the homepage content layout`
- 已建立 commit：`1126377` `Polish homepage presentation and project data`
- 已建立 commit：`a4d39b4` `Update project notes for GitHub Pages rollout`
- 已建立 commit：`d5c3239` `Refine homepage presentation and deployment notes`
- 已建立 commit：`1da3453` `Polish homepage hero spacing`
- 已再調整首頁 hero：研究重點維持 3 欄、文字不換行，右側照片縮小，研究重點上下留白重新分配
- 已建立 commit：`01a92cb` `Refine homepage hero spacing`
- 已推送最新 `master`，對應 workflow run：`https://github.com/Chowsing/mikelin-site/actions/runs/25090432875`
- 已確認正式站 `https://chowsing.github.io/mikelin-site/` 可正常開啟
- 已安裝 `gh` (`2.45.0`) 並完成 `gh auth login`，目前登入帳號為 `Chowsing`
- 已用 `gh run list` 確認最新 workflow run `25090432875` 狀態為 `completed success`
- commit 後又追加首頁微調：首頁研究計畫分成 `國科會研究計畫` / `教育部研究計畫`、兩組皆列到 2010 年、服務與獲獎改為近 5 年、移除首頁授課課程、縮小右側照片
- 已持續微調首頁 hero 區塊：研究重點改為 6 筆、研究重點卡片欄數切換測試、姓名字級縮小、照片尺寸與左右欄留白重整
- 已將最新首頁 hero 微調推送到 `master`，等待 GitHub Actions 再次部署
- `tmp-source/` 已加入 `.gitignore`，避免持續出現在 worktree
- 已建立 GitHub repo：`https://github.com/Chowsing/mikelin-site`
- 已改用 SSH remote 並成功推送 `master` 到 GitHub
- 已在 Pages settings 啟用 `GitHub Actions`
- 發現 404 後已補推最新 `master`，目前等待 Actions 完成首次部署

## Suggested Prompt Next Time

可直接對我說：

- `先看 /root/mikelin-site/WORKLOG.md 和 NEXT_STEPS.md，然後接著做`
- `先讀 /root/mikelin-site 的交接檔，再幫我延續上次進度`
- `先看 mikelin-site 的 git status、WORKLOG.md、NEXT_STEPS.md`

## Open Questions

- 最新正式站是否已完整反映 commit `01a92cb` 的 hero 微調，仍可再人工檢查一次畫面
