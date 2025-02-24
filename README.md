# 🎭 Mental-Face Search App (CLIP-based Image Matching)
本项目是一个基于 **CLIP（Contrastive Language–Image Pretraining）** 的图像匹配系统，允许用户通过 **评分** 逐步优化目标特征，最终找到最符合想象的图片。

## 🚀 功能
✅ 从 **100 张图片** 中 **随机选 4 张** 展示给用户  
✅ 用户为每张图片 **评分（1~10）**  
✅ 后端使用 **CLIP** 提取特征，并不断优化 **用户目标向量**  
✅ 经过多轮评分后，找到 **最匹配的图片** 并展示  

---

## 📂 项目结构
```
face-search-app/
│── frontend/                   # 前端 (Next.js + Tailwind CSS)
│   ├── app/
│   │   ├── components/         # 复用组件
│   │   │   ├── ImageGrid.tsx   # 图片网格
│   │   │   ├── RatingControls.tsx # 评分控件
│   │   ├── page.tsx            # 主页
│   │   ├── results.tsx         # 结果页面
│   │   ├── api/
│   │   │   ├── fetch-images.ts # 获取图片API（转发后端）
│   │   │   ├── submit-rating.ts # 提交评分API（转发后端）
│   │   │   ├── get-result.ts   # 获取最终图片API（转发后端）
│   ├── public/dataset0/        # 存放图片数据
│   ├── tailwind.config.js      # Tailwind 配置
│   ├── package.json            # 依赖管理
│   ├── next.config.js          # Next.js 配置
│
│── backend/                    # 后端 (FastAPI + CLIP)
│   ├── main.py                 # FastAPI 入口
│   ├── clip_model.py           # CLIP 模型加载 & 特征提取
│   ├── data_loader.py          # 预处理数据集 (计算特征)
│   ├── optimizer.py            # 评分优化 & 特征调整
│   ├── dataset0/               # 100 张图片
│   ├── requirements.txt        # 依赖文件
│
│── README.md                   # 说明文档
```

---

## 🛠️ 安装 & 运行
### **1️⃣ 安装前端**
```sh
npm install
npm run dev
```
前端默认运行在 `http://localhost:3000`。

---

### **2️⃣ 安装后端**
#### **📌 安装依赖**
```sh
cd backend
pip install -r requirements.txt
```
#### **📌 计算数据集的特征向量**
⚠️ **第一次运行时，需要预计算 100 张图片的 CLIP 特征**
```sh
python data_loader.py
```
#### **📌 运行后端**
```sh
uvicorn main:app --reload
```
后端默认运行在 `http://localhost:8000`。

---

## 🔗 API 说明
### **1️⃣ 获取 4 张图片**
```
GET /fetch-images
```
返回：
```json
{
  "images": ["/dataset0/image1.jpg", "/dataset0/image23.jpg", "/dataset0/image50.jpg", "/dataset0/image99.jpg"]
}
```

### **2️⃣ 提交评分**
```
POST /submit-rating
```
请求：
```json
{
  "images": ["/dataset0/image1.jpg", "/dataset0/image23.jpg", "/dataset0/image50.jpg", "/dataset0/image99.jpg"],
  "ratings": [8, 3, 6, 10]
}
```
返回：
```json
{ "success": true }
```

### **3️⃣ 获取最终推荐的图片**
```
GET /get-result
```
返回：
```json
{
  "best_image": "/dataset0/image45.jpg"
}
```

---

## 📌 依赖 (`requirements.txt`)
````md
torch
torchvision
transformers
fastapi
uvicorn
numpy
pillow
clip-by-openai