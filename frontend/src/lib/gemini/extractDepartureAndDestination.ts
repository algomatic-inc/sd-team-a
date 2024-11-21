import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { loadExtractDepartureAndDestinationChain } from "../chain/loadExtractDepartureAndDestination";

export const extractDepartureAndDestination = async (inputText: string) => {
  const remoteRunnable = new RemoteRunnable({
    url: "https://api.nobushi.yuiseki.net/gemini/",
  });

  const extractDepartureAndDestinationChain =
    await loadExtractDepartureAndDestinationChain({
      model: remoteRunnable,
    });

  const result = await extractDepartureAndDestinationChain.invoke({
    input: inputText,
  });

  console.log(result);

  return result;
};
