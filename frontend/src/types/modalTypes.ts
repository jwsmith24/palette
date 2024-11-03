/**
 * Define modal choice types
 */
export interface ModalChoice {
  label: string;
  action: () => Promise<void>;
}
