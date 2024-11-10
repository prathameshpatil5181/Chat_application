

export const printErrorString = (error: unknown): void => {

    if (error instanceof Error) {
        console.log(error.toString());
    }
    else {
        console.log(error);
    }
};