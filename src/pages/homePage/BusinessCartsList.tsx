import SingleBusinessCart from "../../commen/componets/cart/SingleBusinessCart"
import { linkPath } from "../../path/LinkPath"

interface BusinessDetails {
  id:number,
  name: string;
  type: string;
  industry: string;
  description: string;
}

type Props = {
  businessDetails: BusinessDetails[],
  handleBusinessButton: (businessId: number) => void
}

export default function BusinessCartsList({ businessDetails,handleBusinessButton }: Props) {
  return (
    <div className="grid grid-cols-4 w-full ">
      {businessDetails.map((val, key) => {
        return (
          <div key={key}>
            <button
              className="cursor-pointer"
              onClick={()=>handleBusinessButton(val.id)}
            >
              <SingleBusinessCart image={linkPath.logoImage} name={val.name} industry={val.industry} type={val.type} />
            </button>
          </div>
        )
      })}
    </div>
  )
}