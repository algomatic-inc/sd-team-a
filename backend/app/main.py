from dotenv import load_dotenv
from fastapi import FastAPI, Request
from io import BytesIO
from fastapi.responses import Response
from langchain_google_genai import ChatGoogleGenerativeAI
from langserve import add_routes

from lib.geojson_to_img import geojson_to_img


load_dotenv()

app = FastAPI(
    title="Nobushi Backend Server",
    version="1.0",
    description="Nobushi Backend Server",
)


@app.get('/')
def read_root():
    return {'Nobushi': 'Hello World!'}


@app.post("/geojson_png")
async def geojson_png(request: Request):
    """
    GeoJSONを受け取り、PNG画像を返す。
    LineStringにのみ対応していることに注意。
    """
    geojson_str = await request.body()
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

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8080)
