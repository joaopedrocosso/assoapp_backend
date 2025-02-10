export enum EventENUM {
  assembleiaGeral = "Assembleia geral",
  reuniaoCA = "Reunião do conselho administrativo",
  conecteEReconecte = "Conecte e Reconecte-se",
  briefings = "Briefings",
  debatesWebnarios = "Debates & Webnários",
  internacionais = "Internacionais",
  outrosNacionais = "Outros nacionais",
}

export interface EventType {
  title: EventENUM;
  titleDescription: string | null;
  date: Date;
}
