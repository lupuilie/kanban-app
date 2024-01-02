import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export type UseDialogProps = {
  initialOpen?: boolean;
  onCloseNavigateBack?: boolean;
  onCloseEnableBodyPointerEvents?: boolean;
  onOpenChange?: (newOpen: boolean) => void;
};

export const useDialog = (props?: UseDialogProps) => {
  const {
    initialOpen,
    onCloseNavigateBack = true,
    onCloseEnableBodyPointerEvents = false,
    onOpenChange,
  } = { ...props };

  const router = useRouter();
  const [open, setOpen] = useState(initialOpen ?? false);

  const handleOnOpenChanged = useCallback(
    (newOpen: boolean) => {
      onOpenChange?.(newOpen);
      setOpen(newOpen);

      if (onCloseNavigateBack && newOpen === false) {
        router.back();
      }
      if (onCloseEnableBodyPointerEvents && newOpen === false) {
        removeBodyPointerEvents();
      }
    },
    [onCloseEnableBodyPointerEvents, onCloseNavigateBack, router, onOpenChange],
  );

  return {
    open,
    onOpenChange: handleOnOpenChanged,
  };
};

function removeBodyPointerEvents() {
  setTimeout(() => {
    document.body.style.removeProperty('pointer-events');
  }, 100);
}
