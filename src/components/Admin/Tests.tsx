import { Tests } from "@/types";
import { File } from "lucide-react";
import Mcq from "./Mcq";
import Written from "./Written";
import Typing from "./Typing";

interface Props {
  testsState: PromiseSettledResult<Tests>;
}

export default function Tests({ testsState }: Props) {
  const CONDITION =
    testsState.status === "rejected" ||
    (testsState.value.mcq.length <= 0 && testsState.value.written.length <= 0);

  return (
    <div className="comic-box-black col-span-2 rounded-lg p-1 border-2 border-black rounde">
      <div className="flex items-center justify-between mx-2">
        <h2 className="capitalize font-semibold text-lg">Tests</h2>
        <span>
          {CONDITION
            ? `0`
            : `${testsState.value.mcq.length + testsState.value.written.length}`}
        </span>
      </div>
      <hr />
      {CONDITION ? (
        <div className="flex flex-col items-center p-5 h-full justify-center">
          <File className="w-8 h-8" />
          <p className="text-center text-lg">Not available</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          <Written tests={testsState.value.written} />
          <Mcq tests={testsState.value.mcq} />
          <Typing tests={testsState.value.typing} />
        </div>
      )}
    </div>
  );
}
