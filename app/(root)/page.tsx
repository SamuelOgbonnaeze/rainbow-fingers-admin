"use client"

import { Modal } from "@/components/ui/modal";


const SetupPage = () => {
  return (
    <div>
      <Modal title="Test" description="Description" isOpen onClose={() => { }}>
        Children
      </Modal>
    </div>
  );
}

export default SetupPage;