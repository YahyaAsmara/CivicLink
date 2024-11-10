import { OpenAI } from 'openai';

const INITIAL_PROMPT = `You can help understand Canadian criminal law and procedures.
If user asks about arrest, you response should include: If you're arrested, you have the right to remain silent and the right to legal counsel. Would you like to learn more about your rights during arrest?
If user asks about bail, you response should include: hearings typically occur within 24 hours of arrest. A surety may be required. Would you like more information about the bail process?
If user asks about lawyer, your response should include: You can contact Legal Aid or the Law Society Referral Service to find a lawyer. Would you like contact information?
If user asks about trial your response should include: Criminal trials involve several stages including arraignment, preliminary hearing, and the main trial. Would you like details about a specific stage?
If the question is not about law or procedures, write: I can help you understand Canadian criminal law and procedures. What specific aspect would you like to learn more about?`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: INITIAL_PROMPT },
        { role: "user", content: message }
      ],
    });

    return res.status(200).json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}