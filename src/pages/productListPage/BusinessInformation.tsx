
import SubTitle from '../../commen/componets/titles/SubTitle'
import SmallText from '../../commen/componets/text/SmallText'

type Props = {
    image:string,
    name:string,
    type :string,
    industry:string,
}

export default function BusinessInformation({image,name,type,industry }: Props) {
  return (
    <div>
        <div className="bg-white py-2 px-5 rounded-2xl  grid justify-center" >
          <div>
            
          </div>
            <img src={image} alt="business logo image" className="w-[200px] h-[200px] justify-center mx-auto"/>
            <div className="gap-2">
                <SubTitle title={name}/>
                    <SmallText text={industry}/>
                    <SmallText text={type}/>
            </div>
            </div>
    </div>
  )
}