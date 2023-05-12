import AsyncStorage from "@react-native-async-storage/async-storage";

const lsTokenKey = process.env.APP_TOKEN_KEY || "token";

export const lsGetItem = async (key: string) => {
  const item = AsyncStorage.getItem(key);
  if (item) return JSON.parse(await item);
  return null;
};

export const lsSetItem = (key: string, value: any) => {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

export const lsRemoveItem = (key: string) => {
  AsyncStorage.removeItem(key);
};

export const lsGetToken = () => {
  return lsGetItem(lsTokenKey);
};

export const lsSetToken = (token: any) => {
  lsSetItem(lsTokenKey, token);
};

export const lsRemoveToken = () => {
  lsRemoveItem(lsTokenKey);
};
