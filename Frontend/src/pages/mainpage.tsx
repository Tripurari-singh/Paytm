import { useNavigate } from "react-router-dom";


const PaymentDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Top Bar */}
      <header className="bg-gradient-to-r from-slate-500 to-slate-400 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg"></div>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">PayDash</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-3 text-white hover:text-slate-200 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110">
                <div className="w-6 h-6 border-2 border-current rounded-full relative">
                  <div className="w-2 h-2 bg-current rounded-full absolute top-0 right-0 transform translate-x-1 -translate-y-1 animate-pulse"></div>
                </div>
              </button>
              <button className="flex items-center space-x-2 p-3 text-white hover:text-slate-200 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-105">
                <div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-current rounded-full"></div>
                </div>
                <span className="hidden sm:block text-sm font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent mb-6">
              Welcome to PayDash
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Your elegantly designed payment dashboard with modern aesthetics
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent mb-6">
              Premium Design Experience
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              Experience a sophisticated dashboard featuring gradient backgrounds, smooth animations, 
              and glass-morphism effects. Built with modern design principles for an exceptional user experience.
            </p>
            <div className="mt-8 flex justify-center">
              <div onClick={() => {
                navigate("/signup")
              }} className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer">
                <span className="font-semibold">Get Started</span>
                <div className="w-4 h-4 border-2 border-white border-l-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;