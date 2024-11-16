from fastapi import FastAPI
from langchain_google_genai import ChatGoogleGenerativeAI
from langserve import add_routes
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(
    title="Nobushi Backend Server",
    version="1.0",
    description="Nobushi Backend Server",
)


@app.get('/')
def read_root():
    return {'Nobushi': 'Hello World!'}


add_routes(
    app,
    ChatGoogleGenerativeAI(model="gemini-1.5-pro"),
    path="/google",
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8080)
