import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import { X } from 'lucide-react';

export default function InputDemo() {
  const [inputValue, setInputValue] = useState('Click to clear');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="w-80">
      <InputWrapper>
        <Input
          placeholder="Type some input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleClearInput} variant="dim" className="-me-4" disabled={inputValue === ''}>
          {inputValue !== '' && <X size={16} />}
        </Button>
      </InputWrapper>
    </div>
  );
}
