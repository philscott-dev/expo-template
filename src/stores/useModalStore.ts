import { create } from 'zustand'
import { ModalName } from '@/src/components/Modal/ModalSheet'

interface ModalState {
  activeModalName?: ModalName
  showModal: (name: ModalName) => void
  hideModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  activeModalName: undefined,
  showModal: (name) => set(() => ({ activeModalName: name })),
  hideModal: () => set(() => ({ activeModalName: undefined })),
}))
