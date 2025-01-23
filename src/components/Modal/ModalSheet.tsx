import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import ModalBackdrop from './ModalBackdrop'
import { Portal } from '@gorhom/portal'
import { StyleSheet, View } from 'react-native'
import { PropsWithChildren } from 'react'
import { useUIContext } from '@/src/context/UIStateProvider'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'

export type ModalName = 'modal-test'

type Props = PropsWithChildren<{
  name: ModalName
}>

export default function ModalSheet({ name, children }: Props) {
  const { activeModalName, setActiveModalName } = useUIContext()
  const { bottom: bottomInset } = useSafeAreaInsets()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const onBackdropPress = () => {
    bottomSheetModalRef.current?.close()
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <ModalBackdrop {...props} onPress={onBackdropPress} />,
    [],
  )

  const contentContainerStyle = useMemo(
    () => ({
      ...styles.contentContainer,
      paddingBottom: bottomInset,
    }),
    [bottomInset],
  )

  useEffect(() => {
    if (name !== activeModalName) {
      bottomSheetModalRef.current?.close()
    } else {
      bottomSheetModalRef.current?.present()
    }
  }, [activeModalName, setActiveModalName, name])

  const onDismiss = () => {
    setActiveModalName?.(undefined)
  }

  return (
    <Portal hostName="modal">
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          backdropComponent={renderBackdrop}
          onDismiss={onDismiss}
        >
          <BottomSheetView style={contentContainerStyle}>
            <View style={styles.modalContent}>{children}</View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  modalContent: {
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
})
