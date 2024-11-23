from dotenv import load_dotenv
from fastapi import FastAPI, Request
import os
from io import BytesIO
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from langchain_google_genai import ChatGoogleGenerativeAI
from langserve import add_routes

from lib.penetrator import get_estate_info_by_coordinate
from lib.geojson_to_img import geojson_to_img
from lib.chain.nobushi import nobushi_chain


load_dotenv()

app = FastAPI(
    title="Nobushi Backend Server",
    version="1.0",
    description="Nobushi Backend Server",
    root_path=os.getenv("ROOT_PATH", ""),
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Nobushi': 'Hello World!'}


@app.get("/real_estate_info")
@app.post("/real_estate_info")
async def real_estate_info(request: Request):
    """
    物件情報を取得するAPI
    """
    if request.method == "POST":
        req_json = await request.json()
        lat = req_json.get("lat", "")
        lon = req_json.get("lon", "")
    else:
        lat = request.query_params.get("lat", "")
        lon = request.query_params.get("lon", "")

    if not lat or not lon:
        return {"error": "lat, lon are required"}

    # 物件情報取得
    result_json = get_estate_info_by_coordinate(lat, lon)
    return Response(content=result_json, media_type="application/json")


@app.post("/geojson_png")
@app.get("/geojson_png")
async def geojson_png(request: Request):
    """
    GeoJSONを受け取り、PNG画像を返す。
    LineStringにのみ対応していることに注意。
    """
    if request.method == "POST":
        geojson_str = await request.body()
    else:
        geojson_str = request.query_params.get("geojson", "").encode()

    img = geojson_to_img(geojson_str)

    # Imageオブジェクトをバイナリデータに変換
    img_byte_arr = BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_bytes = img_byte_arr.getvalue()

    # バイナリデータをレスポンスとして返す
    return Response(content=img_bytes, media_type="image/png")


add_routes(
    app,
    ChatGoogleGenerativeAI(model="gemini-1.5-pro"),
    path="/google",
)

add_routes(
    app,
    ChatGoogleGenerativeAI(model="gemini-exp-1121"),
    path="/gemini",
)

add_routes(
    app,
    nobushi_chain(),
    path="/nobushi",
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8080)
