
type Props = {
    loading:boolean,
    before:string,
    after:string,
}

export default function LoginButton({loading,before,after}: Props) {
  return (
    <div >
        <button
                    type="submit"
                    className="w-full flex justify-center bg-white border rounded-2xl  border-black text-xl uppercase py-1 hover:bg-black hover:text-white transition duration-300  "
                    disabled={loading}
                >
                    {loading ? after: before}
                </button>
    </div>
  )
}