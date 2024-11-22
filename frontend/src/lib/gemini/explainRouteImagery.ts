import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { AIMessage } from "@langchain/core/messages";

export const explainSatelliteImagery = async (
  inputText: string,
  inputImageBase64: string
) => {
  const remoteRunnable = new RemoteRunnable({
    url: "https://api.nobushi.yuiseki.net/nobushi/",
  });

  try {
    const result = (await remoteRunnable.invoke({
      input: inputText,
      image_data: inputImageBase64,
    })) as AIMessage;
    return result.content as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
