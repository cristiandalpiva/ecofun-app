import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres Eco-Guía, un experto en sostenibilidad amable y divertido. Tu objetivo es guiar a los niños en EcoFun, una aplicación educativa sobre ecología y medio ambiente.

Contexto de EcoFun:
- Juegos disponibles: Memory de Reciclaje, Quiz Ecológico, Aventura Submarina, Animales en Peligro, Guardianes del Hábitat, y más
- Secciones: Consejos diarios, Retos semanales, Contenido educativo, Logros
- Temas: reciclaje, animales en peligro, energía renovable, cuidado del agua, biodiversidad

Reglas:
- Sé breve y conciso (máximo 2-3 oraciones)
- Usa emojis relacionados con la naturaleza 🌱🌍🐢🌊🌻
- Responde de forma amigable y motivadora para niños
- Si preguntan sobre algo fuera del tema ecológico, redirige amablemente hacia temas de sostenibilidad
- Sugiere actividades y juegos de la app cuando sea apropiado`;

// Input validation constants
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_TOTAL_LENGTH = 10000;
const VALID_ROLES = ["user", "assistant"];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up expired rate limit entries periodically
const cleanupRateLimitStore = () => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now >= value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
};

// Check rate limit for a client
const checkRateLimit = (clientIp: string): { allowed: boolean; remaining: number; resetIn: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);

  if (!record || now >= record.resetTime) {
    // New window - reset counter
    rateLimitStore.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  // Increment counter
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count, resetIn: record.resetTime - now };
};

// Get client IP from request headers
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         req.headers.get("x-real-ip") ||
         req.headers.get("cf-connecting-ip") ||
         "unknown";
};

// Sanitize text by removing control characters
const sanitizeText = (text: string): string => {
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
};

// Validate messages array
const validateMessages = (messages: unknown): { valid: boolean; error?: string; sanitized?: Array<{role: string; content: string}> } => {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Los mensajes deben ser un array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Se requiere al menos un mensaje" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Máximo ${MAX_MESSAGES} mensajes permitidos` };
  }

  let totalLength = 0;
  const sanitized: Array<{role: string; content: string}> = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Mensaje ${i + 1} tiene formato inválido` };
    }

    if (!msg.role || !VALID_ROLES.includes(msg.role)) {
      return { valid: false, error: `Mensaje ${i + 1} tiene rol inválido` };
    }

    if (typeof msg.content !== "string") {
      return { valid: false, error: `Mensaje ${i + 1} debe tener contenido de texto` };
    }

    const sanitizedContent = sanitizeText(msg.content);

    if (sanitizedContent.length === 0) {
      return { valid: false, error: `Mensaje ${i + 1} está vacío` };
    }

    if (sanitizedContent.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Mensaje ${i + 1} excede ${MAX_MESSAGE_LENGTH} caracteres` };
    }

    totalLength += sanitizedContent.length;

    if (totalLength > MAX_TOTAL_LENGTH) {
      return { valid: false, error: `La conversación excede ${MAX_TOTAL_LENGTH} caracteres totales` };
    }

    sanitized.push({ role: msg.role, content: sanitizedContent });
  }

  return { valid: true, sanitized };
};

serve(async (req) => {
  // Periodically clean up rate limit store
  if (Math.random() < 0.1) {
    cleanupRateLimitStore();
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIp = getClientIp(req);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: "Has enviado muchos mensajes. Espera un momento antes de intentar de nuevo. 🌿",
          retryAfter: Math.ceil(rateLimit.resetIn / 1000)
        }), 
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000))
          },
        }
      );
    }

    const body = await req.json();
    
    // Validate input
    const validation = validateMessages(body.messages);
    if (!validation.valid) {
      console.warn("Input validation failed:", validation.error);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const messages = validation.sanitized!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing ${messages.length} validated messages from IP: ${clientIp}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Eco-Guía está descansando un momento. ¡Inténtalo de nuevo en unos segundos! 🌿" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Eco-Guía necesita más energía. Por favor, contacta al administrador. ☀️" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error al conectar con Eco-Guía" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetIn / 1000))
      },
    });
  } catch (error) {
    console.error("eco-guia-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
