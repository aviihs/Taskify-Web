import { MouseEventHandler, ReactNode } from "react";

import Modal from "@/components/common/Modal";

interface IPromptDialogProps {
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
}: IPromptDialogProps) {
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
