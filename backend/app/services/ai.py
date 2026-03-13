import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def analyze_scan(answers: dict) -> dict:
    # Build the prompt from the answers
    formatted_answers = ""
    for question_id, response in answers.items():
        answer = response.get("answer", "")
        follow_up = response.get("followUp", "")
        formatted_answers += f"- {question_id}: {answer}"
        if follow_up:
            formatted_answers += f" (Details: {follow_up})"
        formatted_answers += "\n"

    prompt = f"""You are a cybersecurity expert conducting a security risk assessment aligned with NIST CSF 2.0 and the MIT Cybersecurity Clinic framework.

A developer has completed a security questionnaire about their web application. Here are their answers:

{formatted_answers}

Based on these answers, provide a structured security assessment with the following:

1. OVERALL RISK SCORE: A score from 0-100 (0 = extremely vulnerable, 100 = very secure)

2. SCORES BY NIST CSF FUNCTION: Score each of the 6 functions (0-100):
   - GOVERN (gov1, gov2, gov3)
   - IDENTIFY (id1, id2, id3, id4, id5)
   - PROTECT (pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9)
   - DETECT (det1, det2, det3)
   - RESPOND (res1, res2, res3, res4)
   - RECOVER (rec1, rec2, rec3, rec4)

3. RISK LEVEL: One of: CRITICAL, HIGH, MEDIUM, LOW

4. TOP VULNERABILITIES: List the 5 most critical security gaps found, each with:
   - Title
   - NIST CSF function and category it maps to
   - Severity (Critical/High/Medium/Low)
   - Description of the risk

5. RECOMMENDATIONS: For each vulnerability, provide:
   - A specific, actionable fix
   - A code example where applicable
   - Priority order (fix this first, second, etc.)

Format your response as JSON only, no other text. Use this exact structure:
{{
  "overall_score": 0-100,
  "risk_level": "CRITICAL|HIGH|MEDIUM|LOW",
  "function_scores": {{
    "GOVERN": 0-100,
    "IDENTIFY": 0-100,
    "PROTECT": 0-100,
    "DETECT": 0-100,
    "RESPOND": 0-100,
    "RECOVER": 0-100
  }},
  "vulnerabilities": [
    {{
      "title": "string",
      "nist_function": "string",
      "nist_category": "string",
      "severity": "Critical|High|Medium|Low",
      "description": "string",
      "recommendation": "string",
      "code_example": "string or null",
      "priority": 1-5
    }}
  ]
}}"""

    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=4000,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    import json
    response_text = message.content[0].text
    clean = response_text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)