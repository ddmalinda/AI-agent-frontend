type Props = {
    tableTitels: {
        title: string,
        width: string,
    }[]
    productlist: {
        id: number,
        name: string,
        description: string,
        category: string,
        price: number,
        stock: number
    }[]
}

export default function ProductTable({ tableTitels, productlist }: Props) {
    return (
        <div className="bg-white m-5 p-2 w-auto rounded-2xl ">
            <table className="w-full table-fixed">
                {/* ↑ Add w-full and table-fixed */}
                <thead>
                    <tr >
                        {tableTitels.map((val, key) => {
                            return (
                                <th key={key} className={`${val.width} px-4 py-2 text-left border-b`}>
                                    {val.title}
                                </th>
                            )
                        })}
                        <th className={"w-12 px-4 py-2 text-right border-b"}>
                        <button className="m-1 p-2 rounded-lg border-2 border-gray-400 hover:border-gray-600 text-gray-600 hover:text-gray-800 hover:bg-green-50 transition-all duration-300 ease-in-out transform hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                            </svg>
                        </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample row to show the column widths */}
                    {productlist.map((value, key) => {
                        return (
                            <tr key={key} className=" border-b border-gray-400/50">
                                <td className="w-16 px-4 py-2 ">{key + 1}</td>
                                <td className="w-40 px-4 py-2 ">{value.name}</td>
                                <td className="w-80 px-4 py-2 ">{value.description}</td>
                                <td className="w-25 px-4 py-2 ">{value.category}</td>
                                <td className="w-10 px-4 py-2 ">{value.price}</td>
                                <td className="flex px-4 py-2 justify-between">
                                    {/* Delete Button */}
                                    <button className="m-1 p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-800 transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                        </svg>
                                    </button>

                                    {/* Edit Button */}
                                    <button className="m-1 p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>

                        )
                    }
                    )}

                </tbody>
            </table>
        </div>
    )
}