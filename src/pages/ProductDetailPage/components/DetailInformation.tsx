import { Specification } from "@/types/product";
import { map } from "lodash";

const DetailInformation = ({
  specifications,
}: {
  specifications: Specification;
}) => {
  return (
    <div className="space-y-1 sm:rounded-lg bg-white p-4">
      <span className="font-semibold">{specifications.name}</span>

      <div className="mt-3 text-sm">
        {map(specifications.attributes, (item, index) => (
          <div className="grid grid-cols-2" key={item.name}>
            <span
              className={`${index < specifications.attributes.length - 1 ? "border-border-line" : "border-transparent"} border-b py-2 text-neutral-600`}
            >
              {item.name}
            </span>
            <span
              className={`${index < specifications.attributes.length - 1 ? "" : "border-transparent"} border-border-line border-b py-2`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailInformation;
