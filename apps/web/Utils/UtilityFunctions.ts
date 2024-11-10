// export const Serverurl = "https://13.232.195.84:8000";
export const Serverurl = "http://localhost:8000";
export const wsurl = "ws://localhost:8000";

// export const wsurl = "wss://13.232.195.84:8000"; // import { redirect } from "next/navigation";
// export const wsurl = "wss://chat.prathamesh-de.me";
// export const Serverurl = "https://chat.prathamesh-de.me";
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
  // const authToken =

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

export const setlocalStorage = (key: string, val: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, val);
  }
};

export const getlocalStorage = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

// const getCookie: boolean = (type:string) => {

//   switch (type) {
//     case "usercred":

//       break;

//     default:
//       return false;
//   }

//   return true;
// }
