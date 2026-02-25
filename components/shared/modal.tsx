import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { X } from 'lucide-react';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  children: ReactNode;
  reset?: () => void;
}

export function Modal({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  reset = () => {},
}: ModalProps) {
  const handleClose = () => {
    setIsOpen(false);
    if (reset) reset();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={handleClose} className='relative z-50'>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        </TransitionChild>

        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <DialogPanel className='flex flex-col w-full max-w-xl max-h-[90vh] border border-gray-400 bg-white shadow-xl rounded-lg overflow-hidden'>
              <div className='flex flex-col space-y-1.5 p-6 pb-2 text-center sm:text-left'>
                <button
                  type='button'
                  onClick={handleClose}
                  className='self-end mb-0 cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-colors'
                >
                  <span className='sr-only'>Close panel</span>
                  <X className='h-5 w-5' aria-hidden='true' />
                </button>

                <DialogTitle className='text-lg font-semibold leading-none tracking-tight'>
                  {title}
                </DialogTitle>

                {description && (
                  <Description className='text-sm text-gray-500'>
                    {description}
                  </Description>
                )}
              </div>
              <div className='flex-1 overflow-y-auto p-6 pt-2'>{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
