import { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  title: string;
  text: string;
  index: number;
}

const Vertical: React.FC<Props> = ({ Icon, text, index, title }) => {
  const childOne = () => (index % 2 === 0 ? "order-1" : "order-2");
  const childTwo = () => (index % 2 === 0 ? "order-2" : "order-1");

  return (
    <article className="grid grid-cols-4 rounded overflow-hidden shadow-md border border-gray-300">
      <div
        className={`${childOne()} bg-green-600 aspect-square flex items-center justify-center`}
      >
        <Icon className="text-white w-40 h-40" />
      </div>
      <div className={`${childTwo()} col-span-3 p-5 space-y-5 `}>
        <h2 className="text-4xl capitalize text-gray-800 font-bold">{title}</h2>
        <p className="text-gray-800">{text}</p>
      </div>
    </article>
  );
};

export default Vertical;
