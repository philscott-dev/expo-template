import { create } from 'zustand'
import { ModalName } from '@/src/components/Modal/ModalSheet'

interface ModalState {
  activeModalName?: ModalName
  setActiveModalName?: (name: ModalName) => void
}

export const useModalStore = create<ModalState>((set) => ({
  activeModalName: undefined,
  setActiveModalName: (name) => set(() => ({ activeModalName: name })),
}))
