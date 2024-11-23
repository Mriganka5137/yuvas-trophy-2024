import React from "react";
import { Button } from "@/components/ui/button";
import { Ghost, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Ghost Animation */}
        <div className="relative">
          <Ghost
            className="w-32 h-32 mx-auto text-gray-400 animate-bounce"
            strokeWidth={1.5}
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-200 rounded-full opacity-50 blur-sm"></div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-gray-900">
          4<span className="text-primary">0</span>4
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Oops! Page not found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have vanished into thin air.
            Don't worry though, you can find your way back home!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="w-4 h-4" />
            Return Home
          </Button>
        </div>

        {/* Additional Help */}
        <p className="text-sm text-gray-500">
          If you believe this is a mistake, please contact our support team
        </p>
      </div>
    </div>
  );
};

export default NotFound;
