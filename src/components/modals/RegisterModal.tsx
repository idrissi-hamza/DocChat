'use client';

import React, { useCallback, useState } from 'react';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { Button } from '../ui/button';

import { FcGoogle } from 'react-icons/fc';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLogingModal';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/lib/const';

// Define Zod schema for form validation
const schema = z.object({
  name: z.string().min(1, 'Le nom est requis.'),
  email: z
    .string()
    .email('Adresse e-mail invalide.')
    .min(1, "L'adresse e-mail est requise."),
  password: z
    .string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères.'),
});

export type FormValuesType = z.infer<typeof schema>;

const RegisterModal = () => {
  const router = useRouter();

  const { isOpen, onClose: closeRegisterModal } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen: openLoginModal } = useLoginModal();

  const toggle = useCallback(() => {
    closeRegisterModal();
    openLoginModal();
  }, [closeRegisterModal, openLoginModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setIsLoading(true);
    toast.loading('', { id: '1' });

    try {
      await axios.post(`${BASE_URL}/api/register`, data);
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.refresh();
      toast.success('"Enregistré avec succès !', { id: '1' });

      closeRegisterModal();
      return;
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          'An unexpected error occurred during registration.',
        { id: '1' }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex  flex-col gap-4 md:min-w-[30rem] w-full nmax-w-xl mx-auto ">
      <Heading
        title="Bienvenue sur DocChat."
        subtitle="Créer un compte."
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
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Green Bonnie"
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
        <FcGoogle className="mr-2 h-4 w-4" />
        Continuer avec Google.
      </Button>

      <div
        className="
          text-neutral-500 text-center  mt-4  
        "
      >
        <p>
          Vous avez déjà un compte ?
          <span
            onClick={toggle}
            className=" text-indigo-600 font-bold  cursor-pointer hover:underline pl-2 "
          >
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Inscrivez-vous"
      actionLabel="Continuer"
      onClose={closeRegisterModal}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
