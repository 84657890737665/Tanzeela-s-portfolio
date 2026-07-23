/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon name matching lucide-react dynamically or specifically mapped
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
}

export interface TerminalEntry {
  id: string;
  type: "input" | "output" | "system";
  text: string;
}

export interface DiagnosticStat {
  label: string;
  value: string;
  description: string;
}
