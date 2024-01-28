import React, { useState, useEffect } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
function ScreenRecording() {
  const [autoDownload, setAutoDownload] = useState(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);
  useEffect(() => {
    if (autoDownload && recordedBlobUrl) {
      const link = document.createElement('a');
      link.href = recordedBlobUrl;
      link.download = 'recorded-video.webm';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setAutoDownload(false);
    }
  }, [autoDownload, recordedBlobUrl]);
  return (
    <ReactMediaRecorder
      screen
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div style={{ marginLeft: '605px', display: 'flex' }}>
          <div>
            <p>{status}</p>
            {status === 'stopped' && recordedBlobUrl && (
              <div>
                <p>Recorded Video:</p>
                <video controls src={recordedBlobUrl} width="400" />
              </div>
            )}

            <button
              onClick={startRecording}
              disabled={status === 'recording'}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={() => {
                if (status !== 'recording') {
                  event.target.style.backgroundColor = '#45a049';
                }
              }}
              onMouseOut={() => {
                if (status !== 'recording') {
                  event.target.style.backgroundColor = '#4CAF50';
                }
              }}
            >
              Start
            </button>
          </div>

          <div style={{ marginLeft: '20px', marginTop: '20px' }}>
            <button
              onClick={() => {
                stopRecording();
                setAutoDownload(true);
              }}
              disabled={status === 'stopped'}
              style={{
                backgroundColor: '#FF0000',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(event) => {
                if (status !== 'stopped') {
                  event.target.style.backgroundColor = '#CC0000';
                }
              }}
              onMouseOut={(event) => {
                if (status !== 'stopped') {
                  event.target.style.backgroundColor = '#FF0000';
                }
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
      onStop={(blobUrl) => setRecordedBlobUrl(blobUrl)}
    />

  )
}

export default ScreenRecording


