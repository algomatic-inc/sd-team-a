/* eslint-disable @typescript-eslint/no-explicit-any */
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableLike, RunnableSequence } from "@langchain/core/runnables";

export const loadExtractDepartureAndDestinationChain = async ({
  model,
}: {
  model: RunnableLike;
}): Promise<RunnableSequence<any, any>> => {
  const prompt = new PromptTemplate({
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
  const chain = RunnableSequence.from([prompt, model]);
  return chain;
};
