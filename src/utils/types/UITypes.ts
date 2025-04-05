export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';
export interface GameState {
  userId: string | null;
  toast: {
    open: boolean;
    message: string;
    severity: ToastSeverity;
  };
  isLoading: boolean;
  playerName: string | null;
}

export type UIAction =
  | { type: 'SET_USER'; payload: string }
  | { type: 'CLEAR_USER' }
  | { type: 'SHOW_TOAST'; payload: { message: string; severity: ToastSeverity } }
  | { type: 'HIDE_TOAST' } | {type: 'LOADING', payload: boolean}
