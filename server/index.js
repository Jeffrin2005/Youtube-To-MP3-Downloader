const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ytdlp = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const sanitize = require('sanitize-filename');

ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Simple health check
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

// POST /download { url: "https://youtu.be/..." }
app.post('/download', async (req, res) => {
  const { url } = req.body || {};

  // Validate URL
  if (!url || !ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    // Use yt-dlp to fetch audio reliably
    // Get video title first
    let title = 'audio';
    try {
      const infoJson = await new Promise((resolve, reject) => {
        let jsonBuf = '';
        const proc = ytdlp(url, { dumpSingleJson: true, noWarnings: true, noCheckCertificates: true });
        proc.stdout.on('data', (d) => (jsonBuf += d.toString()));
        proc.on('close', (code) => {
          if (code === 0) {
            try {
              resolve(JSON.parse(jsonBuf));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(new Error('yt-dlp exited with code ' + code));
          }
        });
      });
      title = sanitize(infoJson.title || 'audio');
    } catch (_e) {}

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);

    // Stream best audio using yt-dlp to stdout
    const { spawn } = require('child_process');
    const audioStream = spawn('yt-dlp', [
      '-f', 'bestaudio',
      '-o', '-',
      '--no-warnings',
      '--no-check-certificate',
      url
    ]).stdout;

    // Convert to MP3 using ffmpeg and pipe to response
    ffmpeg(audioStream)
      .audioBitrate(128)
      .format('mp3')
      .on('error', (err) => {
        console.error('FFmpeg error:', err.message);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Conversion failed' });
        } else {
          res.end();
        }
      })
      .on('end', () => {
        // Conversion finished
      })
      .pipe(res, { end: true });
  } catch (err) {
    console.error('Download error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Could not process link' });
    }
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`YouTube to MP3 backend listening at http://localhost:${PORT}`);
});
