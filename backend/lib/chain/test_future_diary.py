from fastapi.testclient import TestClient
from app.main import app
import json
import base64

from lib.chain.future_diary import future_diary_chain
from unittest.mock import patch, MagicMock

client = TestClient(app)


def test_nobushi_chain():
    # 秋葉原から秋葉原UDXのルートのGeoJSON
    geojson_str = json.dumps({
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [139.77442, 35.701895],
                        [139.774427, 35.701754],
                        [139.774317, 35.701761999999995],
                        [139.774285, 35.701726],
                        [139.77429899999998, 35.701637],
                        [139.774043, 35.701658],
                        [139.77333199999998, 35.701719],
                        [139.77327, 35.701724],
                        [139.773256, 35.701623],
                        [139.77316199999999, 35.701629],
                        [139.77308299999999, 35.701065],
                        [139.77298, 35.700334999999995]
                    ]
                }
            }
        ]
    })
    response = client.get("/geojson_png", params={"geojson": geojson_str})
    content = response.content
    base64_image = base64.b64encode(content).decode()
    # NOTE: Mockを外せば、実際にGoogle AIを呼び出せる
    with patch('langchain_google_genai.ChatGoogleGenerativeAI') as MockChatGoogleGenerativeAI:
        mock_model = MagicMock()
        mock_model.invoke.return_value = MagicMock(content="Mocked response content")
        MockChatGoogleGenerativeAI.return_value = mock_model

        chain = future_diary_chain()
        result = chain.invoke(
            {
                "profile": "39歳。女性。プロダクトマネージャー。独身。",
                "route": "秋葉原UDXから秋葉原駅",
                "image_data": base64_image
            }
        )
        assert result.content is not None
        assert len(result.content) > 0
