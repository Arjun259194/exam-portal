export function tryCatchWrapper(fn: () => void , fnEr:(arg1: unknown) => void) {
  try {
    fn();
  } catch (error) {
    console.error("server error: ", error);
    throw new Error("Someting went wring! try again");
  }
}
