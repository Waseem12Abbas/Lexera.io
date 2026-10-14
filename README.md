Markdown<div align="center">

  # 🎓 Lexera: ED-01 Adaptive Learning Path
  ### *Empowering Sindh Board Students through Personalized & Bilingual AI Learning Pathways*

  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-99.6%25-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Gemini 2.5 Flash](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-8E75B2?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

  [**Live App**](https://ai.studio/apps/959c8c90-acce-4ae9-b34e-bb3103d1ea6d?fullscreenApplet=true) • [**Presentation Deck**](Lexera_ED-01_Adaptive_Learning_Path.pptx) • [**Report Bug**](https://github.com/Waseem12Abbas/Lexera.io/issues)

</div>

---

## 🚨 The Problem

In regional education systems across Pakistan—specifically under the **Sindh Textbook Board (STBB)** curriculum—millions of students in Grades 9 through 12 encounter major hurdles:

1. **One-Size-Fits-All Pace:** Standard classrooms force all students into identical sequences regardless of individual mastery levels or knowledge gaps.
2. **Language Barrier:** Crucial learning materials are often locked behind complex English, creating comprehension hurdles for native Urdu speakers.
3. **Inefficient Study Habits:** Students waste scores of hours revising topics they already know while neglecting weak spots that cause mark loss in board examinations.

---

## 💡 The Solution: Lexera.io

**Lexera** is an AI-powered, bilingual (English & Urdu) adaptive learning platform designed specifically for Sindh Board students across Grades 9–12 (SSC & HSC) in both Pre-Engineering and Pre-Medical streams.

By pairing **adaptive knowledge assessments** with an **intelligent syllabus roadmap** and an integrated **Gemini 2.5 Flash AI Tutor**, Lexera dynamically transforms a static board syllabus into an interactive, personalized path to exam success.

---

## ✨ Key Features

- **🌐 Full English/Urdu Bilingual Interface:** Switch seamlessly between English and Urdu across all modules, lessons, and AI interactions.
- **🎯 Dynamic Adaptive Pathway Engine:** Diagnostic tests evaluate student mastery by topic; weak subjects are moved upfront while mastered topics unlock new milestones.
- **🤖 Dedicated AI Tutor (Powered by Gemini 2.5 Flash):** An instant academic assistant that delivers localized subject explanations and worked solutions securely via backend proxy endpoints.
- **📝 Sindh Board Simulator & Assessment Center:** Grade 9–12 subject-specific chapter quizzes, timed full-board mock exams, and proctoring checks.
- **📅 Smart Study Timetable Generator:** Automated weekly study scheduler offering custom strategies (*Board Exam Intensive*, *Balanced Routine*, *Weekend Deep-Dive*).
- **📊 Interactive Learning Analytics:** Live score reporting and progress visualization built using **Recharts**.

---

## 🔄 How the Roadmap Adapts

[ 1. Diagnostic Quiz ] 📊 ──> [ 2. Strengths & Gaps Identified ]│[ 5. Continuous Re-assessment ] <── [ 4. Targeted Practice ] <── [ 3. Personalized Sequence Generated ]
1. **Assess:** The student completes a short diagnostic or subject quiz.
2. **Identify:** Lexera identifies granular weak spots rather than just calculating a total percentage score.
3. **Adapt:** Low-scoring chapters move to the top of the roadmap; high-scoring chapters are marked as mastered.
4. **Practice & Tutor:** Worked examples and guided practice sessions help bridge the knowledge gap instantly.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI & Styling:** Tailwind CSS, Lucide React Icons
- **Data Visualization:** [Recharts](https://recharts.org/)
- **AI Core:** [Google Gemini 2.5 Flash API](https://deepmind.google/technologies/gemini/) (Hosted via server proxy for secure API key protection)
- **Backend:** Node.js / Express Server

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have Node.js (v18+) and npm/bun installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Waseem12Abbas/Lexera.io.git](https://github.com/Waseem12Abbas/Lexera.io.git)
   cd Lexera.io
Install dependencies:Bashnpm install
# or using Bun
bun install
Configure Environment Variables:Create a .env file in the root directory and add your Gemini API key:Code snippetGEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
Run the Development Server:Bashnpm run dev
# or
bun dev
Open in Browser:Navigate to (https://ai.studio/apps/959c8c90-acce-4ae9-b34e-bb3103d1ea6d?fullscreenApplet=true) to explore Lexera 
**.👥 The TeamTeam MemberRoleFocus Area 
Baqir Ali Kumbhar Team Leader Project Architecture, 
AI Integration & Product Strategy
Waseem Abbas Khaskheli Team LeaderFrontend Development, UI/UX Design & Adaptive Engine
Syed Azam Ali ShahTeam LeaderEducational Curriculum Alignment & System Engineering**
