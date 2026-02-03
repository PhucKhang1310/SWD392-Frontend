import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export function HeroBanner() {
  const slides = [
    {
      id: 1,
      badge: "🔥 SIÊU SALE THÁNG 2",
      title: "MEGA SALE",
      subtitle: "Giảm đến 50%",
      description: "Laptop - Gaming - Phụ kiện",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop",
      gradient: "from-red-600 to-pink-600",
      buttonText: "Mua ngay",
    },
    {
      id: 2,
      badge: "⚡ HOT DEAL",
      title: "GAMING GEAR",
      subtitle: "Ưu đãi khủng",
      description: "PC Gaming - Màn hình - Bàn phím cơ",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=600&fit=crop",
      gradient: "from-purple-600 to-indigo-600",
      buttonText: "Khám phá ngay",
    },
    {
      id: 3,
      badge: "📱 NEW ARRIVALS",
      title: "SMARTPHONE",
      subtitle: "Mẫu mới nhất 2026",
      description: "iPhone - Samsung - Xiaomi flagship",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
      gradient: "from-blue-600 to-cyan-600",
      buttonText: "Xem ngay",
    },
    {
      id: 4,
      badge: "💻 PREMIUM TECH",
      title: "MACBOOK & LAPTOP",
      subtitle: "Trả góp 0%",
      description: "MacBook - Dell - HP - Asus",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      gradient: "from-gray-800 to-gray-900",
      buttonText: "Tìm hiểu thêm",
    },
  ];

  const renderArrowPrev = (onClickHandler, hasPrev) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-all transform hover:scale-110 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    );

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showThumbs={false}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
        className="hero-carousel"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`relative bg-gradient-to-r ${slide.gradient} text-white overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6 z-10 text-left"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {slide.badge}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-2xl md:text-4xl font-bold"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-lg md:text-xl opacity-90"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 shadow-2xl"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>{slide.buttonText}</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <TrendingUp className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </motion.div>

                {/* Right Image */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative hidden md:block"
                >
                  <motion.div
                    animate={{
                      rotate: [3, 6, 3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/20 shadow-2xl"
                  >
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-96 object-cover rounded-2xl"
                    />

                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                        }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                      <span>HOT</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements with animation */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
            />
          </div>
        ))}
      </Carousel>

      <style jsx>{`
        .hero-carousel .carousel .control-dots {
          bottom: 20px !important;
        }

        .hero-carousel .carousel .control-dots .dot {
          background: rgba(255, 255, 255, 0.4) !important;
          box-shadow: none !important;
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }

        .hero-carousel .carousel .control-dots .dot.selected {
          background: white !important;
          width: 40px !important;
          border-radius: 6px !important;
        }
      `}</style>
    </div>
  );
}
