import SingleBusinessCart from "../../commen/componets/cart/SingleBusinessCart"
import { linkPath } from "../../path/LinkPath"

interface BusinessDetails {
  name: string;
  type: string;
  industry: string;
  description: string;
}

type Props = {
  businessDetails: BusinessDetails[]
}

export default function BusinessCartsList({ businessDetails }: Props) {
  return (
    <div className="grid grid-cols-4 w-full ">
      {businessDetails.map((val, key) => {
        return (
          <div key={key}>
            <button
              className="cursor-pointer"
            >
              <SingleBusinessCart image={linkPath.logoImage} name={val.name} industry={val.industry} type={val.type} />
            </button>
          </div>
        )
      })}
    </div>
  )
}