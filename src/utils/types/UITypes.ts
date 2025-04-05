export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';
export interface GameState {
  userId: string | null;
  username: string;
  toast: {
    open: boolean;
    message: string;
    severity: ToastSeverity;
  };
  isLoading: boolean;
}


export type UIAction =
  | { type: 'SET_USER';   payload: { userId: string; username: string };}
  | { type: 'CLEAR_USER' }
  | { type: 'SHOW_TOAST'; payload: { message: string; severity: ToastSeverity } }
  | { type: 'HIDE_TOAST' } | {type: 'LOADING', payload: boolean}
