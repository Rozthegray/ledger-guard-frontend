export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E9EEF5] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      
      {/* Background Decor (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#B6FF3B]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 text-center">
           <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-[#B6FF3B] rounded-lg flex items-center justify-center">
                {/* Simple Logo Icon */}
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Ledger Guard</span>
           </div>
        </div>
        
        {children}
      </div>
    </div>
  );
}