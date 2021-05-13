import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboardUtils = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
    setIsOpen(false);
  }

  function onKeyboardWillShow(e: KeyboardEvent): void {
    setIsOpen(true);
    setKeyboardHeight(e.endCoordinates.height);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    return (): void => {
      Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow);
    };
  }, []);

  return { keyboardHeight, isKeyboardOpen: isOpen };
};

export default useKeyboardUtils;
