"use client";
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PaymentQRSection = () => {
  const upiId = "123bijaykr-1@okhdfcbank";
  const amount = "3500";
  const paymentUrl = `upi://pay?pa=${upiId}&pn=Tournament_Registration&am=${amount}&cu=INR`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("UPI ID copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy UPI ID");
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-xl border shadow-lg">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Payment Details
          </h3>
          <p className="text-sm text-gray-500">
            Scan QR code to pay registration fee
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Registration Fee</p>
          <p className="text-3xl font-bold text-blue-900">₹3,500/-</p>
        </div>

        <div className="flex justify-center py-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <QRCodeSVG
              value={paymentUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">UPI ID</p>
          <div className="flex items-center justify-center space-x-2">
            <code className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg select-all">
              {upiId}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(upiId)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800">
            <p className="font-medium">Important:</p>
            <ul className="mt-2 space-y-1 text-yellow-700">
              <li>• Please enter exact amount: ₹3,500</li>
              <li>• Save payment screenshot</li>
              <li>• Note down transaction ID</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQRSection;
