import { pagesLinkpath } from '../../../path/LinkPath'
import { Link } from 'react-router-dom'

type Props = {
businessId:string | undefined
}

export default function AIAgentPageButoon({businessId}: Props) {
  return (
    <Link to={pagesLinkpath.aiAgent+`/${businessId}`}>
    <button
    className='border px-4 py-1 text-xl uppercase rounded-sm bg-white'
    >
        Ai agent
    </button>
    </Link>
  )
}