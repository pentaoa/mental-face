"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Results() {
  const [bestImage, setBestImage] = useState<string | null>(null);
  const router = useRouter();

  // 获取最终匹配的图片
  useEffect(() => {
    fetch("/api/get-result")
      .then((res) => res.json())
      .then((data) => setBestImage(data.best_image))
      .catch((err) => console.error("Error fetching result:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">你最匹配的图片是：</h1>
      {bestImage ? (
        <img src={bestImage} alt="Best match" className="w-64 h-64 object-cover rounded-md shadow-lg" />
      ) : (
        <p className="text-gray-500">计算中...</p>
      )}
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        返回主页
      </button>
    </div>
  );
}