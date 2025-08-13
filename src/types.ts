export interface GameMode {
  id: number;
  Name: string;
  Variation: number;
  Disabled: boolean;
  ShortName: string;
  Color: string;
  BgColor: string;
  TeamSize: number;
  TeamCount: number;
}
export interface GameMap {
  id: number;
  Name: string;
  Disabled: boolean;
  LocationTheme: string;
  GameModeVariation: string;
  Map: string;
  TrainingGroundsEnabled: boolean;
}