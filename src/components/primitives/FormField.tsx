// FormField.tsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FormFieldProps } from "src/@types/step1";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export const Wrap = styled.div<{ colSpan?: number }>`
  display: flex;
  flex-direction: column;
  grid-column: span ${({ colSpan }) => colSpan ?? 1};
  position: relative;
`;

export const Label = styled.label`
  font-size: 12px;
  margin-bottom: 4px;
  color: #374151;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#dc2626" : "#d1d5db")};
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#dc2626" : "#2563eb")};
  }
`;

const SelectWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#dc2626" : "#d1d5db")};
  border-radius: 4px;
  background: #fff;
  color: #7d8c94;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
`;

const SelectedValue = styled.div`
  flex: 1;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-radius: 4px;
  background: #fff;
  list-style: none;
  margin: 4px 0 0 0;
  padding: 0;
  border: 1px solid #d1d5db;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

export const OptionItem = styled.li`
  padding: 6px 12px;
  color: #7d8c94;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

export const FormField: React.FC<FormFieldProps & { watch: any }> = ({
  name,
  label,
  placeholder,
  type = "text",
  disabled,
  colSpan,
  options,
  mask,
  register,
  errors,
  setValue,
  trigger,
  watch,
}) => {
  const hasError = !!errors?.[name as keyof typeof errors];
  const value = watch(name); // valor atual
  const isRequired = label.includes("*");
  const showAsterisk = isRequired && (!value || hasError);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrap colSpan={colSpan}>
      <Label htmlFor={name}>
        {label.replace("*", "")}{" "}
        {showAsterisk && <span style={{ color: "#dc2626" }}>*</span>}
      </Label>

      {type === "select" ? (
        <SelectWrapper
          ref={ref}
          $hasError={hasError}
          onClick={() => setIsOpen(!isOpen)}
        >
          <SelectedValue>{value || "Selecione..."}</SelectedValue>
          {isOpen ? (
            <IoMdArrowDropup style={{ marginLeft: 8, fontSize: "24px" }} />
          ) : (
            <IoMdArrowDropdown style={{ marginLeft: 8, fontSize: "24px" }} />
          )}

          {isOpen && (
            <OptionsList>
              {options?.map((o) => (
                <OptionItem
                  key={o.value}
                  onClick={() => {
                    setValue(name, o.value, { shouldValidate: true });
                    trigger?.(name);
                    setIsOpen(false);
                  }}
                >
                  {o.label}
                </OptionItem>
              ))}
            </OptionsList>
          )}
        </SelectWrapper>
      ) : (
        <StyledInput
          {...register(name, {
            onChange: (e: any) => {
              if (mask) {
                const maskedValue = mask(e.target.value);
                setValue(name, maskedValue, { shouldValidate: true });
                trigger?.(name);
              }
            },
          })}
          placeholder={placeholder}
          disabled={disabled}
          $hasError={hasError}
        />
      )}
    </Wrap>
  );
};
