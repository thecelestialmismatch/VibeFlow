export interface UserProfile {
  id: string;
  email: string | null;
  display_name: string | null;
  plan: 'free' | 'pro' | 'team' | 'business' | 'enterprise';
  team_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  enabled: boolean;
  sensitivity: 'low' | 'medium' | 'high';
  show_notifications: boolean;
  monitored_tools: string[];
  custom_patterns: CustomPattern[];
  whitelist: string[];
  updated_at: string;
}

export interface CustomPattern {
  id: string;
  name: string;
  regex: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  enabled: boolean;
}

export interface Team {
  id: string;
  name: string;
  owner_id: string;
  plan: 'team' | 'business' | 'enterprise';
  seat_limit: number;
  created_at: string;
}
