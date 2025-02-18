export async function POST(req: Request) {
    const { images, ratings } = await req.json();
    console.log("Received ratings:", { images, ratings });
  
    // 这里可以调用后端 API 进行 CLIP 特征优化
    return Response.json({ success: true });
  }