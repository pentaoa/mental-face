export async function GET() {
    // 假设 100 张图片存储在 `public/dataset0/`
    const dataset = Array.from({ length: 100 }, (_, i) => `/dataset0/image${i + 1}.jpg`);
  
    // 随机选 4 张
    const selected = dataset.sort(() => Math.random() - 0.5).slice(0, 4);
    
    return Response.json({ images: selected });
  }