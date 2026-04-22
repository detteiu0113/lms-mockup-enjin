// components/player/VideoPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { formatDurationClock, formatDateTimeSec } from "@/lib/format";

interface Props {
  src: string;
  title: string;
  initialSec?: number;
}

export default function VideoPlayer({ src, title, initialSec = 0 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watchedSec, setWatchedSec] = useState(initialSec);
  const [totalSec, setTotalSec] = useState(0);
  const [currentSec, setCurrentSec] = useState(initialSec);
  const [lastLog, setLastLog] = useState(initialSec);
  const [sessionStart] = useState(new Date());

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
    if (cur > lastLog) {
      setWatchedSec((prev) => prev + (cur - lastLog));
      setLastLog(cur);
    }
  };

  return (
    <div className="overflow-hidden rounded-md border border-border-default">
      <video
        ref={videoRef}
        src={src}
        controls
        onTimeUpdate={handleTimeUpdate}
        className="w-full aspect-video bg-black"
        playsInline
      />
      <div className="bg-surface px-5 py-3 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-xs border-t border-border-default">
        <div>
          <div className="text-text-muted mb-0.5">動画</div>
          <div className="text-text font-medium truncate">{title}</div>
        </div>
        <div>
          <div className="text-text-muted mb-0.5">現在位置</div>
          <div className="text-text tabular-nums">{formatDurationClock(currentSec)} / {formatDurationClock(totalSec)}</div>
        </div>
        <div>
          <div className="text-text-muted mb-0.5">本セッション視聴</div>
          <div className="text-text tabular-nums font-medium">{formatDurationClock(watchedSec)}</div>
        </div>
        <div>
          <div className="text-text-muted mb-0.5">セッション開始</div>
          <div className="text-text tabular-nums">{formatDateTimeSec(sessionStart.toISOString())}</div>
        </div>
      </div>
    </div>
  );
}
