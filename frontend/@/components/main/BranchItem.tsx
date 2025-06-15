"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Branch, BranchItemProps } from "@/types/restaurant";

const BranchItem: React.FC<BranchItemProps> = ({ branch, isLast }) => {
  return (
    <div
      onClick={() => console.log(branch.name)}
      className={`flex items-center p-4 ${
        !isLast ? "border-b border-gray-100" : ""
      }`}
    >
      {/* branch Image */}
      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4 flex-shrink-0">
        <img
          src={branch.image}
          alt={branch.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a colored placeholder
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.classList.add("bg-orange-100");
          }}
        />
      </div>

      {/* branch Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg mb-1">
          {branch.title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm">
          <span>{branch.distance}</span>
          <span className="mx-2">•</span>
          <span>{branch.walkTime}</span>
        </div>
      </div>

      {/* Navigation Arrow */}
      <div className="ml-4">
        <Button variant="ghost" size="icon" className="text-gray-400">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default BranchItem;
