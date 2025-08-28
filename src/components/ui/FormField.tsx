import React, { useState, useRef, useCallback, memo } from 'react';
import styled from 'styled-components';
import { FormFieldProps } from '../../@types/forms';
import { useClickOutside } from '../../hooks';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FieldValues, FieldPath } from 'react-hook-form';

const FieldContainer = styled.div<{ $colSpan?: number }>`
  display: flex;
  flex-direction: column;
  grid-column: span ${({ $colSpan }) => $colSpan ?? 1};
  position: relative;
`;

const FieldLabel = styled.label`
  font-size: 0.75rem;
  margin-bottom: ${({ theme }) => theme.space(1)};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 2px;
`;

const BaseInput = styled.input<{ $hasError?: boolean }>`
  padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.875rem;
  transition: all 0.15s ease-in-out;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ $hasError, theme }) =>
        $hasError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(51, 64, 148, 0.1)'};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const SelectContainer = styled.div<{ $hasError?: boolean; $isOpen?: boolean }>`
  position: relative;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
  transition: all 0.15s ease-in-out;

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ $hasError, theme }) =>
        $hasError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(51, 64, 148, 0.1)'};
  }

  &:hover {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
  }
`;

const SelectedValueDisplay = styled.div<{ $hasPlaceholder?: boolean }>`
  flex: 1;
  color: ${({ $hasPlaceholder, theme }) =>
    $hasPlaceholder ? theme.colors.muted : theme.colors.text};
  font-size: 0.875rem;
`;

const DropdownIcon = styled.div<{ $isOpen?: boolean }>`
  margin-left: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.25rem;
  transition: transform 0.15s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const OptionsList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.space(1)} 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const OptionItem = styled.li`
  padding: ${({ theme }) => theme.space(2)} ${({ theme }) => theme.space(3)};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.stepBg};
  }

  &:active {
    background: rgba(51, 64, 148, 0.1);
  }
`;

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-top: ${({ theme }) => theme.space(1)};
`;

interface EnhancedFormFieldProps<T extends FieldValues = FieldValues>
  extends FormFieldProps<T> {
  colSpan?: number;
}

export const FormField = memo(
  <T extends FieldValues = FieldValues>({
    name,
    label,
    placeholder,
    type = 'text',
    disabled = false,
    colSpan,
    options = [],
    mask,
    register,
    errors,
    setValue,
    trigger,
    watch,
  }: EnhancedFormFieldProps<T>) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const fieldName = name as FieldPath<T>;
    const fieldValue = watch(fieldName);
    const fieldError = errors?.[name as keyof typeof errors];
    const hasError = !!fieldError;

    const isRequired = label.includes('*');
    const cleanLabel = label.replace('*', '').trim();

    useClickOutside(
      selectRef,
      useCallback(() => {
        setIsSelectOpen(false);
      }, [])
    );

    const handleSelectToggle = useCallback(() => {
      if (!disabled) {
        setIsSelectOpen((prev) => !prev);
      }
    }, [disabled]);

    const handleOptionSelect = useCallback(
      (optionValue: string) => {
        setValue(fieldName, optionValue as any, { shouldValidate: true });
        trigger?.(fieldName);
        setIsSelectOpen(false);
      },
      [fieldName, setValue, trigger]
    );

    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (mask) {
          const maskedValue = mask(event.target.value);
          setValue(fieldName, maskedValue as any, { shouldValidate: true });
          trigger?.(fieldName);
        }
      },
      [mask, fieldName, setValue, trigger]
    );

    const displayValue =
      type === 'select' && fieldValue
        ? options.find((option) => option.value === String(fieldValue))
            ?.label || String(fieldValue)
        : String(fieldValue || '');

    return (
      <FieldContainer $colSpan={colSpan}>
        <FieldLabel htmlFor={String(name)}>
          {cleanLabel}
          {isRequired && <RequiredIndicator>*</RequiredIndicator>}
        </FieldLabel>

        {type === 'select' ? (
          <SelectContainer
            ref={selectRef}
            $hasError={hasError}
            $isOpen={isSelectOpen}
            onClick={handleSelectToggle}
            role="combobox"
            aria-expanded={isSelectOpen}
            aria-haspopup="listbox"
            aria-label={cleanLabel}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleSelectToggle();
              }
              if (e.key === 'Escape') {
                setIsSelectOpen(false);
              }
            }}
          >
            <SelectedValueDisplay $hasPlaceholder={!fieldValue}>
              {displayValue || placeholder || '--Selecione--'}
            </SelectedValueDisplay>
            <DropdownIcon $isOpen={isSelectOpen}>
              <IoMdArrowDropdown />
            </DropdownIcon>

            {isSelectOpen && (
              <OptionsList
                role="listbox"
                aria-label={`Opções para ${cleanLabel}`}
              >
                {options.map((option) => (
                  <OptionItem
                    key={option.value}
                    role="option"
                    aria-selected={String(fieldValue) === option.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(option.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleOptionSelect(option.value);
                      }
                    }}
                    tabIndex={0}
                  >
                    {option.label}
                  </OptionItem>
                ))}
              </OptionsList>
            )}
          </SelectContainer>
        ) : (
          <BaseInput
            {...register(fieldName, {
              onChange: handleInputChange,
            })}
            id={String(name)}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            $hasError={hasError}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${String(name)}-error` : undefined}
          />
        )}

        {hasError && fieldError?.message && (
          <ErrorMessage id={`${String(name)}-error`} role="alert">
            {fieldError.message as string}
          </ErrorMessage>
        )}
      </FieldContainer>
    );
  }
) as <T extends FieldValues = FieldValues>(
  props: EnhancedFormFieldProps<T>
) => JSX.Element;

export default FormField;
