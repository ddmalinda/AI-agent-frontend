
type Props = {
    title:string,
}

export default function SubTitle({title}: Props) {
  return (
    <div className='text-3xl font-poppins'>{title}</div>
  )
}