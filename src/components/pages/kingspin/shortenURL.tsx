'use client'
import React, { useState } from 'react'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ShortenURL = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  const submitHandler = async () => {
    if (url === "") {
      toast.error("Please enter a URL");
      return;
    }
    
    try {
      setLoading(true);
      const res = await axios.post("https://pickandpartner-94sz.onrender.com/shorten", {originalUrl: url});
      setShortUrl(res.data.shortUrl);
      toast.success("URL shortened successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error shortening URL:", error);
      toast.error("Failed to shorten URL. Please try again.");
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create Short URL</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="url-input" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Enter URL to shorten:
          </label>
          <div className="flex gap-2">
            <Input 
              id="url-input"
              type="text" 
              placeholder="https://example.com/long-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={submitHandler}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Processing...
                </>
              ) : "Shorten URL"}
            </Button>
          </div>
        </div>
        
        {shortUrl !== "" && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your shortened URL:</p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
              <code className="font-mono text-sm overflow-x-auto text-gray-900 dark:text-gray-100">{shortUrl}</code>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortenURL
