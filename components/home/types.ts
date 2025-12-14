export interface TechItem {
  name: string;
  icon: React.ReactNode;
  color: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface LearningModule {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge: string;
  color: string;
  bgColor: string;
  iconColor: string;
  buttonColor: string;
}
