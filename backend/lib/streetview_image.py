import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
API_URL = "https://maps.googleapis.com/maps/api/streetview"


def get_streetview_image_by_coordinate(lat: float, lon: float, size: str = "640x400", heading: int = 90, pitch: int = 0, fov: int = 90) -> bytes:
    """
    緯度経度を指定してStreet Viewの画像を取得する。

    Args:
        lat: 緯度
        lon: 経度
        size: 画像サイズ (例: "640x400")
        heading: 水平方向のカメラ角度 (0-360)
        pitch: 垂直方向のカメラ角度 (-90-90)
        fov: 視野 (1-120)

    Returns:
        画像データ (バイト列)。
    """
    params = {
        "size": size,
        "location": f"{lat},{lon}",
        "heading": heading,
        "pitch": pitch,
        "fov": fov,
        "key": API_KEY,
    }
    response = requests.get(API_URL, params=params)
    return response.content
