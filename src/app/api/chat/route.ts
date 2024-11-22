import { ChatOpenAI } from "@langchain/openai";
import { LangChainStream, OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "ai/prompts";
import { ChatPromptTemplate } from "langchain/prompts";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const { stream, handlers } = LangChainStream();

    const model = new ChatOpenAI({
      modelName: "gpt-4o-mini",
      streaming: true,
      callbacks: [handlers],
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're a virtual assistant for a portifolio website, your name is virtual Santos " +
          "Answer the user based on the context, whenever it makes sense, provide links to the pages containing more information" +
          "Format your reply in markdown format\n\n" +
          "Context:\n{context}",
      ],
      ["user", "{input}"],
    ]);

    const chain = prompt.pipe(model);

    const currentMessage = messages[messages.length - 1];

    chain.invoke({
      input: currentMessage,
    });

    // const systemMessage: ChatCompletionMessageParam = {
    //   role: "system",
    //   content: "You are a chill assistant all your replies should be chill",
    // };

    // const openai = new OpenAI();

    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   stream: true,
    //   messages: [systemMessage, ...messages],
    // });

    // const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
