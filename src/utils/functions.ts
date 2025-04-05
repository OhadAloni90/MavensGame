export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const randomDelay = () => Math.floor(Math.random() * 3000) + 2000;
