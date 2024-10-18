// src/components/Snackbar.tsx

import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import classNames from 'classnames';

interface SnackbarProps {
    message: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, open, onOpenChange }) => {
    return (
        <Toast.Root open={open} onOpenChange={onOpenChange} className="snackbar">
            <Toast.Title>{message}</Toast.Title>
            <Toast.Close className="toast-close">Close</Toast.Close>
            <Toast.Viewport />
        </Toast.Root>
    );
};

export default Snackbar;
