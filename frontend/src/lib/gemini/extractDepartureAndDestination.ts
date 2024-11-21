import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { PromptTemplate } from "@langchain/core/prompts";
import { AIMessage } from "@langchain/core/messages";

export const extractDepartureAndDestination = async (input: string) => {
  const remoteRunnable = new RemoteRunnable({
    url: "https://api.nobushi.yuiseki.net/gemini/",
  });

  const promptTemplate = new PromptTemplate({
    inputVariables: ["input"],
    template: `
You are a named entity recognition model.
Extract the location name of the departure and destination from the following input text.

You must follow the following format:
- The departure location name must be extracted first.
- The destination location name must be extracted second.
- Extract and output only the location name.

input:
{input}
`,
  });

  const prompt = await promptTemplate.format({ input });
  try {
    const result = (await remoteRunnable.invoke(prompt)) as AIMessage;
    return result.content as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
