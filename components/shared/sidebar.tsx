import { X } from 'lucide-react';
import { Fragment, ReactNode } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: 'left' | 'right';
  reset?: () => void;
}

export function Sidebar({
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

  const sideClasses = side === 'left' ? 'border-r' : 'border-l';

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
              className={cn(
                'fixed inset-y-0 flex max-w-sm',
                side === 'left'
                  ? 'left-0 justify-start'
                  : 'right-0 justify-end',
              )}
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
                      <div
                        className={cn(
                          side === 'left'
                            ? 'flex-row-reverse justify-between'
                            : 'flex-row',
                          'flex items-start gap-4',
                        )}
                      >
                        <button
                          type='button'
                          onClick={handleClose}
                          className='cursor-pointer rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-colors'
                        >
                          <span className='sr-only'>Close panel</span>
                          <X className='h-5 w-5' aria-hidden='true' />
                        </button>
                        <div>
                          <DialogTitle className='text-lg font-semibold leading-5.5 text-gray-900'>
                            {title}
                          </DialogTitle>
                          {description && (
                            <Description className='text-sm text-gray-500'>
                              {description}
                            </Description>
                          )}
                        </div>
                      </div>
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
