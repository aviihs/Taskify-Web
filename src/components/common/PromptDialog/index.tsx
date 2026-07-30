import { MouseEventHandler, ReactNode } from "react";

import Modal from "@/components/common/Modal";

interface PromptDialogProps {
  title: string;
  iconName?: string;
  show: boolean;
  onClose: MouseEventHandler;
  children: ReactNode;
}

export default function PromptDialog({
  title = "",
  iconName,
  show = false,
  onClose = () => {},
  children,
}: PromptDialogProps) {
  return (
    <Modal
      show={show}
      Icon={iconName}
      title={title}
      onClose={onClose}
      zIndex={111111}
    >
      {children}
    </Modal>
  );
}
