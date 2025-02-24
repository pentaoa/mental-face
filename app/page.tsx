"use client";
import { useState, useEffect } from "react";
import ImageGrid from "../components/ImageGrid";

export default function Home() {
  const [images, setImages] = useState<string[]>([]); // 存储 4 张图片
  const [ratings, setRatings] = useState<number[]>([0, 0, 0, 0]); // 存储评分
  const [loading, setLoading] = useState<boolean>(false); // 加载状态

  // 获取 4 张随机图片
  useEffect(() => {
    fetch("/api/fetch-images")
      .then((res) => res.json())
      .then((data) => setImages(data.images))
      .catch((err) => console.error(err));
  }, []);

  // 提交评分
  const submitRatings = async () => {
    setLoading(true); // 开始加载
    await fetch("/api/submit-rating", {
      method: "POST",
      body: JSON.stringify({ images, ratings }),
      headers: { "Content-Type": "application/json" },
    });

    // 等待 2 秒
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 获取新一轮的图片
    fetch("/api/fetch-images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);
        setRatings([0, 0, 0, 0]); // 重置评分
        setLoading(false); // 结束加载
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold my-10 text-center">选择你想象中的图片</h1>
      {loading ? (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      ) : (
        <>
          <ImageGrid images={images} ratings={ratings} setRatings={setRatings} />
          <button
            onClick={submitRatings}
            className="mt-4 bg-cyan-800 text-white px-6 py-2 rounded-lg hover:drop-shadow-xl"
          >
            提交评分
          </button>
        </>
      )}
    </div>
  );
}