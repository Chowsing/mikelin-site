import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { stringify } from 'yaml';

const root = path.resolve('/root/mikelin-site');
const sourceDir = path.join(root, 'tmp-source');
const dataDir = path.join(root, 'src', 'data');

fs.mkdirSync(dataDir, { recursive: true });

const cleanText = (value) =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s*([,.:;])\s*/g, '$1 ')
    .replace(/\s+([)\]])/g, '$1')
    .replace(/([([\]])\s+/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

const cleanCitation = (value) =>
  cleanText(value)
    .replace(/C\.\s-\s?S\./g, 'C.-S.')
    .replace(/R\.\s-\s?H\./g, 'R.-H.')
    .replace(/W\.\s-\s?T\./g, 'W.-T.')
    .replace(/F\.\s-\s?Z\./g, 'F.-Z.')
    .replace(/Y\.\s-\s?C\./g, 'Y.-C.')
    .replace(/T\.\s-\s?Y\./g, 'T.-Y.')
    .replace(/C\.\s-\s?C\./g, 'C.-C.')
    .replace(/C\.\s-\s?J\./g, 'C.-J.')
    .replace(/H\.\s264/g, 'H.264')
    .replace(/10\.\s+(\d)/g, '10.$1')
    .replace(/0\.\s+(\d)/g, '0.$1')
    .replace(/\?+/g, '')
    .replace(/\s+,/g, ',')
    .replace(/\s+\./g, '.')
    .replace(/,\s*”/g, ', ”')
    .replace(/”Journal/g, '” Journal')
    .replace(/vol\.\s(\d+)\.\sno\./g, 'vol. $1, no.')
    .replace(/pp\s(\d)/g, 'pp. $1')
    .replace(/Page\s/g, 'pp. ')
    .replace(/\bVolume\b/g, 'vol.')
    .replace(/\bIssue\b/g, 'issue')
    .replace(/\.\s*\(SCI, EI\)\./g, ' (SCI, EI).')
    .replace(/\s+/g, ' ')
    .trim();

const cleanAwardText = (value) =>
  cleanText(value)
    .replace(/組系統名稱[:：]/g, '組 系統名稱：')
    .replace(/競賽系統名稱[:：]/g, '競賽 系統名稱：')
    .replace(/\s*系統名稱[:：]\s*/g, ' 系統名稱：')
    .replace(/\s*論文題目[:：]\s*/g, ' 論文題目：')
    .replace(/\s*專題題目[:：]\s*/g, ' 專題題目：')
    .replace(/整合型整合型/g, '整合型')
    .replace(/C#\.\s?net/gi, 'C#.net')
    .replace(/Java 2 Platform 1\.\s4/g, 'Java 2 Platform 1.4')
    .replace(/2007\/10NTV/g, '2007/10 NTV')
    .replace(/2006\/10開放式/g, '2006/10 開放式')
    .replace(/Linux 黃金企鵝獎專題題目/g, 'Linux 黃金企鵝獎 專題題目')
    .replace(/94年12月專題題目/g, '94年12月 專題題目')
    .replace(/93年12月專題題目/g, '93年12月 專題題目')
    .replace(/92年12月專題題目/g, '92年12月 專題題目')
    .replace(/92年8月專題題目/g, '92年8月 專題題目')
    .replace(/90年12月專題題目/g, '90年12月 專題題目')
    .replace(/\s+/g, ' ')
    .trim();

const getYear = (text) => {
  const westernYears = [...text.matchAll(/\b(19|20)\d{2}\b/g)].map((match) => Number(match[0]));
  if (westernYears.length > 0) return Math.max(...westernYears);

  const rocYears = [...text.matchAll(/\b(9\d|1[01]\d|12\d)\b/g)]
    .map((match) => Number(match[0]))
    .filter((year) => year >= 90 && year <= 125)
    .map((year) => year + 1911);

  return rocYears.length > 0 ? Math.max(...rocYears) : null;
};

const getStartYear = (text) => {
  const westernYear = text.match(/\b(19|20)\d{2}\b/);
  if (westernYear) return Number(westernYear[0]);

  const rocYear = text.match(/\b(9\d|1[01]\d|12\d)\b/);
  if (rocYear) return Number(rocYear[0]) + 1911;

  return getYear(text);
};

const getPublicationTitle = (citation) => {
  const titleMatch = citation.match(/[“\"]([^”\"]+)[”\"]/);
  return titleMatch ? cleanText(titleMatch[1]).toLowerCase() : '';
};

const publicationScore = (citation) => {
  let score = citation.length;
  if (/published on line|to be published|accepted\.?/i.test(citation)) score -= 1000;
  if (/doi:/i.test(citation)) score += 50;
  if (/\bvol\.|pp\.|issue\b/i.test(citation)) score += 20;
  return score;
};

const readHtml = (fileName) =>
  fs.readFileSync(path.join(sourceDir, fileName), 'utf8').replace(/^\uFEFF/, '');

const parseList = (fileName) => {
  const $ = cheerio.load(readHtml(fileName));
  const sections = [];

  $('h3').each((_, heading) => {
    const title = cleanText($(heading).text());
    const list = $(heading).nextAll('ol').first();
    if (!title || !list.length) return;

    const items = [];
    list.children('li').each((__, item) => {
      const raw = cleanText($(item).text());
      if (raw) items.push(raw);
    });

    sections.push({ title, items });
  });

  return sections;
};

const index$ = cheerio.load(readHtml('index.html'));
const profile = {
  nameZh: cleanText(index$('h1').first().text()),
  nameEn: cleanText(index$('h3').eq(1).text()),
  photo: '/images/profile.jpg',
  emailImage: '/images/email.png',
  lastUpdated: '2025-08-08',
  office: '',
  extension: '',
  fax: '',
  title: '',
  education: '',
  researchSummary: [],
  courseSummary: [],
  links: [
    {
      label: 'Data Systems Laboratory@FB',
      url: 'https://www.facebook.com/pages/Data-Systems-Lab/344107525681540',
    },
  ],
};

index$('table tr').each((_, row) => {
  const key = cleanText(index$(row).find('th').text());
  const value = cleanText(index$(row).find('td').text());

  if (key === '職稱') profile.title = value;
  if (key === '研究室') profile.office = value;
  if (key === '分機') profile.extension = value;
  if (key === '傳真') profile.fax = value;
  if (key === '學歷') profile.education = value;
  if (key === '研究興趣') profile.researchSummary = value.split('、').map((item) => item.trim()).filter(Boolean);
  if (key === '教授課程') profile.courseSummary = value.split('、').map((item) => item.trim()).filter(Boolean);
});

const courseSections = parseList('course.html');
const courses = courseSections.flatMap((section) =>
  section.items.map((item) => {
    const match = item.match(/^(.*?)\s*\((.*)\)$/);
    return {
      level: section.title,
      titleZh: match ? cleanText(match[1]) : item,
      titleEn: match ? cleanText(match[2]) : '',
    };
  }),
);

const researchSections = parseList('research.html');
const researchInterests = researchSections.find((section) => section.title === '研究興趣')?.items ?? [];
const projectCategoryMap = new Map([
  ['教育部研究計畫', '教育部研究計畫'],
  ['國科會研究計劃', '國科會研究計畫'],
  ['大專生科技研究計劃', '大專生科技研究計畫'],
  ['產學合作計劃案', '產學合作計畫'],
]);

const projectItems = researchSections
  .filter((section) => projectCategoryMap.has(section.title))
  .flatMap((section) =>
    section.items.map((item) => {
      const parts = item.split(/ (?=執行期限[:：]|補助單位[:：]|委託廠商[:：]|合作廠商[:：]|主題[:：]|計畫編號[:：]|計劃編號[:：]|職稱[:：])/);
      const record = {
        category: projectCategoryMap.get(section.title),
        title: cleanText(parts[0]),
        year: null,
      };

      for (const part of parts.slice(1)) {
        const [label, ...rest] = part.split(/[:：]/);
        const value = cleanText(rest.join(':'));
        if (!value) continue;
        if (label.includes('執行期限')) record.period = value;
        if (label.includes('補助單位')) record.sponsor = value;
        if (label.includes('委託廠商') || label.includes('合作廠商')) record.partner = value;
        if (label.includes('主題')) record.topic = value;
        if (label.includes('計畫編號') || label.includes('計劃編號')) record.projectNumber = value;
        if (label.includes('職稱')) record.role = value;
      }

      record.year = getStartYear(`${record.title} ${record.period ?? ''}`);
      return record;
    }),
  )
  .filter((item, index, list) => list.findIndex((candidate) => candidate.category === item.category && candidate.title === item.title && candidate.period === item.period) === index)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const publicationSections = parseList('publication.html');
const publicationTypeMap = new Map([
  ['期刊論文', 'journal'],
  ['研討會論文', 'conference'],
  ['專書論文', 'book'],
]);

const publicationMap = publicationSections
  .filter((section) => publicationTypeMap.has(section.title))
  .flatMap((section) =>
    section.items.map((citation) => ({
      type: publicationTypeMap.get(section.title),
      year: getYear(citation),
      citation: cleanCitation(citation),
    })),
  )
  .filter((item, index, list) => list.findIndex((candidate) => candidate.type === item.type && candidate.citation === item.citation) === index)
  .reduce((accumulator, item) => {
    const key = `${item.type}:${getPublicationTitle(item.citation) || item.citation.toLowerCase()}`;
    const existing = accumulator.get(key);
    if (!existing || publicationScore(item.citation) > publicationScore(existing.citation)) {
      accumulator.set(key, item);
    }
    return accumulator;
  }, new Map())
;

const publicationList = Array.from(publicationMap.values()).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const serviceSections = parseList('services.html');
const services = serviceSections
  .flatMap((section) =>
    section.items.map((item) => {
      const delimiter = item.includes('：') ? '：' : item.includes('，') ? '，' : item.includes(',') ? ',' : '';
      const splitIndex = delimiter ? item.indexOf(delimiter) : -1;
      const role = splitIndex > 0 && splitIndex < 40 ? cleanText(item.slice(0, splitIndex)) : '';
      const description = splitIndex > 0 && splitIndex < 40 ? cleanText(item.slice(splitIndex + 1)) : item;
      return {
        category: section.title,
        year: getYear(item),
        role,
        description,
        fullText: item,
      };
    }),
  )
  .filter((item, index, list) => list.findIndex((candidate) => candidate.category === item.category && candidate.fullText === item.fullText) === index)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const awardSections = parseList('awards.html');
const awards = awardSections
  .flatMap((section) =>
    section.items.map((item) => ({
      category: section.title,
      year: getYear(item),
      text: cleanAwardText(item),
    })),
  )
  .filter((item, index, list) => list.findIndex((candidate) => candidate.category === item.category && candidate.text === item.text) === index)
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

const writeYaml = (fileName, value) => {
  fs.writeFileSync(path.join(dataDir, fileName), stringify(value), 'utf8');
};

writeYaml('profile.yaml', profile);
writeYaml('research-interests.yaml', researchInterests);
writeYaml('research-projects.yaml', projectItems);
writeYaml('courses.yaml', courses);
writeYaml('publications.yaml', publicationList);
writeYaml('services.yaml', services);
writeYaml('awards.yaml', awards);
