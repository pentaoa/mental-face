import os
import numpy as np
from clip_model import extract_feature

DATASET_PATH = "./public/dataset/"
FEATURES_PATH = "./dataset_features.npy"

# 读取 100 张图片并计算特征
def preprocess_dataset():
    image_paths = [os.path.join(DATASET_PATH, f"{str(i+1).zfill(4)}/test.jpg") for i in range(100)]
    features = np.array([extract_feature(img) for img in image_paths])

    np.save(FEATURES_PATH, features)
    return image_paths, features

# 运行一次，计算特征
if __name__ == "__main__":
    preprocess_dataset()