# RiskAI-Scanner 🔐

> AI-Powered Security Risk Assessment Browser Extension for Developers

[![Status](https://img.shields.io/badge/status-in%20development-yellow)](https://github.com/thenicktorres/RiskAI-Scanner)
[![Python](https://img.shields.io/badge/python-3.11+-blue)](https://python.org)
[![React](https://img.shields.io/badge/react-19+-61DAFB)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/fastapi-0.135+-009688)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## What is RiskAI-Scanner?

RiskAI-Scanner is a browser extension that helps developers identify security vulnerabilities in their web applications before they ship. It combines automated scanning, a guided questionnaire, and AI-powered recommendations to give developers an actionable vulnerability score and step-by-step fix guidance — all without leaving the browser.

It is especially useful for apps that were built quickly or with AI assistance ("vibe coded"), where common security best practices may have been overlooked.

---

## Features

- **Automated Security Scanning** — analyzes HTTP headers, cookies, CORS policies, exposed API keys, mixed content, and more
- **Guided Questionnaire** — asks targeted questions about your app to contextualize the scan results
- **Vulnerability Score** — generates a 0–100 risk score broken down by category (Authentication, Data Exposure, Network Security, Input Validation)
- **AI-Powered Recommendations** — uses Claude AI to suggest specific, prioritized fixes with code examples
- **PDF Report Export** — download a full vulnerability report to share with your team
- **NIST CSF 2.0 + MIT Framework Aligned** — assessments are structured around industry-recognized cybersecurity standards
- **OWASP Reference Functionality (in progress...)
- **User Accounts** — save and revisit past scans via Supabase authentication

---

## Tech Stack

| Layer | Technology |
|---|---|
| Browser Extension UI | React + Vite + Tailwind CSS |
| Backend API | Python + FastAPI |
| Database | PostgreSQL via Supabase |
| Authentication | Supabase Auth |
| AI Recommendations | Anthropic Claude API |
| Hosting | Railway / Render |
| Report Generation | Python (WeasyPrint) |

---

## Project Structure

```
RiskAI-Scanner/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── routes/
│   │   │   └── scan.py          # API endpoints for scanning
│   │   ├── models/
│   │   │   └── user.py          # Database user models
│   │   └── services/
│   │       ├── scanner.py       # Core scanning logic
│   │       └── ai.py            # Claude API integration
│   ├── .env                     # Secret keys 
│   └── requirements.txt         # Python dependencies
├── extension/
│   ├── public/
│   │   └── manifest.json        # Browser extension config
│   └── src/
│       ├── App.jsx              # Main React component
│       ├── main.jsx             # React entry point
│       ├── components/          # Reusable UI components
│       └── pages/               # Extension pages/views
├── database/
│   └── schema.sql               # PostgreSQL table definitions
├── docs/                        # Project documentation
├── .gitignore
└── README.md
```

---

## Author

**Nick Torres**
- GitHub: [@thenicktorres](https://github.com/thenicktorres)

---

## License

This project is licensed under the MIT License.
