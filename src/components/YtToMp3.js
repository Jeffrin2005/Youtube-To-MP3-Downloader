import React, { useState } from "react";
function YtToMp3() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | converting | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState("audio.mp3");
  const [progress, setProgress] = useState(0);

  function isValidYoutubeUrl(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+$/i;
    return pattern.test(url);
  }

  function handleConvert(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!isValidYoutubeUrl(youtubeUrl)) {
      setStatus("error");
      setErrorMessage("Please enter a valid YouTube URL.");
      return;
    }

    setStatus("converting");
    setProgress(0);

    const backendBase = 'http://localhost:8000';
    fetch(`${backendBase}/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: youtubeUrl })
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.detail || data.error || 'Conversion failed');
        }
        const disposition = response.headers.get('content-disposition');
        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : null;
        const reader = response.body.getReader();
        let received = 0;
        let chunks = [];
        let fakeProgressSteps = [0, 10, 17, 32, 49, 63, 72, 81, 87, 92, 95];
        let fakeStep = 0;
        let fakeTimer = null;
        if (!total) {
          setProgress(fakeProgressSteps[0]);
          fakeStep = 1;
          fakeTimer = setInterval(() => {
            setProgress((p) => {
              if (fakeStep < fakeProgressSteps.length) {
                const next = fakeProgressSteps[fakeStep++];
                return next;
              }
              clearInterval(fakeTimer);
              return p;
            });
          }, 400);
        }
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.length;
          if (total) {
            setProgress(Math.round((received / total) * 100));
          }
        }
        if (fakeTimer) {
          clearInterval(fakeTimer);
        }
        setProgress(100);
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        let filename = 'audio.mp3';
        if (disposition && disposition.includes('filename=')) {
          const match = disposition.match(/filename=\"?([^\"]+)\"?/i);
          if (match && match[1]) filename = match[1];
        }
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);
        setDownloadFilename(filename);
        setStatus("ready");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(String(err.message || err));
      });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            YouTube to <span className="text-emerald-400">MP3</span> Converter
          </h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Extract audio from a YouTube video and download it as MP3.
          </p>
        </header>

        <form
          onSubmit={handleConvert}
          className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl backdrop-blur"
        >
          <label className="block text-sm font-medium text-slate-300 mb-2">
            YouTube URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
              required
            />
            <button
              type="submit"
              disabled={status === "converting"}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 font-medium text-white transition-colors"
            >
              {status === "converting" ? "Converting…" : "Convert to MP3"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-3 text-sm text-rose-400">{errorMessage}</p>
          )}

          {status === "converting" && (
            <div className="mt-4">
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-emerald-500 h-4 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-400 mt-1 text-right">{progress}%</div>
            </div>
          )}

          {status === "ready" && downloadUrl && (
            <div className="mt-4 border-t border-slate-800 pt-4">
              <p className="text-sm text-slate-300 mb-2">Conversion complete.</p>
              <div className="flex items-center gap-3">
                <a
                  href={downloadUrl}
                  download={downloadFilename}
                  className="inline-flex items-center justify-center rounded-lg border border-slate-700 hover:border-slate-600 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100"
                >
                  Download MP3
                </a>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100"
                  onClick={() => {
                    setYoutubeUrl("");
                    setStatus("idle");
                    setErrorMessage("");
                    setDownloadUrl(null);
                    setDownloadFilename("audio.mp3");
                    setProgress(0);
                  }}
                >
                  Convert Another
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">Backend: http://localhost:8000</p>
      </div>
    </div>
  );
}

export default YtToMp3;


