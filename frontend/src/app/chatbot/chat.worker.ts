/// <reference lib="webworker" />

import { pipeline } from '@huggingface/transformers';

class ChatPipeline {
  static instance: any = null;
  static model = 'Xenova/Qwen1.5-0.5B-Chat';

  static async getInstance(progress_callback?: any) {
    if (this.instance === null) {
      try {
        console.log('ChatWorker: Attempting WebGPU initialization (Quantized)...');
        this.instance = await pipeline('text-generation', this.model, { 
          progress_callback,
          device: 'webgpu' as any,
          quantized: true,
        } as any);
      } catch (gpuErr) {
        console.warn('ChatWorker: WebGPU failed, falling back to WASM (Quantized):', gpuErr);
        this.instance = await pipeline('text-generation', this.model, { 
          progress_callback,
          device: 'wasm' as any,
          quantized: true,
        } as any);
      }
    }
    return this.instance;
  }
}

addEventListener('message', async ({ data }) => {
  const { type, text, context } = data;

  if (type === 'init') {
    try {
      await ChatPipeline.getInstance((x: any) => {
        postMessage({ type: 'progress', status: x.status, progress: x.progress, file: x.file });
      });
      postMessage({ type: 'ready' });
    } catch (err: any) {
      postMessage({ type: 'error', error: err.message });
    }
    return;
  }

  if (type === 'generate') {
    try {
      const generator = await ChatPipeline.getInstance();
      
      // Inject portfolio context as a system message
      const messages = [
        { role: 'system', content: `You are a helpful AI assistant representing Carter Moyer. Knowledge: ${context}` },
        { role: 'user', content: text }
      ];

      const output = await generator(messages, {
        max_new_tokens: 128,
        temperature: 0.7,
        do_sample: true,
        top_k: 50,
      });

      const generated_text = output[0].generated_text.at(-1).content;
      postMessage({ type: 'response', text: generated_text });
    } catch (err: any) {
      postMessage({ type: 'error', error: err.message });
    }
  }
});
