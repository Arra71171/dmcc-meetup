declare module 'openai' {
  export interface ChatCompletionRequestMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
    name?: string;
  }

  export interface ChatCompletionResponseMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }

  export interface ChatCompletionRequest {
    model: string;
    messages: ChatCompletionRequestMessage[];
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: string | string[];
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: Record<string, number>;
    user?: string;
  }

  export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      index: number;
      message: ChatCompletionResponseMessage;
      finish_reason: string;
    }[];
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

  export interface ChatCompletionStreamResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
      index: number;
      delta: {
        role?: 'system' | 'user' | 'assistant';
        content?: string;
      };
      finish_reason: string | null;
    }[];
  }

  export class OpenAI {
    constructor(config: { apiKey: string });
    chat: {
      completions: {
        create(
          request: ChatCompletionRequest & { stream: true }
        ): Promise<AsyncIterable<ChatCompletionStreamResponse>>;
        create(
          request: ChatCompletionRequest & { stream?: false }
        ): Promise<ChatCompletionResponse>;
      };
    };
  }
}
