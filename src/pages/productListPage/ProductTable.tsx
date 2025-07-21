import AddButton from "../../commen/componets/buttons/AddButton"
import DeleteButton from "../../commen/componets/buttons/DeleteButton"
import EditeButton from "../../commen/componets/buttons/EditeButton"

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
    }[],
    handleDelete: (id: number) => void,
   
    handleProduct: (product: any) => void
}

export default function ProductTable({ tableTitels, productlist,handleDelete,handleProduct }: Props) {
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
                         <AddButton handleProduct={handleProduct}/>
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
                                    <DeleteButton handleDelete={handleDelete} id={value.id}/>

                                    {/* Edit Button */}
                                    <EditeButton handleEditProduct={handleProduct} product={value} />
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