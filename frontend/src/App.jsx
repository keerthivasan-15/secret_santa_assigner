import React, { useState } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { FileUploader } from './components/FileUploader.jsx';
import toast, { Toaster } from "react-hot-toast";
import { Header } from './components/Header.jsx';

export function App() {
  const [currentFile, setCurrentFile] = useState(null);
  const [previousFile, setPreviousFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentFile) {
      toast.error('Please select current year employee file');
      setError('Please select current year employee file');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('currentYear', currentFile);
    if (previousFile) {
      formData.append('previousYear', previousFile);
    }

    try {
      const response = await fetch('https://secret-santa-assigner.onrender.com/assign-secret-santa', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process Secret Santa assignments');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'secret_santa_assignments.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-emerald-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <Header />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <FileUploader
                  label="Current Year Employee List"
                  onChange={(e) => setCurrentFile(e.target.files?.[0] || null)}
                  icon={<FileSpreadsheet className="w-12 h-12 text-gray-400" />}
                  buttonColor="red"
                />
                <FileUploader
                  label="Previous Year Assignments (Optional)"
                  onChange={(e) => setPreviousFile(e.target.files?.[0] || null)}
                  icon={<FileSpreadsheet className="w-12 h-12 text-gray-400" />}
                  buttonColor="green"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !currentFile}
                className={`w-full py-3 px-6 rounded-lg text-white font-medium
                  flex items-center justify-center space-x-2
                  ${loading || !currentFile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                  }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Generate Assignments</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>

  );
}