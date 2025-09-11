# YouTube to MP3 Downloader

A full-stack web app to convert YouTube videos to MP3 audio files. Built with React (frontend) and Node.js/Express (backend) using yt-dlp and ffmpeg for audio extraction.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Jeffrin2005/Youtube_To_MP3_Downloader.git
```


### 2. Install dependencies (root directory)
```bash
npm install
```

### 3. Install backend dependencies (if not already)
```bash
cd server
npm install
cd ..
```

### 4. Install yt-dlp (required for backend)
- **Recommended:**
  - Download the [yt-dlp binary](https://github.com/yt-dlp/yt-dlp/releases/latest) and place it in your PATH
  - Or install via Python:
    ```bash
    pip install -U yt-dlp
    ```

### 5. Start the backend server
```bash
npm run server
```
- Runs on [http://localhost:8000](http://localhost:8000)

### 6. Start the frontend React app (in a new terminal)
```bash
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)

---


https://github.com/user-attachments/assets/d0b9548c-ac79-43a3-98e5-35169d8b6de5




## Usage
- Enter a YouTube video URL and click "Convert to MP3".
- Wait for the progress bar to complete.
- Download the MP3 file when ready.

---

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, ytdl-core, youtube-dl-exec (yt-dlp), fluent-ffmpeg, ffmpeg-static, sanitize-filename

---

## Notes
- Make sure `yt-dlp` is installed and available in your system PATH for the backend to work.
- FFmpeg is bundled via `ffmpeg-static`.

---
