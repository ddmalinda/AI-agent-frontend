import { Link } from "react-router-dom"
import { linkPath, pagesLinkpath } from "../../../path/LinkPath"

type Props = {}

export default function Logo({ }: Props) {
    return (
        <Link to={pagesLinkpath.homePage}>
        <div className="ml-5 flex items-center gap-2">
            <img src={linkPath.logoImage} alt="Logo" className="w-[60px]" />
            <div className="font-plusjakarta text-4xl">
                AI Agent
            </div>
        </div>
        </Link>
    )
}