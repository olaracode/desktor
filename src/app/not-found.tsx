"use client";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="max-w-md px-4 py-12 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-2xl font-medium text-gray-500 dark:text-gray-400">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
