import styled, { css } from "styled-components";
import { ButtonVariant, DisableableProps, LoadingProps } from "../../@types/forms";

interface ButtonProps extends DisableableProps, LoadingProps {
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.colors.primary};
        color: #ffffff;
        border: none;
        
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryHover};
        }
        
        &:focus {
          box-shadow: 0 0 0 3px rgba(51, 64, 148, 0.2);
        }
      `;
    case 'secondary':
      return css`
        background: #f3f4f6;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        
        &:hover:not(:disabled) {
          background: #e5e7eb;
        }
        
        &:focus {
          box-shadow: 0 0 0 3px rgba(51, 64, 148, 0.1);
        }
      `;
    case 'tertiary':
      return css`
        background: transparent;
        color: ${theme.colors.primary};
        border: none;
        
        &:hover:not(:disabled) {
          background: rgba(51, 64, 148, 0.05);
        }
        
        &:focus {
          box-shadow: 0 0 0 3px rgba(51, 64, 148, 0.1);
        }
      `;
    default:
      return css``;
  }
};

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 12px;
        font-size: 0.875rem;
      `;
    case 'large':
      return css`
        padding: 12px 24px;
        font-size: 1.125rem;
      `;
    case 'medium':
    default:
      return css`
        padding: 8px 16px;
        font-size: 1rem;
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  
  ${({ size = 'medium' }) => getSizeStyles(size)}
  ${({ variant = 'primary', theme }) => getVariantStyles(variant, theme)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:focus {
    outline: none;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  ${({ loading }) => loading && css`
    pointer-events: none;
    opacity: 0.7;
    
    &::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
`;
