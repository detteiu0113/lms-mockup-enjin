// components/player/VideoPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { formatDurationClock } from "@/lib/format";

interface Props {
  src: string;
  title: string;
  initialSec?: number;
  onProgress?: (watchedSec: number) => void;
  onComplete?: () => void;
}

/**
 * モックアップ用動画プレイヤー
 * - レジューム再生（initialSec）
 * - 秒単位で視聴ログを記録（モックなので画面表示のみ）
 * - 早送り・倍速は実プロダクトでは制限検討と書かれているのでデモでは通常通りに動作
 */
export default function VideoPlayer({ src, title, initialSec = 0, onProgress, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watchedSec, setWatchedSec] = useState(initialSec);
  const [totalSec, setTotalSec] = useState(0);
  const [currentSec, setCurrentSec] = useState(initialSec);
  const [sessionStart] = useState(new Date());
  const [lastLog, setLastLog] = useState(initialSec);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => {
      setTotalSec(Math.floor(video.duration));
      if (initialSec > 0 && initialSec < video.duration) {
        video.currentTime = initialSec;
      }
    };
    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, [initialSec]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const cur = Math.floor(video.currentTime);
    setCurrentSec(cur);
    // 進んだ秒数を累積（巻き戻しは加算しない）
    if (cur > lastLog) {
      setWatchedSec((prev) => prev + (cur - lastLog));
      setLastLog(cur);
      onProgress?.(watchedSec + (cur - lastLog));
    }
  };

  const handleEnded = () => {
    onComplete?.();
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="w-full aspect-video bg-black"
        playsInline
      />
      <div className="bg-gray-900 text-white px-4 py-3 text-xs flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-gray-700">
        <div>
          <span className="opacity-60 mr-2">動画:</span>
          <span className="font-medium">{title}</span>
        </div>
        <div className="tabular-nums">
          <span className="opacity-60 mr-2">現在位置:</span>
          {formatDurationClock(currentSec)} / {formatDurationClock(totalSec)}
        </div>
        <div className="tabular-nums">
          <span className="opacity-60 mr-2">本セッション視聴累計:</span>
          <span className="text-emerald-400 font-medium">{formatDurationClock(watchedSec)}</span>
        </div>
        <div className="opacity-60">
          セッション開始: {sessionStart.toLocaleTimeString("ja-JP")}
        </div>
      </div>
    </div>
  );
}
