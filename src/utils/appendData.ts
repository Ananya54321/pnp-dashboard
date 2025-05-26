"use server"
import { getSheetsClient } from '@/utils/auth';
import { sheets_v4 } from 'googleapis';

interface UserData {
    name: string;
    email: string;
    userType: string;
  }
  
  export async function appendData(
    range: string,
    userData: UserData[]
  ): Promise<void> {

    console.log("on_submit_server_call");
    const spreadsheetId = '1r_U9D4jjItN5vgMfUx_MJ4coCTQBNaAo1Wy00G8mz8s';
    const sheets = getSheetsClient();
  
    // Convert the userData array to a format suitable for Google Sheets
    const values: any[][] = userData.map(({ name, email, userType }) => [name, email, userType]);
    const resource: sheets_v4.Schema$ValueRange = {
      values,
    };
  
    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: resource,
      });
  
      console.log('Data appended:', response.data);
    } catch (err) {
      console.error('Error appending data:', err);
    }
  }
  
  