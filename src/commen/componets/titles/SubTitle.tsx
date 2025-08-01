
type Props = {
    title:string,
}

export default function SubTitle({title}: Props) {
  return (
    <p className='text-3xl font-poppins'>{title}</p>
  )
}