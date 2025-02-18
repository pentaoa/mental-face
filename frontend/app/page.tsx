"use client";
import { useState, useEffect } from "react";
import ImageGrid from "@/components/ImageGrid";
import { useRouter } from "next/navigation";

const router = useRouter();

const submitRatings = async () => {
  await fetch("/api/submit-rating", {
    method: "POST",
    body: JSON.stringify({ images, ratings }),
    headers: { "Content-Type": "application/json" },
  });

  // 跳转到结果页面
  router.push("/results");
};
export default function Home() {
  const [images, setImages] = useState<string[]>([]); // 存储 4 张图片
  const [ratings, setRatings] = useState<number[]>([0, 0, 0, 0]); // 存储评分

  // 获取 4 张随机图片
  useEffect(() => {
    fetch("/api/fetch-images")
      .then((res) => res.json())
      .then((data) => setImages(data.images))
      .catch((err) => console.error(err));
  }, []);

  // 提交评分
  const submitRatings = async () => {
    await fetch("/api/submit-rating", {
      method: "POST",
      body: JSON.stringify({ images, ratings }),
      headers: { "Content-Type": "application/json" },
    });

    // 获取新一轮的图片
    fetch("/api/fetch-images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setRatings([0, 0, 0, 0]); // 重置评分
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">选择你最喜欢的图片</h1>
      <ImageGrid images={images} ratings={ratings} setRatings={setRatings} />
      <button
        onClick={submitRatings}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        提交评分
      </button>
    </div>
  );
}