from fastapi.testclient import TestClient
from app.main import app
import json

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Nobushi": "Hello World!"}


def test_real_estate_info_get():
    response = client.get("/real_estate_info", params={"lat": 35.6983223, "lon": 139.7730186})
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    res_json = response.json()
    assert res_json["chibanAddress"] == "東京都千代田区神田花岡町１‐１"


def test_real_estate_info_post():
    response = client.post("/real_estate_info", json={"lat": 35.6983223, "lon": 139.7730186})
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    res_json = response.json()
    assert res_json["chibanAddress"] == "東京都千代田区神田花岡町１‐１"


def test_geojson_png_post():
    geojson_str = json.dumps({
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [102.0, 0.0],
                        [103.0, 1.0],
                        [104.0, 0.0],
                        [105.0, 1.0]
                    ]
                },
                "properties": {}
            }
        ]
    })
    response = client.post("/geojson_png", content=geojson_str)
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"
    assert response.content is not None


def test_geojson_png_get():
    geojson_str = json.dumps({
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [102.0, 0.0],
                        [103.0, 1.0],
                        [104.0, 0.0],
                        [105.0, 1.0]
                    ]
                },
                "properties": {}
            }
        ]
    })
    response = client.get("/geojson_png", params={"geojson": geojson_str})
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"
    assert response.content is not None
