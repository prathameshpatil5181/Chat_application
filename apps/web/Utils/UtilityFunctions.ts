// export const Serverurl = "https://13.232.195.84:8000";
// export const wsurl = "wss://13.232.195.84:8000";
export const wsurl = "wss://www.prathamesh-de.me";
// import { redirect } from "next/navigation";
export const Serverurl = "https://www.prathamesh-de.me";
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const setUserDetail = async () => {
  try {
    const res = await fetch(`${Serverurl}/auth/validate`, {
      credentials: "include",
    });

    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    throw Error;
  }
};
