import { NextResponse } from 'next/server';
import axios from 'axios';

const ZOHO_URL_ENQUIRY = 'https://flow.zoho.com/665414896/flow/webhook/incoming?zapikey=1001.97501cfb8354c58180082142902bf594.fa0b259ad042e6f8677f538c33c6ff01&isdebug=false';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Axios post to Zoho
    const response = await axios.post(ZOHO_URL_ENQUIRY, body, {
      headers: { 'Content-Type': 'application/json' },
      transformResponse: [(data) => {
        try { return JSON.parse(data); } catch { return data; }
      }]
    });

    return NextResponse.json({
      success: true,
      data: response.data,
      status: response.status
    });

  } catch (error: any) {
    console.error('Zoho Enquiry Error:', error.response?.data || error.message);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}