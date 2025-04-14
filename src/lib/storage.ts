export const storage = {
    async get<T = any>(key: string): Promise<T | null> {
      return new Promise(resolve => {
        chrome.storage.local.get([key], result => resolve(result[key] ?? null));
      });
    },
  
    async set(key: string, value: any): Promise<void> {
      return new Promise(resolve => {
        chrome.storage.local.set({ [key]: value }, resolve);
      });
    },
  
    async remove(key: string): Promise<void> {
      return new Promise(resolve => {
        chrome.storage.local.remove([key], resolve);
      });
    }
  };