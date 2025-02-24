// filepath: /c:/Users/Grada/Documents/GitHub/mental-face/app/api/fetch-images/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 假设 100 张图片存储在 `public/dataset/`
  const dataset = Array.from({ length: 100 }, (_, i) => {
    const index = (i + 1).toString().padStart(4, '0');
    return `/dataset/${index}/test.jpg`;
  });

  // 随机选 4 张
  const selected = dataset.sort(() => Math.random() - 0.5).slice(0, 4);

  return NextResponse.json({ images: selected });
}