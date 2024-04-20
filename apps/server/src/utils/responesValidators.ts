export const isJson = (msg: string) => {
  try {
    JSON.parse(msg);
    return true;
  } catch {
    console.log('Error: Received non json msg');
    return false;
  }
};
