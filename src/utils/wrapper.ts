export function tryCatchWrapper(fn: () => void) {
  try {
    fn();
  } catch (error) {
    console.error("server error: ", error);
    throw new Error("Someting went wring! try again");
  }
}
