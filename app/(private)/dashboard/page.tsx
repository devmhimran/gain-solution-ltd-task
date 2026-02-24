'use client';

import Button from '@/components/shared/button';
import Input from '@/components/shared/input';
import Modal from '@/components/shared/modal';
import Sidebar from '@/components/shared/sidebar';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function DashboardAnalytics() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='container mx-auto'>
      DashboardAnalytics
      <div>
        <Button
          rightIcon={<Plus className='w-5 h-5' />}
          onClick={() => setOpen(true)}
        >
          Click here
        </Button>
        <Button
          rightIcon={<Plus className='w-5 h-5' />}
          onClick={() => setIsOpen(true)}
        >
          Click modal
        </Button>
      </div>
      <Input label='Email Address' type='email' placeholder='you@example.com' />
      <Sidebar
        side='right'
        isOpen={open}
        setIsOpen={setOpen}
        title='Shopping Cart check check sidebar left and right check again'
      >
        <p>Your items go here...</p>
      </Sidebar>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Edit Profile'
        description='Make changes to your profile here.'
        reset={() => console.log('Form reset!')}
      >
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quas
        </p>
      </Modal>
    </div>
  );
}
