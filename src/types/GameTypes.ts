export interface ModalData {
  title: string;
  type: 'code' | 'resume' | 'contact' | 'skills' | 'oracle';
  content?: any;
}

export interface ZoneConfig {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  modalData: ModalData;
}

declare global {
  interface Window {
    showPortfolioModal: (data: ModalData) => void;
  }
}