import { getLeagueData } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("--- API Test Started ---");
  
  try {
    const data = await getLeagueData();
    
    if (!data) {
      console.log("--- API Error: No data returned from Google ---");
      return NextResponse.json({ error: 'No data returned' }, { status: 500 });
    }

    console.log("--- API Success: Data received! ---");
    return NextResponse.json(data);
  } catch (error) {
    console.error("--- API Crash ---", error);
    return NextResponse.json({ error: 'Crash' }, { status: 500 });
  }
}