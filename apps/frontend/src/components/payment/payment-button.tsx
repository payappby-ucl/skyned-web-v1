'use client';

import React from 'react';

interface PaymentButtonProps {
  label?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  label = 'Pay Now',
  color = '#3477FE',
  size = 'large',
}) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<payment-button label="${label}" color="${color}" size="${size}"></payment-button>`,
      }}
    />
  );
};
