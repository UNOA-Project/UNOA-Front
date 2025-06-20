import { toast, Bounce } from 'react-toastify'
import React from 'react'
import ToastConfirmRedirect from '@/components/ToastSuccessRegister'

const TOAST_IDS = {
  confirm: 'toast-confirm',
  success: 'toast-success',
  error: 'toast-error',
  default: 'toast-default',
  warn: 'toast-warn',
  info: 'toast-info',
}

export default function useToast() {
  const commonOptions = {
    position: 'top-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  }

  const showSuccessRegister = ({ message, redirectPath = '/login' }) => {
    if (!toast.isActive(TOAST_IDS.confirm)) {
      toast(
        ({ closeToast }) =>
          React.createElement(ToastConfirmRedirect, {
            message,
            redirectPath,
            closeToast,
          }),
        {
          toastId: TOAST_IDS.confirm,
          position: 'top-center',
          autoClose: 4000,
          closeOnClick: false,
          closeButton: true,
          pauseOnHover: false,
          draggable: false,
          className: 'flex flex-col items-center border border-border mt-25 shadow-md',
        }
      )
    }
  }

  const showSuccessToast = (message, options = {}) => {
    if (!toast.isActive(TOAST_IDS.success)) {
      toast.success(message, {
        ...commonOptions,
        toastId: TOAST_IDS.success,
        className: 'border border-border flex flex-row justify-center',
        ...options,
      })
    }
  }

  const showErrorToast = (message, options = {}) => {
    if (!toast.isActive(TOAST_IDS.error)) {
      toast.error(message, {
        ...commonOptions,
        toastId: TOAST_IDS.error,
        className: 'border border-border text-center flex flex-row justify-center',
        ...options,
      })
    }
  }

  const showDefaultToast = (message, options = {}) => {
    if (!toast.isActive(TOAST_IDS.default)) {
      toast(message, {
        ...commonOptions,
        toastId: TOAST_IDS.default,
        className: 'border border-border flex flex-row justify-center',
        ...options,
      })
    }
  }

  const showWarnToast = (message, options = {}) => {
    if (!toast.isActive(TOAST_IDS.warn)) {
      toast.warn(message, {
        ...commonOptions,
        toastId: TOAST_IDS.warn,
        className: 'border border-border flex flex-row justify-center',
        ...options,
      })
    }
  }

  const showInfoToast = (message, options = {}) => {
    if (!toast.isActive(TOAST_IDS.info)) {
      toast.info(message, {
        ...commonOptions,
        toastId: TOAST_IDS.info,
        className: 'border border-border flex flex-row justify-center',
        ...options,
      })
    }
  }

  return {
    showSuccessRegister,
    showSuccessToast,
    showErrorToast,
    showDefaultToast,
    showWarnToast,
    showInfoToast,
  }
}
