import { Role, PerformanceStats } from './types';
import { TechRunnerIcon } from './components/icons/TechRunnerIcon';
import { DataGhostIcon } from './components/icons/DataGhostIcon';
import { InfiltratorIcon } from './components/icons/InfiltratorIcon';
import { ShadowCourierIcon } from './components/icons/ShadowCourierIcon';
import { CyberBruiserIcon } from './components/icons/CyberBruiserIcon';

export const TOTAL_ROUNDS = 3;
export const ROUND_TIME_SECONDS = 15;

export const COMMAND_SEQUENCES = [
  // Round 1
  [
    "INIT_GHOSTWAVE_77",
    "0xDEADBEEF",
    "BYPASS_ICE_v2.1",
  ],
  // Round 2
  [
    "DECRYPT_PAYLOAD:NEON.DAT",
    "1011010011010001",
    "EXEC_OVERRIDE_AUTH",
  ],
  // Round 3
  [
    "PURGE_LOGS::SHADOW_PROTOCOL",
    "INJECT_ROOTKIT.SIG",
    "001_ECHO_ZERO_COMPLETE",
  ],
];

export const LORE_TEXT = "In the perpetual twilight of NeoCity, under the ceaseless hum of neon signs and the watchful eyes of corporate sentinels, we are the glitch in the system. Ghostwave isn't just a crew; it's a current, an undercurrent pulling the strings from the shadows. We trade in secrets, data, and rebellion. Your keyboard is a weapon, your code is a key. Show us you can keep up, or be washed away by the data stream.";

export const ROLES: { [key: string]: Role } = {
  TECH_RUNNER: {
    title: 'Tech Runner',
    description: "You're a blur of chrome and code, moving through the net with unmatched velocity. For you, speed is everything. Data heists, rapid deployments, and high-speed escapes are your specialty. You hit hard and vanish before the alarms even sound.",
    icon: TechRunnerIcon,
  },
  DATA_GHOST: {
    title: 'Data Ghost',
    description: "Precision is your art form. Every keystroke is deliberate, every line of code flawless. You're a whisper in the machine, an unseen force that alters data streams with surgical accuracy. You leave no trace, only the perfectly executed outcome of your will.",
    icon: DataGhostIcon,
  },
  INFILTRATOR: {
    title: 'Infiltrator',
    description: 'A balanced phantom of the new age. You possess a versatile skill set, blending speed and precision to adapt to any challenge. You can crack the safe or blow the door, making you a reliable and unpredictable operative in any scenario.',
    icon: InfiltratorIcon,
  },
  SHADOW_COURIER: {
    title: 'Shadow Courier',
    description: "You're messy, chaotic, but undeniably effective. You get the package from A to B, even if it means breaking a few things along the way. Your methods are unorthodox, but your determination to see the job through is unquestionable.",
    icon: ShadowCourierIcon,
  },
  CYBER_BRUISER: {
    title: 'Cyber Bruiser',
    description: 'You prefer a direct approach. Why pick a lock when you have a digital sledgehammer? You overwhelm systems with raw, unfiltered input, a storm of commands that shatters firewalls through sheer force. Your technique lacks finesse, but its power is undeniable.',
    icon: CyberBruiserIcon,
  },
};

export const getRoleForStats = (stats: PerformanceStats): Role => {
  if (stats.avgSpeed > 10 && stats.accuracy > 95) {
    return ROLES.TECH_RUNNER;
  }
  if (stats.accuracy > 97) {
    return ROLES.DATA_GHOST;
  }
  if (stats.avgSpeed > 6 && stats.accuracy > 85) {
    return ROLES.INFILTRATOR;
  }
  if (stats.mistakes > 8) {
    return ROLES.SHADOW_COURIER;
  }
  return ROLES.CYBER_BRUISER;
};

export const getRoleForScore = (score: number, time: number): Role => {
  if (score >= 150) {
    return ROLES.TECH_RUNNER;
  }
  if (score >= 80 && time > 20) {
    return ROLES.DATA_GHOST;
  }
  if (score >= 40) {
    return ROLES.INFILTRATOR;
  }
  if (score > 0) {
    return ROLES.SHADOW_COURIER;
  }
  return ROLES.CYBER_BRUISER;
};