export function generateUUID(): string {
  return crypto.randomUUID();
}

export async function getOrCreateUUID(): Promise<string> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['uuid'], (result) => {
      if (result.uuid) {
        resolve(result.uuid);
      } else {
        const uuid = generateUUID();
        chrome.storage.local.set({ uuid }, () => resolve(uuid));
      }
    });
  });
}
