import SmallText from "../text/SmallText"
import SubTitle from "../titles/SubTitle"



type Props = {
    image:string,
    name:string,
    type :string,
    industry:string,
}


export default function SingleBusinessCart({image,name,type,industry }: Props) {
  return (
 <div className=" ml-5 mt-5 py-2 px-5 rounded-2xl border border-gray-500/50 w-3xs bg-white shadow grid justify-cente transition-all duration-500 ease-in-out transform hover:scale-103" >
            <img src={image} alt="business logo image" className="w-[200px] h-[200px] mx-auto"/>
            <div className="gap-2">
                <SubTitle title={name}/>
                    <SmallText text={type}/>
                    <SmallText text={industry}/>
            </div>
            </div>
  )
}