import numpy as np

FEATURES_PATH = "./dataset_features.npy"

# 计算最接近的图片
def find_best_match(user_vector):
    features = np.load(FEATURES_PATH)
    similarities = np.dot(features, user_vector.T)  # 计算相似度
    best_match_idx = np.argmax(similarities)
    return best_match_idx