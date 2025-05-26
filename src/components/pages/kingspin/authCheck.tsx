'use client'
import React, { useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { comparePassword } from '@/lib/hash'

interface AuthCheckProps {
  children: ReactNode;
  secretCode: string;
}

const AuthCheck = ({ children, secretCode }: AuthCheckProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  const checkCode = () => {
    setLoading(true);

    const isValid = comparePassword(code, secretCode);
    console.log('Code:', code);
    console.log('Secret Code:', secretCode);
    console.log('Is Valid:', isValid);
    if (isValid) {
      setIsAuthenticated(true);
      toast.success('Access granted!');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      toast.error(`Incorrect code. Attempt ${newAttempts} of 3.`);
        
        // Lock out after 3 failed attempts
        if (newAttempts >= 3) {
          toast.error('Too many failed attempts. Try again later.');
          setCode('');
          setTimeout(() => {
            setAttempts(0);
          }, 5000); // Reset after 5 seconds
        }
      }
      setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">URL Shortener Dashboard</h1>
            <p className="text-gray-600 mt-2">Enter access code to continue</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="access-code" className="text-sm font-medium text-gray-700 mb-1 block">
                Access Code
              </label>
              <Input
                id="access-code"
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your access code"
                disabled={attempts >= 3 || loading}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && code && attempts < 3 && !loading) {
                    checkCode();
                  }
                }}
              />
            </div>
            
            <Button
              onClick={checkCode}
              disabled={!code || attempts >= 3 || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Verifying...
                </>
              ) : attempts >= 3 ? 'Locked Out' : 'Access Dashboard'}
            </Button>
            
            {attempts >= 3 && (
              <p className="text-sm text-red-500 text-center mt-2">
                Too many failed attempts. Please wait 5 seconds.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show the children components
  return <>{children}</>;
}

export default AuthCheck
