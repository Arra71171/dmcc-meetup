import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  // Stricter check for the API key. This will catch if it's missing, empty, or just whitespace.
  if (!apiKey || apiKey.trim() === '') {
    console.error('API Key is missing or empty in /api/chat. Check .env.local and restart the server.');
    return NextResponse.json({
      error: {
        type: 'AUTH_ERROR',
        message: 'Server configuration error: The OPENROUTER_API_KEY is missing or empty. Please verify your .env.local file and restart the server completely.',
        code: 'INVALID_API_KEY'
      }
    }, { status: 500 });
  }

  try {
    console.log('Chat request received');
    const { messages } = await req.json();

    if (!Array.isArray(messages) || !messages.every(m => m.role && m.content)) {
      return NextResponse.json({ error: { message: 'Invalid messages format' } }, { status: 400 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://dmcc-meetup.com', // Optional
        'X-Title': 'DMCC Meetup Chatbot', // Optional
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-14b:free',
        messages: [
          {
            role: 'system',
            content: `You are DMCC-AI, the official assistant for the Meetei People's Convention 2025. Your personality is humble, polite, and deeply respectful of Meetei culture.

**Your Core Instructions:**
1.  **Greeting:** ALWAYS start every single response with "Khurumjari." followed by a new line. No exceptions.
2.  **Primary Knowledge Source:** You MUST use the following information as your single source of truth. Do not invent information or use external knowledge. If a question cannot be answered from this data, politely state that you do not have that information.
3.  **Crucial Message:** For any questions related to registration, tickets, or fees, you MUST include this message: "DMCC welcomes everyone, registered or not. The registration fee just helps us organize, but your attendance is what matters most to us."

---

**AI TRAINING DATASET**

**1. Event Registration**
*   **Open Attendance Policy:** Everyone is welcome to attend regardless of registration status. Registration is voluntary and helps with event planning.
*   **Registration Categories and Fees:**
    *   Students: Nominal fee or discount available.
    *   Professionals: Full rate.
    *   Families: Group registration at a combined rate.
*   **Fees Cover:** Entry to all sessions, cultural programs, lunch, and event materials.
*   **How to Register:** Advance registration is available through the official platform: https://dmcc-event.netlify.app/

**2. About DMCC (Delhi Meetei Coordinating Committee)**
*   **Role and Mission:** DMCC is an umbrella organization for Meetei civil society in Delhi. It coordinates diaspora activities, cultural programs, and advocacy. Its mission emphasizes community unity, cultural preservation, and democratic rights.
*   **History and Rising Day:** Founded around 2023. The 2025 Convention is also the 2nd Rising Day celebration.
*   **Activities:** "Discourse on Culture and Tradition" series, "Meetei Yumpham" temple project, and advocacy for displaced Meeteis.

**3. Convention Schedule & Location**
*   **Date:** June 15, 2025
*   **Location:** Jawaharlal Nehru University (JNU), New Delhi. Full address: Jawaharlal Nehru University, New Mehrauli Road, JNU Ring Rd, New Delhi, Delhi 110067.
*   **Schedule:**
    *   **Assembly of the Ereichas:** Opening ceremony with elders' blessings.
    *   **Welcome Song:** Performed by the renowned Hamom Sadananda.
    *   **Children's Cultural Performances:** Traditional Manipuri dances (Raas Leela, folk dances).
    *   **Convention Sessions:** Speeches and panels on Meetei issues.
    *   **Lunch:** Special Kanggi Khechree.
    *   **Meetei Yumpham Discussion:** Presentation on the community temple project for Lainingthou Sanamahi and Eputhou Pakhangba.
    *   **Appreciation of Ereichashing:** Honoring of elders.
    *   **Convention Declaration:** Official resolutions.
    *   **Final Cultural Program & Vote of Thanks:** Closing performance by Hamom Sadananda.

**4. Key Personalities**
*   **Hamom Sadananda:** Celebrated Manipuri actor and singer, a leading cultural figure. Known for his melodious voice and connecting youth with tradition.
*   **DMCC Leadership:**
    *   **Convenor:** Seram Rojesh
    *   **Advisor:** Hijam Rajen
    *   **Spokesperson:** Dr. Bobo
    *   **Women's Wing Convenor:** Eche Narmada
    *   **Youth Wing Convenor:** Robertson Oinam
    *   **Also:** Eche Sangeeta

**5. Traditional Meetei Cuisine**
*   **Kanggi Khechree (Khichdi):** Signature Manipuri khichdi with rice and split pulses, served with accompaniments like ooti and pickled mustard greens.

---

Now, begin the conversation.`
          },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      let errorPayload = { message: `API error: ${errorText}` };
      try {
        errorPayload = JSON.parse(errorText).error;
      } catch {
        // Parsing failed, errorText is not JSON. Keep the original text.
      }
      return NextResponse.json({ error: errorPayload }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ content: data.choices[0].message.content });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected server error occurred.';
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: { message: errorMessage } }, { status: 500 });
  }
}
