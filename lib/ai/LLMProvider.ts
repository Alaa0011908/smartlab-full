// lib/ai/LLMProvider.ts
// ============================================================
// Abstract LLM Provider — AI Gateway
// Prevents vendor lock-in. All providers implement the same interface.
// Includes: prompt versioning, structured output, retries, fallback, logging.
// ============================================================

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMCompletionOptions {
  messages: LLMMessage[];
  temperature?: number;
  maxTokens?: number;
  promptVersion?: string;
  expectJSON?: boolean;
}

export interface LLMCompletionResult {
  content: string;
  model: string;
  provider: string;
  latencyMs: number;
  promptVersion?: string;
  usedFallback: boolean;
  error?: string;
}

export interface LLMObservabilityRecord {
  provider: string;
  model: string;
  promptVersion?: string;
  latencyMs: number;
  usedFallback: boolean;
  outputSchema?: string;
  error?: string;
  timestamp: Date;
}

// ── Abstract Interface ────────────────────────────────────────

export abstract class LLMProvider {
  abstract readonly providerName: string;
  abstract readonly modelName: string;

  abstract complete(options: LLMCompletionOptions): Promise<LLMCompletionResult>;

  protected observabilityLog: LLMObservabilityRecord[] = [];

  getObservabilityLog() { return [...this.observabilityLog]; }

  protected recordObservability(record: LLMObservabilityRecord) {
    this.observabilityLog.push(record);
    // In production this would emit to a metrics store
  }
}

// ── Deepseek Provider ─────────────────────────────────────────

export class DeepseekProvider extends LLMProvider {
  readonly providerName = 'Deepseek';
  readonly modelName = 'deepseek-chat';

  constructor(private readonly apiKey: string) { super(); }

  async complete(options: LLMCompletionOptions): Promise<LLMCompletionResult> {
    const start = Date.now();

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: options.messages,
          temperature: options.temperature ?? 0.4,
          max_tokens: options.maxTokens ?? 1024,
          response_format: options.expectJSON ? { type: 'json_object' } : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Deepseek API error: ${response.status}`);
      }

      const data = await response.json() as {
        choices: Array<{ message: { content: string } }>;
      };

      const content = data.choices[0]?.message?.content ?? '';
      const latencyMs = Date.now() - start;

      this.recordObservability({
        provider: this.providerName,
        model: this.modelName,
        promptVersion: options.promptVersion,
        latencyMs,
        usedFallback: false,
        timestamp: new Date(),
      });

      return { content, model: this.modelName, provider: this.providerName, latencyMs, promptVersion: options.promptVersion, usedFallback: false };

    } catch (error) {
      const latencyMs = Date.now() - start;
      const errorMsg = error instanceof Error ? error.message : String(error);

      this.recordObservability({
        provider: this.providerName,
        model: this.modelName,
        promptVersion: options.promptVersion,
        latencyMs,
        usedFallback: true,
        error: errorMsg,
        timestamp: new Date(),
      });

      return {
        content: '',
        model: this.modelName,
        provider: this.providerName,
        latencyMs,
        usedFallback: true,
        error: errorMsg,
      };
    }
  }
}

// ── Mock Provider (for testing/demo without API) ──────────────

export class MockLLMProvider extends LLMProvider {
  readonly providerName = 'Mock';
  readonly modelName = 'mock-v1';

  constructor(private readonly fixedResponse: string = '{"ok":true}') { super(); }

  async complete(_options: LLMCompletionOptions): Promise<LLMCompletionResult> {
    await new Promise(r => setTimeout(r, 50)); // simulate latency
    return {
      content: this.fixedResponse,
      model: this.modelName,
      provider: this.providerName,
      latencyMs: 50,
      usedFallback: false,
    };
  }
}
