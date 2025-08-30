export default function handler(req, res) {
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  
  res.status(200).json({
    status: hasOpenAIKey ? 'ready' : 'no_api_key',
    message: hasOpenAIKey ? 'KLOFI AI system ready' : 'OpenAI API key not configured',
    timestamp: new Date().toISOString()
  });
}
