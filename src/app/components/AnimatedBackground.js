import { motion } from "framer-motion";

const AnimatedBackground = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F5F3EE] box-border">
      {/* Shape 1 */}
      <motion.div
        className="absolute left-0 bottom-0 w-[40%] h-[60%] bg-[#B08B72] rounded-[50%_70%_60%_0%]"
        animate={{
            borderRadius: [
            "50% 70% 60% 0%", 
            "60% 50% 40% 0%", 
            "50% 30% 80% 0%",
            "40% 10% 80% 0%",
            "60% 50% 40% 0%",
            "50% 70% 60% 0%",
            ],  // Animate between different corner styles smoothly
        }}
        transition={{
            duration: 4,  // Duration of the animation (increased for smoother transition)
            repeat: Infinity,
            ease: "easeInOut",  // Smooth transition effect
        }}
        />

      
      {/* Shape 2 */}
      <motion.div
        className="absolute bottom-[5%] right-[-5%] w-[45%] h-[50%] bg-[#3B3A36] rounded-[50%]"
        animate={{ x: [0, -15, 15, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shape 3 */}
      <motion.div
        className="absolute top-[30%] right-[20%] w-[35%] h-[40%] bg-[#E1A87A] rounded-[55%] rotate-[30deg]"
        animate={{ x: [0, 10, -10, 0], y: [0, 5, -5, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Shape 4 (Thin Line) */}
      <motion.div
        className="absolute top-[10%] right-[5%] w-[2px] h-[80%] bg-[#E1A87A]"
        animate={{ y: [0, 20, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;
