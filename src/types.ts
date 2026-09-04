export type ActiveTab = 'overview' | 'modules' | 'clash-simulator' | 'worksharing' | 'glossary' | 'assessment' | 'certificate';

export type Discipline = 'all' | 'arch' | 'struct' | 'mep';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface ScenarioOption {
  text: string;
  consequence: string;
  isOptimal: boolean;
  scoreAwarded: number;
}

export interface ScenarioChallenge {
  id: string;
  title: string;
  roleContext: string;
  dilemma: string;
  options: ScenarioOption[];
  industryStandardReference: string;
}

export interface LessonSection {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  keyTakeaways: string[];
  proTip?: string;
  watchOutWarning?: string;
  diagramType?: 'cde_lifecycle' | 'dimensions' | 'element_hierarchy' | 'coordination_matrix' | 'lod_comparison';
}

export interface BIMModule {
  id: string;
  number: number;
  title: string;
  tagline: string;
  readTime: string;
  iconName: string;
  color: string;
  summary: string;
  sections: LessonSection[];
  quiz: QuizQuestion[];
  scenario: ScenarioChallenge;
}

export type TermCategory = 'Standards & Process' | 'Modeling & Software' | 'Coordination & Clashes' | 'Data & Formats';

export interface GlossaryTerm {
  id: string;
  term: string;
  acronym?: string;
  category: TermCategory;
  definition: string;
  realWorldExample: string;
  interviewTip: string;
  relatedTerms: string[];
}

export interface UserProgress {
  candidateName: string;
  completedModules: string[];
  quizScores: Record<string, number>; // moduleId -> percentage score (0-100)
  completedScenarios: Record<string, number>; // scenarioId -> score (0-100)
  masteredTerms: string[];
  simulationsCompleted: {
    clashRun: boolean;
    clashResolved: boolean;
    lodExplored: boolean;
    worksharingSynced: boolean;
  };
  lastActiveDate: string;
}

export interface ClashItem {
  id: string;
  title: string;
  disciplineA: 'Structure' | 'Architecture' | 'MEP';
  itemA: string;
  disciplineB: 'Structure' | 'Architecture' | 'MEP';
  itemB: string;
  type: 'Hard Clash' | 'Clearance / Soft Clash' | 'Workflow / 4D';
  severity: 'Critical' | 'High' | 'Medium';
  status: 'New' | 'Reviewed' | 'Resolved';
  resolutionNote?: string;
  recommendedAction: string;
  location: string;
  bcfGuid: string;
}

export interface LODData {
  level: number;
  name: string;
  definition: string;
  geometryExample: string;
  dataIncluded: string[];
  primaryUse: string;
  projectStage: string;
}
