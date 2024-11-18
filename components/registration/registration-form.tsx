/* eslint-disable */
"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  paymentSchema,
  playersSchema,
  teamDetailsSchema,
} from "@/schemas/registration";
import { Payment, PlayerRole, Players, TeamDetails } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import PaymentQRSection from "../payment-qr-section";

const PLAYER_ROLES: PlayerRole[] = [
  "Batsman",
  "Bowler",
  "All-Rounder",
  "Wicket Keeper",
];

export const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<
    Partial<{
      teamDetails: TeamDetails;
      players: Players;
      payment: Payment;
    }>
  >({});

  const teamDetailsForm = useForm<TeamDetails>({
    resolver: zodResolver(teamDetailsSchema),
    defaultValues: {
      teamName: "",
      captainName: "",
      contactNumber: "",
      alternateNumber: "",
      email: "",
    },
  });

  const playersForm = useForm<Players>({
    resolver: zodResolver(playersSchema),
    defaultValues: {
      mainPlayers: Array(11).fill({
        name: "",
        age: 18,
        role: "Batsman" as PlayerRole,
      }),
      substitutes: [],
    },
  });

  const paymentForm = useForm<Payment>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      transactionId: "",
    },
  });

  const onTeamDetailsSubmit = (data: TeamDetails) => {
    setFormData((prev) => ({ ...prev, teamDetails: data }));
    setCurrentStep(2);
  };

  // Modified onPlayersSubmit function
  const onPlayersSubmit = (data: Players) => {
    try {
      // Validate that we have exactly 11 main players
      if (data.mainPlayers.length !== 11) {
        toast.error("You must have exactly 11 main players");
        return;
      }

      setFormData((prev) => ({ ...prev, players: data }));
      setCurrentStep(3);
    } catch (error) {
      console.error("Players details error:", error);
      toast.error("Failed to save players details");
    }
  };

  const onPaymentSubmit: SubmitHandler<Payment> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the submission data
      const submissionData = {
        teamDetails: formData.teamDetails,
        players: formData.players,
        payment: {
          transactionId: data.transactionId,
        },
      };

      let response;

      if (data.paymentScreenshot) {
        // If there's a file, use FormData
        const formDataToSend = new FormData();
        formDataToSend.append("data", JSON.stringify(submissionData));
        formDataToSend.append("paymentScreenshot", data.paymentScreenshot);

        response = await fetch("/api/register", {
          method: "POST",
          body: formDataToSend,
        });
      } else {
        // If no file, send JSON directly
        response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Show success message
      toast.success("Registration successful!");

      // Reset forms
      teamDetailsForm.reset();
      playersForm.reset();
      paymentForm.reset();
      setCurrentStep(1);
      setFormData({});
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Failed to submit registration");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTeamDetailsForm = () => (
    <Form {...teamDetailsForm}>
      <form
        onSubmit={teamDetailsForm.handleSubmit(onTeamDetailsSubmit)}
        className="space-y-6"
      >
        <FormField
          control={teamDetailsForm.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={teamDetailsForm.control}
          name="captainName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Captain Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter captain name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={teamDetailsForm.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={teamDetailsForm.control}
            name="alternateNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternate Number</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={teamDetailsForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormDescription>
                Tournament updates will be sent to this email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Next: Player Details
        </Button>
      </form>
    </Form>
  );

  const renderPlayerFields = (type: "main" | "substitute", index: number) => {
    const prefix = type === "main" ? "mainPlayers" : "substitutes";

    return (
      <div key={`${type}-${index}`} className="p-4 border rounded-lg space-y-4">
        <h4 className="font-medium">
          {type === "main" ? `Player ${index + 1}` : `Substitute ${index + 1}`}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={playersForm.control}
            name={`${prefix}.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={playersForm.control}
            name={`${prefix}.${index}.age`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={playersForm.control}
            name={`${prefix}.${index}.role`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PLAYER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  const renderPlayersForm = () => (
    <Form {...playersForm}>
      <form
        onSubmit={playersForm.handleSubmit(onPlayersSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Main Players (11 Required)</h3>
          {Array(11)
            .fill(null)
            .map((_, i) => renderPlayerFields("main", i))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Substitute Players (Up to 6)
          </h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentSubs = playersForm.getValues("substitutes");
              if (currentSubs.length < 6) {
                playersForm.setValue("substitutes", [
                  ...currentSubs,
                  { name: "", age: 18, role: "Batsman" },
                ]);
              }
            }}
          >
            Add Substitute
          </Button>
          {playersForm
            .watch("substitutes")
            .map((_, i) => renderPlayerFields("substitute", i))}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(1)}
          >
            Previous
          </Button>
          <Button type="submit">Next: Payment</Button>
        </div>
      </form>
    </Form>
  );
  const renderPaymentForm = () => (
    <Form {...paymentForm}>
      <form
        onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}
        className="space-y-6"
      >
        <PaymentQRSection />

        <FormField
          control={paymentForm.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter UPI transaction ID" />
              </FormControl>
              <FormDescription>
                Enter the UPI transaction ID from your payment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={paymentForm.control}
          name="paymentScreenshot"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Payment Screenshot</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error("File size must be less than 5MB");
                        return;
                      }
                      onChange(file);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Upload screenshot of payment (Max size: 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(2)}
          >
            Previous
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Registration
          </Button>
        </div>
      </form>
    </Form>
  );

  React.useEffect(() => {
    return () => {
      // Cleanup on component unmount
      setFormData({});
      setCurrentStep(1);
      setError(null);
    };
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Team Registration</CardTitle>
        <CardDescription>
          Complete all steps to register your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {["Team Details", "Players", "Payment"].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index + 1 <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm mt-2">{step}</span>
                {index < 2 && (
                  <div
                    className={`h-1 w-24 mt-4 ${
                      index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <div className="mt-8">
            {currentStep === 1 && renderTeamDetailsForm()}
            {currentStep === 2 && renderPlayersForm()}
            {currentStep === 3 && renderPaymentForm()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
