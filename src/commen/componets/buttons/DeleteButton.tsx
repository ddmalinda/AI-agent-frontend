type Props = {
    handleDelete: (id?:number) => void,
    id?:number
}

export default function DeleteButton({handleDelete,id }: Props) {
    return (
        <button 
        onClick={()=>handleDelete(id)}
        className="m-1 p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
        </button>
    )
}