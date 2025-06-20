
export function AppBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md border border-gray-200 backdrop-blur-sm">
      <div className=" bg-slate-500 text-lg font-semibold text-white ml-2 rounded-full p-3">
        Paytm App
      </div>
      
      <div className="flex items-center">
        <div className="text-gray-600 mr-3 font-medium">Hello</div>
        <div className="bg-slate-500 text-white rounded-full h-11 w-11 flex items-center justify-center shadow-lg text-lg font-bold">
          U
        </div>
      </div>
    </div>
  );
}
