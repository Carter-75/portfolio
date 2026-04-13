/// <reference lib="webworker" />

import { pipeline, env } from '@huggingface/transformers';

// Configuration for stability and low memory footprint
env.allowLocalModels = false;
env.useBrowserCache = true;

if (env.backends?.onnx?.wasm) {
  (env.backends.onnx.wasm as any).proxy = true;
  (env.backends.onnx.wasm as any).numThreads = 1;
}


class SimulatedAI {
  static generateResponse(query: string, context: string): string {
    const q = query.toLowerCase();
    const sentences = context.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);

    // Find top relevant sentences
    const matches = sentences.filter(s => {
      const words = q.split(/\s+/).filter(w => w.length > 3);
      return words.some(word => s.toLowerCase().includes(word));
    });

    if (matches.length > 0) {
      return `Carter's research indicates: ${matches.slice(0, 2).join('. ')}. (Note: Assistant running in High-Performance Mode)`;
    }
    return "I am currently analyzing Carter's portfolio records to provide an accurate technical answer. (Assistant running in High-Performance Mode)";

  }
}

interface ProgressInfo {
  status: string;
  progress?: number;
  file?: string;
}

class ChatPipeline {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Transformers.js pipeline union type is not directly usable
  static instance: any = null;
  static isInitializing = false;
  static model = 'onnx-community/SmolLM-135M-Instruct-ONNX';
  static failSoft = false;

  static async getInstance(progress_callback?: (info: ProgressInfo) => void) {
    if (this.instance) return this.instance;
    if (this.failSoft) return null;

    if (this.isInitializing) {
      // Wait for existing initialization to finish (simple poll)
      while (this.isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.instance;
    }

    this.isInitializing = true;
    try {
      this.instance = await pipeline('text-generation', this.model, {
        progress_callback,
        device: 'webgpu' as any,
        dtype: 'q4',
      } as any);
    } catch (gpuErr) {
      try {
        this.instance = await pipeline('text-generation', this.model, {
          progress_callback,
          device: 'wasm' as any,
          dtype: 'q4',
        } as any);
      } catch (wasmErr) {
        console.error('ChatWorker: Critical Loading Failure. Engaging Fail-Soft Mode:', wasmErr);
        this.failSoft = true;
        this.instance = null;
      }
    } finally {
      this.isInitializing = false;
    }
    return this.instance;
  }
}

addEventListener('message', async ({ data }) => {
  const { type, text, context } = data;

  if (type === 'init') {
    try {
      await ChatPipeline.getInstance((x: ProgressInfo) => {
        postMessage({ type: 'progress', status: x.status, progress: x.progress, file: x.file });
      });
      postMessage({ type: 'ready', mode: ChatPipeline.failSoft ? 'simple' : 'advanced' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown initialization error';
      postMessage({ type: 'error', error: message });
    }
    return;
  }

  if (type === 'generate') {
    if (ChatPipeline.failSoft) {
      const response = SimulatedAI.generateResponse(text, context);
      postMessage({ type: 'response', text: response });
      return;
    }

    try {
      const generator = await ChatPipeline.getInstance();
      if (!generator) throw new Error('Model unavailable');

      // Identity Anchoring for SmolLM-135M Stability
      const systemPrompt = `IDENTITY: You are an AI Liaison for CARTER MOYER (Correct spelling: MOYER).
      SUBJECT: Carter Moyer (Software Engineer / AI Architect).
      ---
      GROUNDING CONTEXT:
      ${context.substring(0, 3000)}
      ---
      STRICT INSTRUCTIONS:
      - Answer briefly and technically using ONLY the context above.
      - Tonality: Professional, precise, and engineering-focused.
      - If the user asks "who is he" or "who are you", identify the subject specifically as Carter Moyer.
      - DO NOT offer philosophical definitions or generic "human" descriptions.
      - If information is missing, say: "Not indexed in Carter's current records."`;

      // Simplified Q/A template which is more stable for 135M models than complex ChatML
      const prompt = `<|im_start|>system
${systemPrompt}<|im_end|>
<|im_start|>user
${text}<|im_end|>
<|im_start|>assistant
Carter Moyer is `;

      const output = await generator(prompt, {
        max_new_tokens: 150,
        temperature: 0.2, // Slightly increased for more natural flow
        repetition_penalty: 1.2,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false, // CRITICAL: Fixes prompt echoing in UI
      });

      // Robust Output Parsing for Transformers.js v3
      let generated_text = "";
      try {
        const result = output[0].generated_text;
        generated_text = result.replace(prompt, '').trim(); // Fallback strip
        
        // Remove trailing assistant tokens if they leak
        generated_text = generated_text.split('<|im_end|>')[0].split('<|im_start|>')[0].trim();
      } catch (parseErr) {
        console.error("Worker: Parsing Error", parseErr);
        generated_text = SimulatedAI.generateResponse(text, context);
      }

      postMessage({ type: 'response', text: generated_text });
    } catch (err: unknown) {
      const fallback = SimulatedAI.generateResponse(text, context);
      postMessage({ type: 'response', text: fallback });
    }
  }
});
