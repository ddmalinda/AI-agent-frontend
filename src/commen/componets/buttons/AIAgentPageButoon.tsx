import { pagesLinkpath } from '../../../path/LinkPath'
import { Link } from 'react-router-dom'

type Props = {

}

export default function AIAgentPageButoon({}: Props) {
  return (
    <Link to={pagesLinkpath.aiAgent}>
    <button
    className='border px-4 py-1 text-xl uppercase rounded-sm bg-white'
    >
        Ai agent
    </button>
    </Link>
  )
}