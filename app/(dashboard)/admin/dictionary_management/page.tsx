export default function DictionaryManagement(){
    return(
        <>
       <div className="flex flex-col gap-5 items-center mt-7">
       <div className="flex items-center gap-4">
              <span className="font-poppins">Name</span>
              <input className="border rounded-sm w-[460px] h-[45px] border-[rgba(255,145,2,1)]" type="text" name="" id="" />
        </div>
       
        <div className="w-[390px]">
        <button className="w-[447px] h-[45px] rounded-sm px-1 text-white bg-[rgba(255,145,2,1)]" type="submit">Add Item</button>
        </div>
       </div>
      {/* /////////// */}
        </>
    )
}