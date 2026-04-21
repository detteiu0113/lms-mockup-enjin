// app/student/courses/[courseId]/videos/[videoId]/VideoPlayerClient.tsx
"use client";

import VideoPlayer from "@/components/player/VideoPlayer";

interface Props {
  src: string;
  title: string;
  initialSec: number;
}

export default function VideoPlayerClient(props: Props) {
  return <VideoPlayer {...props} />;
}
