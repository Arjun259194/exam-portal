import { TestMcq, TestWritten, Tests } from "@/types";
import { File, Trash } from "lucide-react";

interface Props {
  testsState: PromiseSettledResult<Tests>
}
export default function Tests({ testsState }: Props) {
  return <div className="comic-box-black col-span-2 rounded-lg p-1 border-2 border-black rounde">
    <h2 className="capitalize font-semibold text-lg">Test</h2>
    <hr />
    {testsState.status === "rejected" ||
      (testsState.value.mcq.length <= 0 &&
        testsState.value.written.length <= 0) ? (
      <div className="flex flex-col items-center p-5 h-full justify-center">
        <File className="w-8 h-8" />
        <p className="text-center text-lg">Not available</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-5">
        <div className="h-full">
          {testsState.value.written.length <= 0 ? (
            <div className="flex items-center justify-between h-full">
              <span className="mx-auto font-semibold text-lg p-10">
                No written test found
              </span>
            </div>
          ) : (
            testsState.value.written.map((wt) => {
              return (
                <div className="flex items-center justify-between ">
                  <div>
                    <p className="capitalize">{wt.title}</p>
                    <p className="text-sm text-gray-600">
                      {wt.creater.username}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="h-full p-2 space-y-3 overflow-y-auto">
          {testsState.value.mcq.length <= 0 ? (
            <div className="flex items-center justify-between h-full">
              <span className="mx-auto font-semibold text-lg p-10">
                No written test found
              </span>
            </div>
          ) : (
            testsState.value.mcq.map((wt) => {
              return (
                <div className="flex comic-box-black rounded-md p-1 border-2 border-black items-center justify-between ">
                  <div>
                    <p className="capitalize text-lg">
                      {wt.title}
                      {"  "}
                      <span
                        className={`py-0.5 px-1 text-sm rounded-md text-white bg-blue-500`}
                      >
                        MCQ
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      {wt.creater.username}
                    </p>
                  </div>
                  <button><Trash className="text-red-600" /></button>
                </div>
              );
            })
          )}
        </div>
      </div>
    )}
  </div>
}
