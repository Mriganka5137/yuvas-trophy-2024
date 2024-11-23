"use client";
import { RegistrationForm } from "@/components/registration/registration-form";
import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  Badge,
  Calendar,
  ChevronRight,
  Ghost,
  Home,
  IndianRupee,
  MapPin,
  Phone,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// RegistrationModal Component
const RegistrationModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 flex justify-between items-center bg-white p-4 border-b z-50">
          <h2 className="text-xl font-bold">Team Registration</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <RegistrationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const HomePage = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleRegistrationClick = () => {
    setIsRegistrationOpen(true);
  };

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <div className="relative min-h-[100vh] bg-gradient-to-br from-indigo-600 to-purple-700">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Cricket Balls */}
          <motion.div
            initial={{ x: -100, y: -100 }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 right-20 w-32 h-32 bg-red-500 rounded-full opacity-20"
          />
          <motion.div
            initial={{ x: 100, y: 100 }}
            animate={{
              x: [-100, 0, -100],
              y: [50, 0, 50],
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 left-20 w-40 h-40 bg-yellow-500 rounded-full opacity-10"
          />
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-8 h-full items-center pt-8 lg:pt-0">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8 lg:space-y-10"
            >
              {/* Title Section */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="text-base lg:text-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none px-4 lg:px-6 py-1.5 lg:py-2 uppercase tracking-wider font-bold">
                    Season 4.0
                  </Badge>
                </motion.div>
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    E-8 YUVA&apos;S
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-2">
                    TROPHY
                  </span>
                </h1>
              </div>

              {/* Prize and Fee Information */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <Trophy className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400 mb-2" />
                  <div>
                    <p className="text-sm lg:text-base text-gray-300">
                      Total Prize
                    </p>
                    <p className="text-xl lg:text-3xl font-bold flex items-center">
                      <IndianRupee className="h-4 w-4 lg:h-6 lg:w-6" />
                      1,10,000
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <Users className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400 mb-2" />
                  <div>
                    <p className="text-sm lg:text-base text-gray-300">
                      Entry Fee
                    </p>
                    <p className="text-xl lg:text-3xl font-bold flex items-center">
                      <IndianRupee className="h-4 w-4 lg:h-6 lg:w-6" />
                      3,500
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Tournament Details */}
              <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" />
                  <span className="text-base lg:text-lg">
                    28-30 November, 2024
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" />
                  <span className="text-base lg:text-lg">
                    Simen Chapori Mini Stadium
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                {["9954898352", "7002435921", "7002366304"].map((number) => (
                  <motion.a
                    key={number}
                    href={`tel:${number}`}
                    className="group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 lg:p-4 text-center border border-white/20 transition-all duration-300 group-hover:bg-white/20">
                      <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 mb-2 mx-auto" />
                      <span className="text-xs lg:text-sm font-medium">
                        {number}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* CTA Button - Desktop */}
              <motion.div
                className="hidden lg:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={handleRegistrationClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg w-full sm:w-auto"
                >
                  Register Your Team
                  <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Registration Form (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
            >
              <RegistrationForm />
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-12 lg:h-20 fill-white preserve-3d"
          >
            <path d="M0,96L48,88C96,80,192,64,288,64C384,64,480,80,576,80C672,80,768,64,864,58.7C960,53,1056,59,1152,58.7C1248,59,1344,53,1392,50.7L1440,48L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Organizers Section */}
      <div className="bg-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl lg:text-3xl font-bold">Organized By</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl lg:text-2xl font-bold text-indigo-600">
                SURYA CLUB
              </p>
              <p className="mt-4 text-gray-600">In cooperation with</p>
              <div className="mt-6 space-y-4">
                <p className="text-base lg:text-lg font-medium text-gray-800">
                  BHUBAN PEGU FANS CLUB
                </p>
                <p className="text-base lg:text-lg font-medium text-gray-800">
                  Simen Chapori YUVA SAMAJ
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Fixed Registration Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg">
        <Button
          onClick={handleRegistrationClick}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl"
        >
          Register Now
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />

      {/* Bottom Spacing for Mobile */}
      <div className="lg:hidden h-20"></div>
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
  //     <div className="max-w-2xl w-full text-center space-y-8">
  //       {/* Ghost Animation */}
  //       <div className="relative">
  //         <Ghost
  //           className="w-32 h-32 mx-auto text-gray-400 animate-bounce"
  //           strokeWidth={1.5}
  //         />
  //         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-200 rounded-full opacity-50 blur-sm"></div>
  //       </div>

  //       {/* Error Code */}
  //       <h1 className="text-8xl font-bold text-gray-900">
  //         4<span className="text-primary">0</span>4
  //       </h1>

  //       {/* Message */}
  //       <div className="space-y-2">
  //         <h2 className="text-2xl font-semibold text-gray-900">
  //           Oops! Page not found
  //         </h2>
  //         <p className="text-gray-600 max-w-md mx-auto">
  //           The page you&apos;re looking for seems to have vanished into thin
  //           air. Don&apos;t worry though, you can find your way back home!
  //         </p>
  //       </div>

  //       {/* Action Buttons */}
  //       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  //         <Button
  //           variant="default"
  //           size="lg"
  //           className="gap-2"
  //           onClick={() => window.history.back()}
  //         >
  //           <ArrowLeft className="w-4 h-4" />
  //           Go Back
  //         </Button>

  //         <Button
  //           variant="outline"
  //           size="lg"
  //           className="gap-2"
  //           onClick={() => (window.location.href = "/")}
  //         >
  //           <Home className="w-4 h-4" />
  //           Return Home
  //         </Button>
  //       </div>

  //       {/* Additional Help */}
  //       <p className="text-sm text-gray-500">
  //         If you believe this is a mistake, please contact our support team
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default HomePage;
