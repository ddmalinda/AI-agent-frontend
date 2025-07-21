type Props = {
    handleEditProduct: (product: any) => void,
    product: {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
}
}

export default function EditeButton({handleEditProduct,product}: Props) {
    return (
        <div>
            <button
            onClick={()=>handleEditProduct(product)}
            className="m-1 p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
            </button>
        </div>
    )
}