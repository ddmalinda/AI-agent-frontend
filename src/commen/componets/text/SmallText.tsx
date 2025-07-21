
type Props = {
    text:string,
}

export default function SmallText({text}: Props) {
  return (
    <div className="block text-gray-700 font-medium ">{text}</div>
  )
}