import { storage } from './storage';

const UUID_KEY = 'user_uuid';

export const getUUID = async (): Promise<string> => {
  let uuid = await storage.get<string>(UUID_KEY);
  if (!uuid) {
    uuid = crypto.randomUUID();
    await storage.set(UUID_KEY, uuid);
  }
  return uuid;
};