from fastapi import FastAPI, HTTPException
import numpy as np
from optimizer import find_best_match

app = FastAPI()

user_vector = np.zeros((1, 512))  # 用户的目标特征

@app.get("/fetch-images")
def fetch_images():
    images = [f"/dataset0/image{i+1}.jpg" for i in np.random.choice(100, 4, replace=False)]
    return {"images": images}

@app.post("/submit-rating")
def submit_rating(data: dict):
    global user_vector
    ratings = np.array(data["ratings"]).reshape(-1, 1)
    user_vector += ratings @ np.load("./dataset_features.npy")[:4]  # 更新特征
    return {"success": True}

@app.get("/get-result")
def get_result():
    best_idx = find_best_match(user_vector)
    return {"best_image": f"/dataset0/image{best_idx+1}.jpg"}