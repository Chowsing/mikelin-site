import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

type Profile = {
  nameZh: string;
  nameEn: string;
  photo: string;
  emailImage: string;
  lastUpdated: string;
  office: string;
  extension: string;
  fax: string;
  title: string;
  education: string;
  summary: string;
  researchSummary: string[];
  courseSummary: string[];
  links: Array<{ label: string; url: string }>;
};

export type ResearchProject = {
  category: string;
  title: string;
  year: number;
  period?: string;
  sponsor?: string;
  partner?: string;
  role?: string;
  topic?: string;
  projectNumber?: string;
};

export type Publication = {
  type: 'journal' | 'conference' | 'book';
  year: number;
  citation: string;
};

export type Course = {
  level: string;
  titleZh: string;
  titleEn: string;
};

export type Service = {
  category: string;
  year: number;
  role?: string;
  description: string;
  fullText: string;
};

export type Award = {
  category: string;
  year: number;
  text: string;
};

const dataDir = path.resolve('src/data');

function readYaml<T>(fileName: string): T {
  const file = fs.readFileSync(path.join(dataDir, fileName), 'utf8');
  return parse(file) as T;
}

export const siteMeta = {
  siteName: '林朝興教授個人網站',
  titleSuffix: '林朝興教授個人網站',
  description:
    '國立臺南大學資訊工程學系林朝興教授個人網站，整理研究計畫、論文發表、教學課程、學術服務與獲獎紀錄。',
  accent: '#16324f',
  labUrl: 'https://www.facebook.com/DSLab.tw/',
};

export function getProfile() {
  return readYaml<Profile>('profile.yaml');
}

export function getResearchInterests() {
  return readYaml<string[]>('research-interests.yaml');
}

export function getResearchProjects() {
  return readYaml<ResearchProject[]>('research-projects.yaml');
}

export function getPublications() {
  return readYaml<Publication[]>('publications.yaml');
}

export function getCourses() {
  return readYaml<Course[]>('courses.yaml');
}

export function getServices() {
  return readYaml<Service[]>('services.yaml');
}

export function getAwards() {
  return readYaml<Award[]>('awards.yaml');
}

export function groupBy<T, K extends PropertyKey>(items: T[], getKey: (item: T) => K) {
  return items.reduce((groups, item) => {
    const key = getKey(item);
    groups[key] ??= [];
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function mergePreferredOrder<T extends string>(preferred: T[], actual: Iterable<string>) {
  const extras = Array.from(new Set(actual)).filter((item) => !preferred.includes(item as T)).sort();
  return [...preferred.filter((item) => extras.indexOf(item) === -1), ...extras];
}
