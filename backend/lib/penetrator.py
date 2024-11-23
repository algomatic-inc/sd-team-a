import requests
import os

from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv("PENETRATOR_API_KEY")
API_URL = (
    "https://ty665ls8s5.execute-api.ap-northeast-1.amazonaws.com/prod/get-estate-info"
)

headers = {"Content-Type": "application/json", "Accept": "application/json"}


def get_estate_info_by_coordinate(lat, lon):
    data = {
        "api_key": API_KEY,
        "latitude": lat,
        "longitude": lon,
    }
    response = requests.post(API_URL, headers=headers, json=data)
    return response.json()
