import { useState } from "react"

const QUESTIONS = [
  // GOVERN
  {
    id: "gov1", section: "GOVERN", color: "blue",
    question: "Is there a designated person responsible for the security of this app?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "What is this person's role and do they have authority to take the app offline during an attack?",
    followUpNo: "Who has authority over security decisions and who can take the app offline if needed?"
  },
  {
    id: "gov2", section: "GOVERN", color: "blue",
    question: "Is there a documented security policy for this application?",
    type: "yesno",
    followUpOn: "no",
    followUpNo: "Why does one not exist and are there plans to create one?"
  },
  {
    id: "gov3", section: "GOVERN", color: "blue",
    question: "Have all developers been made aware of their security responsibilities?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "How were they informed and who enforces this?",
    followUpNo: "Why not and what are the plans to address this?"
  },

  // IDENTIFY
  {
    id: "id1", section: "IDENTIFY", color: "yellow",
    question: "What type of application is this?",
    type: "select",
    options: ["Web Application", "API / Backend Service", "Mobile App", "Full Stack App", "Other"],
    followUpOn: "none"
  },
  {
    id: "id2", section: "IDENTIFY", color: "yellow",
    question: "Is this app currently in production or still in development?",
    type: "select",
    options: ["In Production", "In Development", "Both (partially deployed)"],
    followUpOn: "none"
  },
  {
    id: "id3", section: "IDENTIFY", color: "yellow",
    question: "Was any part of this app AI-generated or vibe coded?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Was the AI-generated code reviewed for security issues before deployment? Did anyone verify its completeness and accuracy?"
  },
  {
    id: "id4", section: "IDENTIFY", color: "yellow",
    question: "Has this app ever experienced a security incident or breach?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Describe what happened, how it was handled, and what outside help was used."
  },
  {
    id: "id5", section: "IDENTIFY", color: "yellow",
    question: "Have you inventoried all systems, APIs, and third party services this app depends on?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "For each dependency, is there a clear agreement on who is responsible if a breach occurs through that channel?",
    followUpNo: "What are the challenges to doing so and what dependencies are you aware of?"
  },

  // PROTECT
  {
    id: "pro1", section: "PROTECT", color: "green",
    question: "Does your app require user authentication?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Describe the authentication method used (e.g. JWT, OAuth, session-based)."
  },
  {
    id: "pro2", section: "PROTECT", color: "green",
    question: "Is access to admin panels and critical systems restricted to only those who need it?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Who determines who gets access and what are the criteria?",
    followUpNo: "Why is access not restricted and what are the plans to address this?"
  },
  {
    id: "pro3", section: "PROTECT", color: "green",
    question: "Are there any shared accounts or credentials among team members?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Describe which credentials are shared and why."
  },
  {
    id: "pro4", section: "PROTECT", color: "green",
    question: "Are all software dependencies, packages, and frameworks kept up to date?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Whose responsibility is this and how often are updates applied?",
    followUpNo: "Why not and what is the process for handling updates?"
  },
  {
    id: "pro5", section: "PROTECT", color: "green",
    question: "Does your app use HTTPS?",
    type: "yesno",
    followUpOn: "no",
    followUpNo: "Why is HTTPS not enabled and are there plans to implement it?"
  },
  {
    id: "pro6", section: "PROTECT", color: "green",
    question: "Were API keys or credentials ever hardcoded during development?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Have they since been moved to environment variables or a secrets manager?"
  },
  {
    id: "pro7", section: "PROTECT", color: "green",
    question: "Does your app store sensitive user data (PII, passwords, payment info)?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Is this data encrypted at rest and in transit?"
  },
  {
    id: "pro8", section: "PROTECT", color: "green",
    question: "Does the frontend expose any sensitive logic, API keys, or internal data?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Describe what is exposed and whether steps have been taken to remove it."
  },
  {
    id: "pro9", section: "PROTECT", color: "green",
    question: "Have all developers received cybersecurity awareness training?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Are refresher sessions or code reviews conducted regularly? Who determines if best practices are being followed?",
    followUpNo: "Why not and are there plans to provide training?"
  },

  // DETECT
  {
    id: "det1", section: "DETECT", color: "orange",
    question: "Does your app have logging in place?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Who reviews logs and how often?",
    followUpNo: "Why not and what are the plans to implement logging?"
  },
  {
    id: "det2", section: "DETECT", color: "orange",
    question: "Is there monitoring or alerting set up for suspicious activity?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Have you tested your detection capabilities? What were the results?",
    followUpNo: "Why not and what are the plans to implement monitoring?"
  },
  {
    id: "det3", section: "DETECT", color: "orange",
    question: "Does your communication plan outline how to report suspicious activity?",
    type: "yesno",
    followUpOn: "no",
    followUpNo: "How is suspicious activity currently reported and who is responsible for acting on it?"
  },

  // RESPOND
  {
    id: "res1", section: "RESPOND", color: "red",
    question: "Is there a documented plan for responding to a cyberattack?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Has this plan been tested? Can you describe the results?",
    followUpNo: "Why not and what steps would currently be taken in the event of an attack?"
  },
  {
    id: "res2", section: "RESPOND", color: "red",
    question: "Does the response plan outline how to communicate internally and externally during a breach?",
    type: "yesno",
    followUpOn: "no",
    followUpNo: "How is communication currently handled during an incident?"
  },
  {
    id: "res3", section: "RESPOND", color: "red",
    question: "Has a cost-benefit analysis been done to determine what a breach would cost?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Is there a pre-approved process for negotiating with attackers or deciding whether to pay a ransom?"
  },
  {
    id: "res4", section: "RESPOND", color: "red",
    question: "Has your team consulted with any external cybersecurity advisors regarding your response plan?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Have you ever called on outside help in response to an actual attack? Describe what happened."
  },

  // RECOVER
  {
    id: "rec1", section: "RECOVER", color: "gray",
    question: "Is all app data securely backed up?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Where and how is it backed up? Who has access and how is that access controlled?",
    followUpNo: "Why not and what data is at risk if an attack occurs?"
  },
  {
    id: "rec2", section: "RECOVER", color: "gray",
    question: "Are there any systems or data that cannot be backed up?",
    type: "yesno",
    followUpOn: "yes",
    followUpYes: "Explain why these cannot be backed up and what the risk is if they are lost."
  },
  {
    id: "rec3", section: "RECOVER", color: "gray",
    question: "Is there a documented recovery plan to restore the app after an attack?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Has this plan been tested? What were the results?",
    followUpNo: "Why not and what steps would currently be taken to recover?"
  },
  {
    id: "rec4", section: "RECOVER", color: "gray",
    question: "Is there a formal incident review process to learn from security events?",
    type: "yesno",
    followUpOn: "both",
    followUpYes: "Does your team have cybersecurity insurance? Has it ever been used?",
    followUpNo: "Why not and how are lessons learned from past incidents?"
  },
]

const SECTION_COLORS = {
  blue: { badge: "bg-blue-900 text-blue-300", border: "border-blue-800" },
  yellow: { badge: "bg-yellow-900 text-yellow-300", border: "border-yellow-800" },
  green: { badge: "bg-green-900 text-green-300", border: "border-green-800" },
  orange: { badge: "bg-orange-900 text-orange-300", border: "border-orange-800" },
  red: { badge: "bg-red-900 text-red-300", border: "border-red-800" },
  gray: { badge: "bg-gray-700 text-gray-300", border: "border-gray-600" },
}

function getFollowUpText(question, answer) {
  if (!answer) return null
  const { followUpOn, followUpYes, followUpNo } = question
  if (followUpOn === "none") return null
  if (followUpOn === "both") return answer === "yes" ? followUpYes : followUpNo
  if (followUpOn === "yes" && answer === "yes") return followUpYes
  if (followUpOn === "no" && answer === "no") return followUpNo
  return null
}

function App() {
  const [screen, setScreen] = useState("landing")
  const [answers, setAnswers] = useState({})

  return (
    <div className="w-[400px] min-h-[500px] bg-gray-950 text-white font-sans">
      {screen === "landing" && (
        <LandingScreen onStart={() => setScreen("questionnaire")} />
      )}
      {screen === "questionnaire" && (
        <QuestionnaireScreen
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={() => setScreen("results")}
        />
      )}
      {screen === "results" && (
        <ResultsScreen
          answers={answers}
          onRestart={() => { setAnswers({}); setScreen("landing") }}
        />
      )}
    </div>
  )
}

function LandingScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center">
      <div className="text-4xl mb-4">🔐</div>
      <h1 className="text-2xl font-bold text-white mb-2">RiskAI-Scanner</h1>
      <p className="text-gray-400 text-sm mb-2">
        AI-powered security risk assessment for developers
      </p>
      <p className="text-gray-500 text-xs mb-8">
        Aligned with NIST CSF 2.0 & MIT Cybersecurity Framework
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
      >
        Start Assessment
      </button>
    </div>
  )
}

function QuestionnaireScreen({ answers, setAnswers, onSubmit }) {
  const [current, setCurrent] = useState(0)
  const question = QUESTIONS[current]
  const progress = Math.round((current / QUESTIONS.length) * 100)
  const colors = SECTION_COLORS[question.color]
  const currentAnswer = answers[question.id]?.answer
  const followUpText = getFollowUpText(question, currentAnswer)

  function handleAnswer(value) {
    setAnswers(prev => ({
      ...prev,
      [question.id]: { ...prev[question.id], answer: value, followUp: "" }
    }))
  }

  function handleFollowUp(value) {
    setAnswers(prev => ({
      ...prev,
      [question.id]: { ...prev[question.id], followUp: value }
    }))
  }

  function handleNext() {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1)
    } else {
      onSubmit()
    }
  }

  function handleBack() {
    if (current > 0) setCurrent(current - 1)
  }

  return (
    <div className="p-6 min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold text-white">Security Assessment</h2>
          <span className="text-gray-400 text-xs">{current + 1} / {QUESTIONS.length}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section Badge */}
      <span className={`text-xs font-semibold px-2 py-1 rounded w-fit mb-4 ${colors.badge}`}>
        {question.section}
      </span>

      {/* Question Card */}
      <div className={`border ${colors.border} rounded-lg p-4 mb-4 flex-1`}>
        <p className="text-white text-sm font-medium mb-4">{question.question}</p>

        {/* Yes/No */}
        {question.type === "yesno" && (
          <div className="flex gap-3 mb-4">
            {["yes", "no"].map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-colors duration-150
                  ${currentAnswer === opt
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
              >
                {opt === "yes" ? "✓ Yes" : "✗ No"}
              </button>
            ))}
          </div>
        )}

        {/* Select */}
        {question.type === "select" && (
          <div className="flex flex-col gap-2 mb-4">
            {question.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`w-full py-2 px-3 rounded-lg text-sm text-left border transition-colors duration-150
                  ${currentAnswer === opt
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Follow Up — only shown when triggered by answer */}
        {followUpText && (
          <div className="mt-2 border-t border-gray-700 pt-3">
            <p className="text-gray-400 text-xs mb-2">↳ {followUpText}</p>
            <textarea
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500"
              rows={3}
              placeholder="Provide details here..."
              value={answers[question.id]?.followUp || ""}
              onChange={e => handleFollowUp(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-2">
        {current > 0 && (
          <button
            onClick={handleBack}
            className="flex-1 py-2 rounded-lg text-sm font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-colors"
          >
            ← Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors
            ${currentAnswer
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
            }`}
        >
          {current === QUESTIONS.length - 1 ? "Run Assessment →" : "Next →"}
        </button>
      </div>
    </div>
  )
}

function ResultsScreen({ answers, onRestart }) {
  return (
    <div className="p-6 min-h-[500px] flex flex-col">
      <div className="text-2xl mb-3 text-center">⏳</div>
      <h2 className="text-lg font-bold text-white text-center mb-2">Assessment Complete</h2>
      <p className="text-gray-400 text-xs text-center mb-6">
        Your answers are ready to be analyzed. AI scoring coming soon.
      </p>
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6 flex-1 overflow-y-auto max-h-[300px]">
        <p className="text-gray-400 text-xs font-semibold mb-3">ANSWERS COLLECTED</p>
        {Object.entries(answers).map(([id, val]) => {
          const q = QUESTIONS.find(q => q.id === id)
          return (
            <div key={id} className="mb-3 border-b border-gray-800 pb-3 last:border-0 last:pb-0">
              <p className="text-gray-300 text-xs mb-1">{q?.question}</p>
              <span className={`text-xs font-bold ${val.answer === "yes" ? "text-green-400" : val.answer === "no" ? "text-red-400" : "text-blue-400"}`}>
                {val.answer}
              </span>
              {val.followUp && (
                <p className="text-gray-500 text-xs mt-1 italic">"{val.followUp}"</p>
              )}
            </div>
          )
        })}
      </div>
      <button
        onClick={onRestart}
        className="w-full py-2 rounded-lg text-sm font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-colors"
      >
        Start New Assessment
      </button>
    </div>
  )
}

export default App