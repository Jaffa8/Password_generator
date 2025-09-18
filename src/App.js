import React, { useState } from 'react';
import './App.css';
import backgroundImage from './bgi6.jpg';

// importing yup
import * as yup from 'yup';
// importing formik
import { Formik } from 'formik';

const PasswordSchema = yup.object().shape({
  passwordLength: yup.number().min(4, 'Minimum of 4 length').max(20, 'Max of 20 length').required('Password length is required'),
});

// Custom Checkbox Component
const CustomCheckbox = ({ checked, onPress, type, label }) => {
  return (
    <div className="checkbox-container">
      <div
        className={`custom-checkbox ${type} ${checked ? 'checked' : ''}`}
        onClick={onPress}
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress();
          }
        }}
      />
    </div>
  );
};

// Copy to clipboard function
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

// Notification component
const CopyNotification = ({ show, onClose }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="copy-notification">
      Password copied to clipboard! 📋
    </div>
  );
};

export default function App() {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  const generatePasswordString = (passwordLength) => {
    let characterList = '';
    let upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    let numberChars = '0123456789';
    let symbolChars = '!@#$%^&*()_+';
    
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numberChars;
    }
    if (symbols) {
      characterList += symbolChars;
    }
    
    const passwordResult = createPassword(characterList, passwordLength);
    
    setPassword(passwordResult);   // setting the password
    setIsPassGenerated(true);       // setting the password generated to true
  };

  const createPassword = (characters, passwordLength) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const resetPassword = () => {            // resetting everything to the original state
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  const handleCopyPassword = async () => {
    if (password) {
      const success = await copyToClipboard(password);
      if (success) {
        setShowCopyNotification(true);
      }
    }
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        resetPassword();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="background-container" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="scroll-container">
        <div className="safe-area">
          <div className="app-container">
            <div className="form-container">
              <h1 className="title">Password Generator</h1>
            </div>
            
            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={PasswordSchema}
              onSubmit={(values) => {
                generatePasswordString(Number(values.passwordLength));
              }}
            >
              {({
                values,
                errors,
                isValid,
                handleChange,
                touched,
                handleSubmit,
              }) => (
                <>
                  {/* Password Length Input */}
                  <div className="input-wrapper">
                    <div className="input-column">
                      <label className="heading" htmlFor="passwordLength">Password Length</label>
                      {touched.passwordLength && errors.passwordLength && (
                        <div className="error-text">{errors.passwordLength}</div>
                      )}
                    </div>
                    <input
                      id="passwordLength"
                      className="input-style"
                      type="number"
                      value={values.passwordLength}
                      onChange={handleChange('passwordLength')}
                      placeholder="Ex. 8"
                      min="4"
                      max="20"
                    />
                  </div>

                  {/* Lowercase Letters */}
                  <div className="input-wrapper">
                    <div className="input-column">
                      <span className="heading">Include LowerCase Letters</span>
                    </div>
                    <CustomCheckbox
                      checked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      type="lowercase"
                      label="Include lowercase letters"
                    />
                  </div>

                  {/* Uppercase Letters */}
                  <div className="input-wrapper">
                    <div className="input-column">
                      <span className="heading">Include UpperCase Letters</span>
                    </div>
                    <CustomCheckbox
                      checked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      type="uppercase"
                      label="Include uppercase letters"
                    />
                  </div>

                  {/* Numbers */}
                  <div className="input-wrapper">
                    <div className="input-column">
                      <span className="heading">Include Numbers</span>
                    </div>
                    <CustomCheckbox
                      checked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      type="numbers"
                      label="Include numbers"
                    />
                  </div>

                  {/* Symbols */}
                  <div className="input-wrapper">
                    <div className="input-column">
                      <span className="heading">Include Symbols</span>
                    </div>
                    <CustomCheckbox
                      checked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      type="symbols"
                      label="Include symbols"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="form-actions">
                    <button
                      type="button"
                      disabled={!isValid}
                      className="primary-btn"
                      onClick={() => handleSubmit()}
                    >
                      <span className="primary-btn-txt">Generate</span>
                    </button>

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => resetPassword()}
                    >
                      <span className="secondary-btn-txt">Reset</span>
                    </button>
                  </div>
                </>
              )}
            </Formik>

            {/* Generated Password Display */}
            {isPassGenerated ? (
              <div className="card card-elevated">
                <h2 className="sub-title">Result:</h2>
                <p className="description">Click to copy to clipboard</p>
                <div
                  className="generated-password"
                  onClick={handleCopyPassword}
                  title="Click to copy password"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCopyPassword();
                    }
                  }}
                >
                  {password}
                </div>
                <button
                  className="copy-button"
                  onClick={handleCopyPassword}
                  title="Copy password to clipboard"
                >
                  📋 Copy Password
                </button>
              </div>
            ) : null}
            
            <CopyNotification
              show={showCopyNotification}
              onClose={() => setShowCopyNotification(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
