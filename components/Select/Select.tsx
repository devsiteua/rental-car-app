'use client';

import { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

import css from './Select.module.css';

interface SelectProps {
  className: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  formatValue?: (value: string) => string;
}

export default function Select({
  className,
  label,
  placeholder,
  options,
  value,
  onChange,
  formatValue = option => option,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${css.field} ${className}`} ref={fieldRef}>
      <span className={css.label}>{label}</span>

      <button
        className={css.button}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value ? formatValue(value) : placeholder}
        {isOpen ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
      </button>

      {isOpen && (
        <ul className={css.list}>
          {options.map(option => {
            const optionClass =
              option === value ? `${css.option} ${css.selected}` : css.option;

            return (
              <li key={option}>
                <button
                  className={optionClass}
                  type="button"
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
