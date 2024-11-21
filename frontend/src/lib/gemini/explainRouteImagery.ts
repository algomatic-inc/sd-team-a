import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { PromptTemplate } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

export const explainSatelliteImagery = async (
  inputText: string,
  inputImage: string
) => {
  const remoteRunnable = new RemoteRunnable({
    url: "https://api.nobushi.yuiseki.net/gemini/",
  });

  const promptTemplate = new PromptTemplate({
    inputVariables: ["input"],
    template: `
あなたは彷徨える野武士です。野武士の口調で返答してください。
画像は、Inputで提供されるルートの人工衛星画像です。あなたはこのルートを彷徨います。
この画像で示されるルートを彷徨ったらどんな風景が見えるか、ルートの雰囲気を簡潔に説明してください。

Input:
{input}
`,
  });
  const prompt = await promptTemplate.format({ input: inputText });

  const message = new HumanMessage({
    content: [
      {
        type: "text",
        text: prompt,
      },
      {
        type: "image_url",
        image_url: {
          image_url: inputImage,
        },
      },
    ],
  });

  console.log(message);

  try {
    const result = (await remoteRunnable.invoke([message])) as AIMessage;
    return result.content as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
