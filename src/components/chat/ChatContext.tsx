import { useMutation } from '@tanstack/react-query';
import { ReactNode, createContext, useState } from 'react';

interface ChatStoreI {
  message: string;
  addMessage: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export const ChatContext = createContext<ChatStoreI>({
  message: "",
  addMessage: () => { },
  handleInputChange: () => { },
  isLoading: false,
});


interface Props {
  fileId: string,
  children: ReactNode
}
export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const res = await fetch('api/message', {
        method: 'POST',
        body: JSON.stringify({
          fileId,
          message,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to send message")
      }

      return res.body
    }

  })

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const addMessage = () => sendMessage({ message })

  return (
    <ChatContext.Provider value={{ addMessage, handleInputChange, isLoading, message }}>
      {children}
    </ChatContext.Provider>
  )
}
