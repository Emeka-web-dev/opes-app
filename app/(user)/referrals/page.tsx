import { TreeChart } from "@/components/referral/tree-chart";
import data from "@/data.json";

const page = () => {
  return (
    <div>
      <div className="">
        <TreeChart data={data} />
      </div>
    </div>
  );
};

export default page;
