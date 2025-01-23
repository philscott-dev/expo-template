import { create } from 'zustand'
import { ModalName } from '@/src/components/Modal/ModalSheet'

interface ModalState {
  activeModalName?: ModalName
  setActiveModalName?: (name: ModalName) => void
}

export const useModalStore = create<ModalState>((set) => ({
  count: 0,
  setActiveModalName: (name) => set(() => ({ activeModalName: name })),
}))
