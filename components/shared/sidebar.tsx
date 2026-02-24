import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment, ReactNode, Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  children: ReactNode;
  side?: 'left' | 'right';
  reset?: () => void;
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  side = 'right',
  reset = () => {},
}: SidebarProps) {
  const handleClose = () => {
    setIsOpen(false);
    if (reset) reset();
  };

  const sideClasses = side === 'left' ? 'left-0 border-r' : 'right-0 border-l';

  const translateFrom =
    side === 'left' ? '-translate-x-full' : 'translate-x-full';
  const translateTo = 'translate-x-0';

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
          <div
            className='fixed inset-0 bg-black/30 transition-opacity'
            aria-hidden='true'
          />
        </TransitionChild>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div
              className={`fixed inset-y-0 flex max-w-sm ${side === 'left' ? 'left-0' : 'right-0'}`}
            >
              <TransitionChild
                as={Fragment}
                enter='transform transition ease-in-out duration-300'
                enterFrom={translateFrom}
                enterTo={translateTo}
                leave='transform transition ease-in-out duration-300'
                leaveFrom={translateTo}
                leaveTo={translateFrom}
              >
                <DialogPanel
                  className={`pointer-events-auto w-screen max-w-[85%] sm:max-w-md bg-white p-5 shadow-xl border-gray-200 ${sideClasses}`}
                >
                  <div className='flex flex-col h-full'>
                    <div className='mb-6'>
                      <div className='flex items-start gap-4'>
                        {side === 'right' && (
                          <button
                            type='button'
                            onClick={handleClose}
                            className='cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-colors'
                          >
                            <span className='sr-only'>Close panel</span>
                            <X className='h-5 w-5' aria-hidden='true' />
                          </button>
                        )}
                        <DialogTitle className='text-lg font-semibold leading-5.5 text-gray-900'>
                          {title}
                        </DialogTitle>
                        {side === 'left' && (
                          <button
                            type='button'
                            onClick={handleClose}
                            className='cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-colors'
                          >
                            <span className='sr-only'>Close panel</span>
                            <X className='h-5 w-5' aria-hidden='true' />
                          </button>
                        )}
                      </div>

                      {description && (
                        <Description className='mt-2 text-sm text-gray-500 ml-8'>
                          {description}
                        </Description>
                      )}
                    </div>

                    <div className='relative flex-1 overflow-y-auto'>
                      {children}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
