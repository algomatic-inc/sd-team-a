from langchain_google_genai import ChatGoogleGenerativeAI

from langchain_core.prompts import HumanMessagePromptTemplate, ChatPromptTemplate

import datetime

from dotenv import load_dotenv
load_dotenv()


def future_diary_chain():
    model = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.0)

    system_prompt = (
        "You are a helpful assistant."
    )

    jst = datetime.timezone(datetime.timedelta(hours=9), "JST")
    now = datetime.datetime.now(jst)
    date = now.strftime("%Y年%m月%d日")

    human_prompt = f"今日は {date} です。"+"""
あなたはProfile Textで与えられたプロフィールの人物になりきって、1年後の未来の日記を書いてください。
画像は、Route Textに基づいて描画された散歩ルートの人工衛星画像です。
あなたはこのルートで日々生活します。この画像で示されるルートを歩いた時の日常風景を簡潔に説明してください。
Markdown記法は絶対に使わないでください。

Profile Text:
{profile}

Route Text:
{route}
"""

    image_template = {"image_url": {"url": "data:image/jpeg;base64,{image_data}"}}

    human_message_template = HumanMessagePromptTemplate.from_template([human_prompt, image_template])

    prompt = ChatPromptTemplate.from_messages([("system", system_prompt), human_message_template])

    return prompt | model
