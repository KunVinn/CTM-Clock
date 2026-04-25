# CTM-Music · Five-Tone Healing Tracks

This folder is where the audio files for the meridian-time music player live.

The site references tracks by filename only (e.g. `春江花月夜.mp3`), and the
player automatically picks the correct track for the current 时辰 (two-hour
window) based on the active organ meridian.

## How to add the music

For full functionality, drop `.mp3` files matching the filenames below into
this folder. The site works perfectly without any audio — the player simply
shows "track not loaded" messages instead of playing.

The original track set is sourced from the upstream project
**KunVinn/CTM-Clock** (https://github.com/KunVinn/CTM-Clock), which uses
public-domain Chinese classical pieces selected for their five-tone (五音)
correspondence with each organ system.

## Track filenames

### 子时 23:00–01:00 · Gallbladder · 角音 (jué)
- 肝胆相照.mp3
- 木调晨曦.mp3
- 胡笳十八拍.mp3
- 姑苏行.mp3

### 丑时 01:00–03:00 · Liver · 角音 (jué)
- 春江花月夜.mp3
- 紫竹调.mp3
- 庄周梦蝶.mp3

### 寅时 03:00–05:00 · Lung · 商音 (shāng)
- 阳春白雪.mp3
- 广陵散.mp3
- 黄河大合唱.mp3

### 卯时 05:00–07:00 · Large Intestine · 商音/宫音
- 潇湘水云.mp3
- 梅花三弄.mp3
- 十面埋伏.mp3

### 辰时 07:00–09:00 · Stomach · 宫音/羽音
- 古琴山居吟.mp3
- 洞庭秋思.mp3
- 北国之春.mp3

### 巳时 09:00–11:00 · Spleen · 宫音/徵音
- 高山流水.mp3
- 阳春.mp3
- 花好月圆.mp3

### 午时 11:00–13:00 · Heart · 徵音/羽音
- 乌夜啼.mp3
- 雉朝飞.mp3
- 步步高.mp3

### 未时 13:00–15:00 · Small Intestine · 徵音/角音
- 列子御风.mp3
- 文王操.mp3
- 渔舟唱晚.mp3

### 申时 15:00–17:00 · Bladder · 羽音/商音
- 长清.mp3
- 白雪.mp3
- 平湖秋月.mp3

### 酉时 17:00–19:00 · Kidney · 羽音
- 流水.mp3
- 鹤鸣九皋.mp3
- 二泉映月.mp3

### 戌时 19:00–21:00 · Pericardium · 徵音/角音
- 文王操.mp3
- 庄周梦蝶.mp3
- 烛影摇红.mp3

### 亥时 21:00–23:00 · Triple Burner · 商音/宫音
- 平沙落雁.mp3
- 忆故人.mp3
- 阳关三叠.mp3

## Notes

- File names use Chinese characters as in the upstream repo.
- The browser handles UTF-8 paths fine on all modern hosts (including Netlify).
- If you want to avoid Chinese filenames, you can rename your files and update
  the matching entries in `assets/data.js` under the `MUSIC_DATA` constant.
- Files that don't exist will simply skip silently (the player auto-advances).
