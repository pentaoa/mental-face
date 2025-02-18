import torch
import clip
from PIL import Image
from torchvision import transforms

# 加载 CLIP 模型
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# 计算图片特征
def extract_feature(image_path):
    image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        feature = model.encode_image(image)
    return feature.cpu().numpy()