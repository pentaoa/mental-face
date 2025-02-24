import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { images, ratings } = await req.json();
  console.log("Received ratings:", { images, ratings });

  // 这里可以调用后端 API 进行 CLIP 特征优化
  try {
    const response = await fetch('http://localhost:5000/optimize-features', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ images, ratings }),
    });

    if (!response.ok) {
      throw new Error('Failed to optimize features');
    }

    const result = await response.json();
    console.log('Optimization result:', result);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error optimizing features:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}