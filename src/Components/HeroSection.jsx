const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1498464619740-386503e7e7f5?q=80&w=2082&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 text-center md:text-left md:ml-16 lg:ml-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fadeIn" >
            Welcome to <span className="text-transparent bg-clip-text bg-[#E1B956]">EasyRent</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-5">
            Discover our collection of vehicles, featuring the latest models
            and innovative automotive technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 animate-fadeIn"
               style={{animationDelay: '0.6s'}}>
            <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105 duration-200">
              Explore Models
            </button>
            <button className="px-8 py-3 bg-transparent text-white font-semibold rounded-full border border-white hover:bg-white/10 transition-colors transform hover:scale-105 duration-200">
              Who We Are
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="h-12 w-7 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scrollDown"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;