'use client';

import React, { useCallback, useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { Button } from '../ui/button';
import useLoginModal from '@/app/hooks/useLogingModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z
    .string()
    .email('Adresse e-mail invalide.')
    .min(1, "L'adresse e-mail est requise."),
  password: z
    .string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères.'),
});

export type FormValuesType = z.infer<typeof schema>;

const LoginModal = () => {
  const router = useRouter();

  const { isOpen, onClose: closeLoginModal } = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen: openRegisterModal } = useRegisterModal();

  const toggle = useCallback(() => {
    closeLoginModal();
    openRegisterModal();
  }, [closeLoginModal, openRegisterModal]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    try {
      setIsLoading(true);
      const signInResponse = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (signInResponse?.ok) {
        toast.success('Logged in');
        router.refresh();
        closeLoginModal();
      }
      if (signInResponse?.error) {
        toast.error(signInResponse.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during sign-in.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex  flex-col gap-4  w-full  ">
      <Heading
        title="Ravi de vous retrouver."
        subtitle="Se connecter à votre compte"
      />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="name@docchat.com"
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder=""
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        variant="outline"
        onClick={() => signIn('google')}
      >
        <FcGoogle className="mr-2 h-4 w-4" /> Continuer avec Google.
      </Button>

      <div
        className="
          text-neutral-500 text-center  mt-4  
        "
      >
        <p>
          Vous n&apos;avez pas de compte ?
          <span
            onClick={toggle}
            className=" text-indigo-600 font-bold  cursor-pointer hover:underline pl-2 "
          >
            S&apos;inscrire
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Se connecter"
      actionLabel="Continuer"
      onClose={closeLoginModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
