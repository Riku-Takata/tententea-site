import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen2: boolean;
  onClose2: () => void;
}

export default function ModalOut({ isOpen2, onClose2 }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose2();
      }
    };

    if (isOpen2) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen2, onClose2]);

  if (!isOpen2) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[85%] md:w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">お飲み物やジェラートのみのお客様</h3>
          <button
            onClick={onClose2}
            className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-base leading-relaxed text-gray-500">
            レジ前のメニューやショーケースからご注文をお選びいただきます。
          </p>
          <p className="text-base leading-relaxed text-gray-500">
            お会計はご注文を提供させていただく前にお支払いいただきます。
          </p>
        </div>
      </div>
    </div>
  );
}
