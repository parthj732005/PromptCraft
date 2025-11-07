<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1AkF4GjqUWrvAgtbMmWqwtGsOy0fW0g0b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


-----

\<div align="center"\>
\<img width="1200" height="475" alt="GHBanner" src="[https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)" /\>
\</div\>

\<h1 align="center"\>NeoCity Recruitment — Ghostwave\</h1\>

\<p align="center"\>
\<strong\>A single-page, static, immersive cyberpunk recruitment portal.\</strong\>
\</p\>

\<p align="center"\>
This project is a purely fictional and aesthetic experience, drawing users into the world of "Ghostwave." It features an immersive UI and a tactile mini-game that assigns the user a gang role based on their performance.
\</p\>

\<p align="center"\>
\<a href="[https://ai.studio/apps/drive/1AkF4GjqUWrvAgtbMmWqwtGsOy0fW0g0b](https://ai.studio/apps/drive/1AkF4GjqUWrvAgtbMmWqwtGsOy0fW0g0b)"\>\<strong\>View your app in AI Studio\</strong\>\</a\>
\</p\>

-----

## 🚀 Features

  * **Immersive Cyberpunk UI:** A rich, neon-drenched aesthetic with custom fonts (Orbitron, Fira Code), glow effects, scanlines, and glitch text animations to simulate a futuristic terminal.
  * **State-Driven App Flow:** A multi-stage user experience (Intro, Gate, Main, Hacking, Role Reveal) managed cleanly using React state and enums.
  * **Fluid Animations:** Built with **Framer Motion** to provide smooth, cinematic transitions and interactive effects between all application states.
  * **Interactive "Neon Runner" Game:** A fast-paced, 3-lane runner game built with HTML5 Canvas. Players must dodge obstacles and collect data tags to earn a score.
  * **Dynamic Role Assignment:** At the end of the game, users are assigned one of five unique cyberpunk roles based on their final score and survival time.
  * **WebGL Backgrounds:** Utilizes custom Three.js shaders for dynamic, generative backgrounds, including a `CyberneticGridShader` and a `NeonCrystalCity` environment.
  * **3D-Perspective Card Reveal:** The final role is revealed on a 3D-tilting card that reacts to mouse movement, built using Framer Motion's `useTransform` and `useMotionValue` hooks.

-----

## 🛠️ Tech Stack

This project is built with a modern, fast, and type-safe web stack:

  * **Vite:** Next-generation frontend tooling for blazing fast development and optimized builds.
  * **React:** The core library for building the component-based user interface.
  * **TypeScript:** For static typing, leading to more robust and maintainable code.
  * **Framer Motion:** A powerful motion library for React to create fluid animations.
  * **Three.js:** Used for the WebGL-based shader backgrounds.
  * **Tailwind CSS:** A utility-first CSS framework used for styling (loaded via CDN).

-----

## 🖥️ Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/)

1.  **Install dependencies:**

    ```sh
    npm install
    ```

2.  **Set the `GEMINI_API_KEY`** in `.env.local` to your Gemini API key. (Note: This key is defined in the Vite config but not actively used in the current game logic).

3.  **Run the app:**

    ```sh
    npm run dev
    ```

This will start the Vite development server, typically on `http://localhost:3000`.

-----

## 🌊 Application Flow

The user's journey is managed by a central state machine in `App.tsx`. The flow proceeds through five distinct stages:

1.  **`AppState.Intro`:** The application starts with the `IntroSequence` component. This plays a series of timed animations, including a "retinal scanner" and a typing text effect, to set the mood. On completion, it transitions to the `Gate` state.
2.  **`AppState.Gate`:** The `GateScreen` is displayed. This screen presents the project title and a "SECURE GATE" with a "BREACH" button. Clicking this button triggers the `handleBreach` callback and moves to the `Main` state.
3.  **`AppState.Main`:** The user sees the `MainInterface`. This component displays the "GHOSTWAVE MANIFESTO" (lore text from `constants.ts`) and a "JACK IN" button. Clicking this button transitions to the `Hacking` state.
4.  **`AppState.Hacking`:** The `GameScreen` component is rendered. This screen first shows an intro with the game's title, "NEON RUNNER," and an "INITIATE RUN" button. Once clicked, the `NeonRunnerGame` itself is mounted and the mini-game begins.
5.  **`AppState.RoleReveal`:** When the player fails in the game, `NeonRunnerGame` calls its `onComplete` prop with the final score and time. `GameScreen` then calculates the role and stats and calls its *own* `onComplete` prop. This triggers `App.tsx` to move to the `RoleReveal` state, displaying the `RoleReveal` component with the assigned role and performance metrics.

-----

## 👾 In-Depth: "Neon Runner" Game Mechanics

The core of this project is the `NeonRunnerGame`, a mini-game built using the HTML5 Canvas API. The `App.tsx` loads `GameScreen`, which in turn loads `NeonRunnerGame`.

*(Note: The repository also contains a `HackingTerminal.tsx` file, a typing-based game. This component is **not used** in the current application flow.)*

### 1\. Game Objective

The game is an infinite runner viewed from a 2D top-down perspective, set against the `NeonCrystalCity` shader background.

  * **The Player:** Represented by a cyan triangle.
  * **Collectibles:** Yellow circles ("tags"). Collecting one adds **+10 to the score**.
  * **Obstacles:** Red rectangles ("blocks"). Colliding with one **ends the game**.

### 2\. Controls

The game world is divided into three vertical lanes (0, 1, and 2). The player can move between these lanes by clicking or tapping on the corresponding third of the screen. A `pointerdown` event listener calculates which lane was clicked and updates the player's `lane` state.

### 3\. Difficulty Scaling

The game's difficulty increases progressively over time:

  * **Speed:** Obstacles and tags move down the screen at an increasing speed. The speed starts at 300px/sec and increases based on the time elapsed since the game started (`speedRef.current = 300 + (now - startTime.current) / 150`).
  * **Spawning:** The time interval between new obstacle spawns decreases as the game progresses (`spawnInterval = Math.max(200, 600 - (now - startTime.current) / 200)`).

### 4\. How Your Role is Assigned

When the game ends, the `NeonRunnerGame` component passes the final `score` and `timeSurvived` (in seconds) to the `GameScreen` component.

`GameScreen` then uses the `getRoleForScore` function from `constants.ts` to determine your role.

Here is the exact assignment logic:

1.  **Tech Runner:** Assigned if `score >= 150`.

      * *Description:* "You're a blur of chrome and code... For you, speed is everything."

2.  **Data Ghost:** Assigned if `score >= 80` AND `time > 20`.

      * *Description:* "Precision is your art form... You leave no trace..."

3.  **Infiltrator:** Assigned if `score >= 40`.

      * *Description:* "A balanced phantom of the new age. You possess a versatile skill set..."

4.  **Shadow Courier:** Assigned if `score > 0`.

      * *Description:* "You're messy, chaotic, but undeniably effective."

5.  **Cyber Bruiser:** This is the default role, assigned if `score` is 0.

      * *Description:* "You prefer a direct approach... You overwhelm systems with raw, unfiltered input..."

These stats (score, time, and tags collected) are then passed to the `RoleReveal` component to be displayed to the user.
