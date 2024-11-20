from fastapi.testclient import TestClient
from app.main import app
import json

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Nobushi": "Hello World!"}


def test_geojson_png():
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
