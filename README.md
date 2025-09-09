# YouTube to MP3 Downloader

A full-stack web app to convert YouTube videos to MP3 audio files. Built with React (frontend) and Node.js/Express (backend) using yt-dlp and ffmpeg for audio extraction.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Jeffrin2005/Youtube_To_MP3_Downloader.git
cd Youtube_To_MP3_Downloader
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

## License
MIT

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
