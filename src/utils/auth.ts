
import { google, sheets_v4 } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Decode the base64-encoded service account key from environment variables
function getServiceAccountCredentials(): Record<string, unknown> {
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyBase64) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set.');
  }
  const keyJson = Buffer.from(keyBase64, 'base64').toString('utf-8');
  return JSON.parse(keyJson);
}

export function getSheetsClient(): sheets_v4.Sheets {
  const auth = new google.auth.GoogleAuth({
    credentials: getServiceAccountCredentials(),
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}


