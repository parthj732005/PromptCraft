import React from 'react';

export enum AppState {
  Intro,
  Gate,
  Main,
  Hacking,
  RoleReveal,
}

export enum GameStatus {
  Ready,
  InProgress,
  Success,
  Failed,
  Finished,
}

export interface Role {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface PerformanceStats {
  accuracy: number;
  avgSpeed: number; // Chars per second
  mistakes: number;
  score?: number;
  time?: number;
  tags?: number;
}