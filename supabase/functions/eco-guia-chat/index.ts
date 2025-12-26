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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("eco-guia-chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
