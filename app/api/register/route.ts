// disable eslint for this file
/* eslint-disable */
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: NextRequest) {
  try {
    let data;
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await req.formData();

      const jsonDataString = formData.get("data");
      if (!jsonDataString) {
        return NextResponse.json(
          { success: false, message: "No data provided in form" },
          { status: 400 }
        );
      }

      try {
        data = JSON.parse(jsonDataString as string);
      } catch (e) {
        console.error("JSON Parse Error:", e);
        return NextResponse.json(
          { success: false, message: "Invalid JSON data format" },
          { status: 400 }
        );
      }
    } else {
      // If it's a regular JSON request
      try {
        data = await req.json();
      } catch (e) {
        console.error("Request JSON Parse Error:", e);
        return NextResponse.json(
          { success: false, message: "Invalid JSON format" },
          { status: 400 }
        );
      }
    }

    // Validate the data structure
    if (!data || !data.teamDetails || !data.players || !data.payment) {
      return NextResponse.json(
        { success: false, message: "Missing required data fields" },
        { status: 400 }
      );
    }

    // Initialize Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Format data for the sheet
    const rowData = [
      [
        new Date().toISOString(),
        data.teamDetails.teamName,
        data.teamDetails.captainName,
        data.teamDetails.contactNumber,
        data.teamDetails.alternateNumber || "N/A",
        data.teamDetails.email,
        // Format players data
        data.players.mainPlayers
          .map(
            (p: any, i: number) => `${i + 1}. ${p.name} (${p.age}) - ${p.role}`
          )
          .join("\n"),

        data.players.substitutes?.length > 0
          ? data.players.substitutes
              .map(
                (p: any, i: number) =>
                  `${i + 1}. ${p.name} (${p.age}) - ${p.role}`
              )
              .join("\n")
          : "No substitutes",
        data.payment.transactionId,
        "Pending", // Status
      ],
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range: "A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: rowData,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
