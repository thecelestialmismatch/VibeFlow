export interface LeakEvent {
  id: string;
  user_id: string | null;
  team_id: string | null;
  tool_name: string;
  leak_types: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  action: 'blocked' | 'warned' | 'allowed';
  extension_version: string | null;
  created_at: string;
}

export interface LeakEventInsert {
  user_id?: string;
  team_id?: string;
  tool_name: string;
  leak_types: string[];
  severity: LeakEvent['severity'];
  action: LeakEvent['action'];
  extension_version?: string;
}
